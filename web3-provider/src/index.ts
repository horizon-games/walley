const ORIGIN = 'http://localhost:3000'

let waitForWeb3Resolve: (web3: Web3) => void
export const waitForWeb3: Promise<Web3> = new Promise((resolve, _) => {
  waitForWeb3Resolve = resolve
})

let serial = 0
const callbacks: { [serial: number]: (error: any, response: any) => void } = {}

window.addEventListener('message', (event: MessageEvent) => {
  if (event.origin === ORIGIN) {
    if (event.data === 'start web wallet') {
      const walletWindow = event.source as Window

      const web3 = new Web3(walletWindow)
      ;(window as any).web3 = web3
      waitForWeb3Resolve(web3)
    } else {
      console.log('event data', event.data)
      const message = JSON.parse(event.data)
      const callback = callbacks[message.serial]
      callback(undefined, message.response)
      delete callbacks[message.serial]
    }
  }
})

function registerCallback(callback: (error: any, response: any) => void) {
  callbacks[serial++] = callback
}

class Web3 {
  constructor(walletWindow: Window) {
    this.currentProvider = new Web3Provider(walletWindow)
  }

  readonly currentProvider: Web3Provider
}

class Web3Provider {
  constructor(walletWindow: Window) {
    this.sendAsync = (request: any, callback: (error: any, response: any) => void) => {
      const message = { serial, request }
      walletWindow.postMessage(JSON.stringify(message), ORIGIN)
      registerCallback(callback)
    }
  }

  sendAsync: (request: any, callback: (error: any, response: any) => void) => void
}
