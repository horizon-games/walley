import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Provider, observer } from 'mobx-react'
import { RouterProvider, Outlet } from 'mobx-little-router-react'
import styled, { injectGlobal } from 'styled-components'
import reset from 'styled-reset'
import Helmet from 'react-helmet'
// import Header from './components/Header'
import layout, { GridColumnHelper } from '~/utils/layout'
import { IStores} from '~/stores'

interface AppProps {
  router: any
  stores: IStores
}

@observer
class App extends React.Component<AppProps> {
  render() {
    const { router, stores } = this.props

    return (
      <Provider {...stores}>
        <RouterProvider router={router}>
          <>
            <Helmet titleTemplate="%s">
            </Helmet>
            <Viewport>
              <Outlet />
            </Viewport>
          </>
        </RouterProvider>
      </Provider>
    )
  }
}

const Viewport = styled.div`
  height: 100%;
  padding: 20px;
`

injectGlobal`
  ${reset}

  * {
    box-sizing: border-box;
  }

  html, body, #app {
    padding: 0;
    margin: 0;
    height: 100%;
    background-color: #0c061e;
  }

  .outlet, .router-transition-group, .router-transition-item {
    height: 100%;
  }

  html {
    font-family: 'Helvetica Neue', sans-serif;

    ${layout.mobile`
      font-size: 48%;
    `}

    ${layout.tablet`
      font-size: 54%;
    `}

    ${layout.desktop`
      font-size: 62.5%;
    `}
  }

  body {
    font-size: 1rem;
  }

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }

  a {
    text-decoration: none;
  }
`

export default hot(module)(App)
