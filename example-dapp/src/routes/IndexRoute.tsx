import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'mobx-little-router-react'
import styled from 'styled-components'
// import layout from '~/utils/layout'

export interface IIndexRouteProps {
  className: string
  router: any
}

class IndexRoute extends React.Component<IIndexRouteProps, {}> {
  getAddress = async () => {
    console.log('getAddress:, TODO')
  }

  signMessage = async () => {
    console.log('sign a message, TODO')
  }

  render() {
    return (
      <Container>
        DAPP example... mmmmhmmm<br /><br />
        <button type="button" onClick={this.getAddress}>Get Address</button><br />
        <button type="button" onClick={this.signMessage}>Sign Message</button><br />
      </Container>
    )
  }
}

const Container = styled.div`
  color: black;
  font-size: 2rem;
`

export default withRouter(IndexRoute)
