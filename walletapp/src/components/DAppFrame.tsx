import * as React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

export interface IDAppFrameProps {
  appURL: string
}

@observer
export default class DAppFrame extends React.Component<IDAppFrameProps, {}> {
  render() {
    const { appURL } = this.props

    return (
      <Container>
        <iframe src={appURL} />
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
