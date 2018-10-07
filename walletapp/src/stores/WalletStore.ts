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

      case 'eth_estimateGas':
        response.result = '0x5208'
        break

      case 'eth_sendTransaction':
        response.result = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('dummy hash'))
        break

      case 'eth_getTransactionByHash':
        response.result = {
          'blockHash': '0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2',
          'blockNumber': '0x5daf3b', // 6139707
          'from': '0xa7d9ddbe1f17865597fbd27ec712455208b6b76d',
          'gas': '0xc350', // 50000
          'gasPrice': '0x4a817c800', // 20000000000
          'hash': '0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b',
          'input': '0x68656c6c6f21',
          'nonce': '0x15', // 21
          'to': '0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb',
          'transactionIndex': '0x41', // 65
          'value': '0xf3dbb76162000', // 4290000000000000
          'v': '0x25', // 37
          'r': '0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea',
          's': '0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c'
        }
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
