import WalletStore from './WalletStore'

export default function createStores() {
  return {
    // State stores
    walletStore: new WalletStore()
  }
}

export type IStores = ReturnType<typeof createStores>
