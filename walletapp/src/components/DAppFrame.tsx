import * as ethers from 'ethers'
import * as React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

export interface IDAppFrameProps {
  appURL: string
}

@observer
export default class DAppFrame extends React.Component<IDAppFrameProps, {}> {
  iframeRef: HTMLIFrameElement

  componentDidMount() {
    this.iframeRef.addEventListener('load', (event: UIEvent) => {
      const { appURL } = this.props

      window.addEventListener('message', (event: MessageEvent) => {
        const eventOrigin = (new URL(event.origin)).origin
        const appOrigin = (new URL(appURL)).origin

        if (eventOrigin === appOrigin) {
          this.onJsonRpc(JSON.parse(event.data))
        }
      })

      if (this.iframeRef.contentWindow) {
        this.iframeRef.contentWindow!.postMessage('start web wallet', appURL)
      }
    })
  }

  onJsonRpc({ serial, request }: { serial: number, request: any }) {
    const { jsonrpc, id, method, params } = request
    const response: any = { jsonrpc, id }

    switch (method) {
    case 'net_version':
      response.result = '1'
      break

    case 'eth_accounts':
      response.result = [this.account]
      break

    default:
      console.log(request)
      break
    }

    const message = JSON.stringify({ serial, response })
    this.iframeRef.contentWindow!.postMessage(message, this.props.appURL)
  }

  render() {
    const { appURL } = this.props

    return (
      <Container>
        <iframe ref={ref => this.iframeRef = ref!} src={appURL} />
      </Container>
    )
  }

  private get account() {
    this.getWallet()

    return this._account
  }

  private async encryptWallet(password) {
    this.getWallet()

    if (this._account && this._decryptedWallet) {
      this._encryptedWallet = await this._decryptedWallet.encrypt(password)

      window.localStorage.setItem('account', this._account)
      window.localStorage.setItem('encryptedWallet', this._encryptedWallet)
    }
  }

  private async decryptWallet(password) {
    this.getWallet()

    if (this._encryptedWallet) {
      // @ts-ignore: https://github.com/ethers-io/ethers.js/pull/293
      this._decryptedWallet = ethers.Wallet.fromEncryptedJson(this._encryptedWallet, password)
    }
  }

  private _account?: string
  private _encryptedWallet?: string
  private _decryptedWallet?: ethers.Wallet

  private getWallet() {
    if (this._account) {
      return
    }

    const account = window.localStorage.getItem('account')
    const encryptedWallet = window.localStorage.getItem('encryptedWallet')

    if (account && encryptedWallet) {
      this._account = account
      this._encryptedWallet = encryptedWallet
      return
    }

    this._decryptedWallet = ethers.Wallet.createRandom()
    this._account = this._decryptedWallet.address
  }
}

const Container = styled.div`
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
`
