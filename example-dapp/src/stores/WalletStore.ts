import { observable } from 'mobx'
import * as ethers from 'ethers'

class WalletStore {
  public provider: ethers.providers.Web3Provider
  public signer: ethers.providers.JsonRpcSigner

  constructor() {
    const web3 = (global as any).web3
    if (!web3) {
      throw new Error(`web3 wallet isn't available`)
    }
    console.log('web3 provider!', web3)

    const provider = new ethers.providers.Web3Provider(web3.currentProvider)
    this.provider = provider
    this.signer = provider.getSigner()
  }
}

export default WalletStore
