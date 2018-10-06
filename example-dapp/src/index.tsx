import '@webwallet/provider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as mobx from 'mobx'
import { createBrowserHistory, createHashHistory } from 'history'
import { install } from 'mobx-little-router-react'
import App from './App'
import createStores from './stores'
import routes from './routes'

const stores = createStores()

const history = (() => {
  // if (process.env.INDEX_ROUTING === 'on') {
  //   return createBrowserHistory()
  // } else {
  //   return createHashHistory()
  // }
  return createHashHistory()
})()

const router = install({
  history: history,
  routes: routes,
  getContext: () => ({
    status: 200,
    stores: stores
  })
})

// router.subscribeEvent(ev => {
//   if (ev.type === 'NAVIGATION_START') {
//     console.group(`%cNavigation (${ev.navigation.sequence})`, 'color: black')
//   }

//   if (ev.navigation && ev.navigation.sequence > -1) {
//     console.log(`%c${ev.type}`, `color:${getGroupColor(ev)}`, `(${ev.elapsed}ms)`, ev)
//   }

//   if (ev.done) {
//     console.groupEnd()
//   }
// })

function getGroupColor(ev) {
  switch (ev.type) {
    case 'NAVIGATION_START':
      return 'black'
    case 'NAVIGATION_CANCELLED':
      return 'red'
    case 'NAVIGATION_ERROR':
      return 'red'
    case 'NAVIGATION_END':
      return 'green'
    default:
      return '#999'
  }
}

{
  (window as any).mobx = mobx;
  (window as any).router = router
}

router.start(() => {
  ReactDOM.render(
    <App router={router} stores={stores} />,
    document.getElementById('app')
  )
})
