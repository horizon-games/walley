Walley :D
=========

_An Ethereum wallet you don't have to install_

by William Hua [@attente](https://github.com/attente) and Peter Kieltyka [@pkieltyka](https://github.com/pkieltyka) in 1 day during ETHSF. Built on the amazing [ethers.js](https://github.com/ethers-io/ethers.js) library by [Richard Moore](https://github.com/ricmoo).

On-ramping non-crypto enthusiasts into the blockchain space has always been a pain point for widespread adoption of decentralized apps.
We wanted to build something that would reduce the barrier to entry for all newcomers.
We also wanted to make it easy for DApp developers to integrate into their own already existing projects.

## Demo

1. `cd provider/ && yarn && yarn dist`
2. `cd example-dapp/ && yarn; yarn dev` -- keep this running in some window
3. `cd wallet/ && yarn; yarn dev` -- keep this running in another window
4. `cd ganache/ && yarn && yarn ganache-cli -d -v` -- keep this running in another window
5. Open browser to http://localhost:3000/
6. Open your console to see stuff

## Screenshots

![](https://raw.githubusercontent.com/horizon-games/walley/master/screenshot1.png)
![](https://raw.githubusercontent.com/horizon-games/walley/master/screenshot2.png)
![](https://raw.githubusercontent.com/horizon-games/walley/master/screenshot3.png)

## What it does

It consists of an outer container that holds wallet information, and a sandboxed iframe internally that holds the DApp that the user wants to run.
If Walley Wallet detects no MetaMask or other wallet, it generates a new random wallet for the user to use, and stores that in local storage, no installation needed.

From the DApp author's perspective, the only modifications required by the DApp author is to embed a couple of extra `<script>` tags in their HTML.

The wallet container and DApp communicate with each other via a proxy that we wrote using the postMessage API.
The wallet container manages all operations involving the private key, which the DApp has no access to.
This allows multiple DApps using Walley Wallet to operate with the user's single private key.

For users that are already acquainted with MetaMask usage, Walley Wallet delegates all interactions to that instead.

# License

MIT
