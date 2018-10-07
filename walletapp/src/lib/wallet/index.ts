import * as ethers from 'ethers'

// TODO: if we have a global.web3, ie. MetaMask, we can 
// let the user use that instead... or give them the choice (later on)

export class Wallet {
  public ethWallet: ethers.Wallet

  constructor(privateKey?: string) {
    // if (privateKey) {
    //   this.ethWallet = ethers.Wallet.fromEncryptedJson()
    // } else {
    //   this.ethWallet = ethers.Wallet.createRandom()
    // }

    this.ethWallet = ethers.Wallet.createRandom()
  }

  static fromStorage(): Wallet | null {
    // TODO: use ethers.utils.SecretStorage stuff to encrypt/decrypt
    // the secret wallet and put it into localstorage


    // TODO: in localStorage we should have encryptedWallet
    // and just 'wallet' that is decrypted in plain text,
    // when a user "logs out" we will clear the 'wallet' item
    // and require a password to load+decrypt it.

    const pk = window.localStorage.getItem('wallet')
    if (!pk || pk === '') {
      return null
    }
    return new Wallet(pk)
  }


}
