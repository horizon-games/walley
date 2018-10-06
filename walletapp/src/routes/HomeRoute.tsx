import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'mobx-little-router-react'
import styled from 'styled-components'
import DAppFrame from '~/components/DAppFrame'
// import layout from '~/utils/layout'

export interface IHomeRouteProps {
  className: string
  router: any
}

class HomeRoute extends React.Component<IHomeRouteProps, {}> {
  componentDidMount() {
  }

  render() {
    return (
      <Container>
        <Header>wallet header goes here</Header>
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

const Header = styled.div`
  width: 100%;
  height: 54px;
  background-color: #0c061e;
  border-bottom: 1px solid rgba(255,255,255,0.5);
`

const DAppContainer = styled.div`
  height: 100%;
  background-color: #111;
`

export default withRouter(HomeRoute)
