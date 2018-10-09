import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'mobx-little-router-react'
import styled from 'styled-components'
import WalletStore from '~/stores/WalletStore'
import DAppFrame from '~/components/DAppFrame'
import WalletDialog from '~/components/WalletDialog'
// import layout from '~/utils/layout'

export interface IIndexRouteProps {
  className: string
  router: any
  walletStore: WalletStore
}

@inject('walletStore')
@observer
class IndexRoute extends React.Component<IIndexRouteProps, {}> {
  render() {
    return (
      <Container>
        <WalletHeader>
          <div>walley</div>
          <WalletDialog />
        </WalletHeader>
        <DAppContainer>
          <DAppFrame appURL={'http://localhost:4000/'} />
        </DAppContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  font-size: 2rem;
  width: 100%;
  height: 100%;
`

const WalletHeader = styled.div`
  width: 100%;
  height: 54px;
  color: white;
  background-color: #25183b;
  border-bottom: 1px solid rgba(255,255,255,0.5);

  padding-left: 20px;
  padding-top: 15px;

  display: flex;
  flex-wrap: nowrap;
`

const DAppContainer = styled.div`
  height: 100%;
`

export default withRouter(IndexRoute)
