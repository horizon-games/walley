import * as ethers from 'ethers'
import * as React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import WalletStore from '~/stores/WalletStore'

export interface IDAppFrameProps {
  walletStore?: WalletStore
  appURL: string
}

@inject('walletStore')
@observer
export default class DAppFrame extends React.Component<IDAppFrameProps, {}> {
  iframeRef: HTMLIFrameElement

  async componentDidMount() {
    const { walletStore } = this.props

    await walletStore!.getAddress()

    this.iframeRef.addEventListener('load', (event: UIEvent) => {
      const { appURL } = this.props

      window.addEventListener('message', (event: MessageEvent) => {
        const eventOrigin = (new URL(event.origin)).origin
        const appOrigin = (new URL(appURL)).origin

        if (eventOrigin === appOrigin) {
          this.onJsonRpcRequest(JSON.parse(event.data))
        }
      })

      if (this.iframeRef.contentWindow) {
        this.iframeRef.contentWindow!.postMessage('start web wallet', appURL)
      }
    })
  }

  async onJsonRpcRequest({ serial, request }: { serial: number, request: any }) {
    const { walletStore } = this.props
    const response = await walletStore!.onJsonRpcRequest({ serial, request })

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
}

const Container = styled.div`
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
`
