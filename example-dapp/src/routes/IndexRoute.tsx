import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'mobx-little-router-react'
import styled from 'styled-components'
import WalletStore from '~/stores/WalletStore'
import * as ethers from 'ethers'
// import layout from '~/utils/layout'

export interface IIndexRouteProps {
  className: string
  router: any
  walletStore: WalletStore
}

@inject('walletStore')
@observer
class IndexRoute extends React.Component<IIndexRouteProps, {}> {
  ethSendAmountRef: HTMLInputElement | null
  ethSendAddressRef: HTMLInputElement | null

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

  sendETH = async () => {
    const { walletStore } = this.props
    console.log('sendEth:')

    const amount = this.ethSendAmountRef!.value
    const sendTo = this.ethSendAddressRef!.value

    if (amount === '') {
      console.log('Amount invalid.')
      return
    }
    if (sendTo === '' || !sendTo.startsWith('0x')) {
      console.log('SendTo Address invalid.')
      return
    }

    const rtx = {
      to: sendTo,
      value: ethers.utils.parseEther(amount)
    }

    const resp = await walletStore.signer.sendTransaction(rtx)
  }

  render() {
    return (
      <Container>
        DAPP example... mmmmhmmm<br /><br />
        <button type="button" onClick={this.getAddress}>Get Address</button><br />
        <button type="button" onClick={this.signMessage}>Sign Message</button><br />
        <div>
          <button type="button" onClick={this.sendETH}>Send ETH</button>
          <input ref={ref => this.ethSendAmountRef = ref} type="text" defaultValue={'0.1'} placeholder="ETH amount" /> to
          <input ref={ref => this.ethSendAddressRef = ref} type="text" defaultValue={'0x4b25350d7c0224a68ea0c72855bfd035d8fa09d3'} placeholder="Address" />
          <br />
        </div>
      </Container>
    )
  }
}

const Container = styled.div`
  color: black;
  font-size: 2rem;
`

export default withRouter(IndexRoute)
