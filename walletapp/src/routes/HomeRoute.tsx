import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'mobx-little-router-react'
import styled from 'styled-components'
// import layout from '~/utils/layout'

export interface IHomeRouteProps {
  className: string
  router: any
}

// @observer
class HomeRoute extends React.Component<IHomeRouteProps, {}> {
  componentDidMount() {
  }

  render() {
    return (
      <Container>
        hi from home, call mom
      </Container>
    )
  }
}

const Container = styled.div`
  color: white;
  font-size: 2rem;
`

export default withRouter(HomeRoute)
