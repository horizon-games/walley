import { observable } from 'mobx'
import * as ethers from 'ethers'

const tempPassword = 'temp'

class WalletStore {
  @observable public account?: string
  @observable private encryptedWallet?: string
  @observable private decryptedWallet?: ethers.Wallet

  @observable public signRequest: object | null

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
    this.decryptedWallet = ethers.Wallet.createRandom()
    this.account = this.decryptedWallet.address

    await this.encryptWallet(tempPassword)

    return this.account
  }

  private async encryptWallet(password) {
    if (this.account && this.decryptedWallet) {
      this.encryptedWallet = this.decryptedWallet.mnemonic

      window.localStorage.setItem('account', this.account)
      window.localStorage.setItem('encryptedWallet', this.encryptedWallet)
    }
  }

  private async decryptWallet(password) {
    if (this.encryptedWallet) {
      this.decryptedWallet = ethers.Wallet.fromMnemonic(this.encryptedWallet)
    }
  }

  async onJsonRpcRequest({ serial, request }: { serial: number, request: any }): Promise<object> {
    const { jsonrpc, id, method, params } = request

    const response: any = { jsonrpc, id }

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

        this.signRequest = request
        const sig = await this.signMessage(ethers.utils.toUtf8String(params[1]))
        response.result = sig
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
}

export default WalletStore
