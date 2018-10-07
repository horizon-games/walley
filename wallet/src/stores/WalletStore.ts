import { observable, when } from 'mobx'
import * as ethers from 'ethers'

const tempPassword = 'temp'

class WalletStore {
  @observable public account?: string
  @observable private encryptedWallet?: string
  @observable private decryptedWallet?: ethers.Wallet

  @observable public signRequest: object | null
  @observable public sendETHRequest: object | null
  @observable public sendETHTo: string | null
  @observable public sendETHValue: string | null
  @observable public sendETHGas: string | null

  @observable public okCancel: boolean | null

  constructor() {
  }

  public async getAddress(): Promise<string> {
    if (this.account) {
      return this.account
    }

    const account = window.localStorage.getItem('account')
    const encryptedWallet = window.localStorage.getItem('encryptedWallet')

    if (account && encryptedWallet) {
      this.account = account
      this.encryptedWallet = encryptedWallet
      await this.decryptWallet(tempPassword)
      return this.account
    }

    const privateKey = '0xb0057716d5917badaf911b193b12b910811c1497b5bada8d7711f758981c3773'
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
    this.decryptedWallet = new ethers.Wallet(privateKey, provider)
    this.account = this.decryptedWallet.address

    await this.encryptWallet(tempPassword)

    return this.account
  }

  private async encryptWallet(password) {
    // XXX: disable this because you can't derive a mnemonic from a private key
    if (this.account && this.decryptedWallet && false) {
      this.encryptedWallet = this.decryptedWallet!.mnemonic

      window.localStorage.setItem('account', this.account!)
      window.localStorage.setItem('encryptedWallet', this.encryptedWallet!)
    }
  }

  private async decryptWallet(password) {
    if (this.encryptedWallet) {
      const provider = new ethers.providers.JsonRpcProvider()
      this.decryptedWallet = ethers.Wallet.fromMnemonic(this.encryptedWallet).connect(provider)
    }
  }

  async onJsonRpcRequest({ serial, request }: { serial: number, request: any }): Promise<object> {
    const { jsonrpc, id, method, params } = request

    const response: any = { jsonrpc, id }

    // reset dialog..
    this.okCancel = null

    switch (method) {
      case 'net_version':
        response.result = '1'
        break
  
      case 'eth_accounts':
        response.result = [this.account]
        break

      case 'eth_sign':
        if (params[0].toLowerCase() !== this.account!.toLowerCase()) {
          throw Error(`no account ${params[0]}`)
        }

        {
          this.signRequest = request
          const confirm = await this.waitForUserInput()
          this.okCancel = null

          if (confirm) {
            const sig = await this.signMessage(ethers.utils.toUtf8String(params[1]))
            response.result = sig
          } else {
            // cancelled by user..
            this.signRequest = null
            throw new Error(`cancelled by user`)
          }
        }
        break

      case 'eth_estimateGas':
        response.result = (await this.decryptedWallet!.provider.estimateGas(params[0])).toHexString()
        break

      case 'eth_sendTransaction':
        console.log('=> eth_sendTransaction', params[0])

        {
          this.sendETHRequest = request
          const confirm = await this.waitForUserInput()
          this.okCancel = null
          this.sendETHRequest = null

          if (confirm) {
            params[0].to = this.sendETHTo
            params[0].value = this.sendETHValue
            params[0].gas = this.sendETHGas

            response.result = (await this.decryptedWallet!.sendTransaction(params[0])).hash

            this.sendETHTo = null
            this.sendETHValue = null
            this.sendETHGas = null
          } else {
            // cancelled by user
            throw new Error(`cancelled by user`)
          }
        }
        break

      case 'eth_getTransactionByHash':
        console.log('=> eth_sendTransactionByHash', params[0])
        response.result = await this.decryptedWallet!.provider.getTransaction(params[0])
        break

      case 'eth_blockNumber':
        response.result = `${await this.decryptedWallet!.provider.getBlockNumber()}`
        break

      case 'eth_getBalance':
        response.result = (await this.decryptedWallet!.provider.getBalance(params[0])).toHexString()
        break

      default:
        console.log(request)
        break
    }

    return response
  }

  async signMessage(message: string): Promise<string> {
    this.signRequest = null
    return this.decryptedWallet!.signMessage(message)
  }

  async waitForUserInput(): Promise<boolean> {
    const that = this
    await when(() => that.okCancel !== null)
    return this.okCancel!
  }
}

export default WalletStore
