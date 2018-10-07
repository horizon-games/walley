import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'mobx-little-router-react'
import styled from 'styled-components'
import WalletStore from '~/stores/WalletStore'
import * as ethers from 'ethers'

export interface IIndexRouteProps {
  className: string
  router: any
  walletStore: WalletStore
}

@inject('walletStore')
@observer
class IndexRoute extends React.Component<IIndexRouteProps, { log: string }> {
  sendETHAddressInput: HTMLInputElement | null
  sendETHAmountInput: HTMLInputElement | null
  signMessageInput: HTMLInputElement | null

  state = { log: '' }

  appendLog(m: string) {
    this.setState({ log: `${m}<br />\n${this.state.log}` })
  }

  getAddress = async () => {
    const { walletStore } = this.props
    console.log('getAddress:')
    const address = await walletStore.signer.getAddress()
    console.log('=>', address)
    this.appendLog(address)
  }

  getBalance = async () => {
    const { walletStore } = this.props
    console.log('getBalance:')
    const balance = await walletStore.signer.getBalance()
    console.log('=>', balance)
    this.appendLog(balance.toString())
  }

  signMessage = async () => {
    const { walletStore } = this.props
    console.log('signMessage(hello):')
    const sig = await walletStore.signer.signMessage(this.signMessageInput!.value)
    console.log('=>', sig)
    this.appendLog(sig)
  }

  sendETH = async () => {
    const { walletStore } = this.props
    console.log('sendEth:')

    const amount = this.sendETHAmountInput!.value
    const sendTo = this.sendETHAddressInput!.value

    if (amount === '') {
      console.log('Amount invalid.')
      this.appendLog('ERR: Amount invalid.')
      return
    }
    if (sendTo === '' || !sendTo.startsWith('0x')) {
      console.log('SendTo Address invalid.')
      this.appendLog('ERR: SendTo Address invalid.')      
      return
    }

    const rtx = {
      to: sendTo,
      value: ethers.utils.parseEther(amount)
    }

    const resp = await walletStore.signer.sendTransaction(rtx)
    console.log('tx resp:', resp)
    this.appendLog(`tx.hash: ${resp.hash}`)
  }

  render() {
    return (
      <Container>
        <h1>DAPP example</h1>

        <fieldset className={'getAddress'}>
          <legend>Get Wallet Address</legend>
          <button type="button" onClick={this.getAddress}>Get Address</button>
        </fieldset>

        <fieldset className={'getBalance'}>
          <legend>Get ETH Balance</legend>
          <button type="button" onClick={this.getBalance}>Get ETH Balance</button>
        </fieldset>

        <fieldset className={'signMessage'}>
          <legend>Signing a Message</legend>
          <input ref={ref => this.signMessageInput = ref} type="text" defaultValue={'Sign Me!'} />
          <button type="button" onClick={this.signMessage}>Sign Message</button>
        </fieldset>

        <fieldset className={'sendETH'}>
          <legend>Send ETH</legend>
          <input className={'ethAmount'} ref={ref => this.sendETHAmountInput = ref} type="text" defaultValue={'0.1'} placeholder="ETH amount" /> to
          <input className={'toAddress'} ref={ref => this.sendETHAddressInput = ref} type="text" defaultValue={'0x4b25350d7c0224a68ea0c72855bfd035d8fa09d3'} placeholder="Address" />
          <button type="button" onClick={this.sendETH}>Send ETH</button>
        </fieldset>

        <div className={'debug'}>
          <b>Log:</b>
          <div className={'log'}>
            <span dangerouslySetInnerHTML={{__html: this.state.log}} />
          </div>
        </div>
      </Container>
    )
  }
}

const Container = styled.div`
  padding: 40px;
  color: black;
  font-size: 2rem;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    padding-bottom: 20px;
  }

  fieldset {
    display: block;
    margin-left: 2px;
    margin-right: 2px;
    padding-top: 0.35em;
    padding-bottom: 0.625em;
    padding-left: 0.75em;
    padding-right: 0.75em;
    border: 2px groove #333;
    margin-top: 20px;
  }

  .signMessage input {
    width: 300px;
  }

  .ethAmount {
    width: 50px;
  }

  .toAddress {
    width: 350px;
  }

  .debug {
    margin-top: 100px;
  }

  .log {
    height: 200px;
    overflow: scroll;
    border: 1px solid black;
    font-size: 1.5rem;
    line-height: 18px;
  }
`

export default withRouter(IndexRoute)
