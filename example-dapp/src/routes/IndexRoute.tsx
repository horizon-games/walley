import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'mobx-little-router-react'
import styled from 'styled-components'
import WalletStore from '~/stores/WalletStore'
// import layout from '~/utils/layout'

export interface IIndexRouteProps {
  className: string
  router: any
  walletStore: WalletStore
}

@inject('walletStore')
@observer
class IndexRoute extends React.Component<IIndexRouteProps, {}> {
  getAddress = async () => {
    const { walletStore } = this.props
    console.log('getAddress:')
    const address = await walletStore.signer.getAddress()
    console.log('=>', address)
  }

  signMessage = async () => {
    const { walletStore } = this.props
    console.log('signMessage(hello):')
    const sig = await walletStore.signer.signMessage('hello')
    console.log('=>', sig)
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
