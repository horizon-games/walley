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
}

const Container = styled.div`
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
`
