import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'mobx-little-router-react'
import styled from 'styled-components'
import WalletStore from '~/stores/WalletStore'
import DAppFrame from '~/components/DAppFrame'
import SignDialog from '~/components/SignDialog'
// import layout from '~/utils/layout'

export interface IIndexRouteProps {
  className: string
  router: any
  walletStore: WalletStore
}

@inject('walletStore')
@observer
class IndexRoute extends React.Component<IIndexRouteProps, {}> {
  // getAddress = async () => {
  //   const wallet = this.props.walletStore.wallet
  //   const address = await wallet.ethWallet.getAddress()

  //   console.log('getAddress:', address)
  // }

  // signMessage = async () => {
  //   console.log('sign a message')
  // }

  render() {
    return (
      <Container>
        <WalletHeader>
          <div>walley</div>
          <SignDialog />
        </WalletHeader>
        <DAppContainer>
          <DAppFrame appURL={'http://localhost:4000/'} />
        </DAppContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  color: white;
  font-size: 2rem;
  width: 100%;
  height: 100%;
  background-color: #111;
`

const WalletHeader = styled.div`
  width: 100%;
  height: 54px;
  background-color: #0c061e;
  border-bottom: 1px solid rgba(255,255,255,0.5);

  padding-left: 20px;
  padding-top: 15px;

  display: flex;
  flex-wrap: nowrap;
`

const DAppContainer = styled.div`
  height: 100%;
  background-color: #111;
`

export default withRouter(IndexRoute)
