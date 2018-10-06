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
          const message = JSON.parse(event.data)
        }
      })

      if (this.iframeRef.contentWindow) {
        this.iframeRef.contentWindow!.postMessage('start web wallet', appURL)
      }
    })
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
