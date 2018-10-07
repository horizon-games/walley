import { observable } from 'mobx'
import { Wallet } from '~/lib/wallet'

class WalletStore {
  @observable public wallet: Wallet

  constructor() {
    this.wallet = new Wallet()

    // TODO: we should move storage stuff etc in here..
  }

}

export default WalletStore
