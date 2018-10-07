import * as React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import WalletStore from '~/stores/WalletStore'
import * as ethers from 'ethers'

export interface ITransactionDialogProps {
  walletStore?: WalletStore
}

@inject('walletStore')
@observer
export default class TransactionDialog extends React.Component<ITransactionDialogProps, {}> {
  toInput: HTMLInputElement | null
  ethInput: HTMLInputElement | null
  gasInput: HTMLInputElement | null

  sendETH = () => {
    const walletStore = this.props.walletStore!

    walletStore.sendETHTo = this.toInput!.value
    walletStore.sendETHValue = ethers.utils.parseEther(this.ethInput!.value).toHexString()
    walletStore.sendETHGas = ethers.utils.bigNumberify(this.gasInput!.value).toHexString()

    walletStore.okCancel = true
  }

  render() {
    const walletStore = this.props.walletStore!

    const params = (walletStore.sendETHRequest! as { params: any[] }).params

    const to = params[0].to
    const gas = ethers.utils.bigNumberify(params[0].gas).toString()
    const value = ethers.utils.formatEther(ethers.utils.bigNumberify(params[0].value))

    return (
      <Container>
        <Title>Send ETH</Title>
        <Tx>
          <div><b>From:</b>{walletStore.account!.substring(0, 26)}...<br /><br /></div>
          <div><b>To:</b><input ref={ref => this.toInput = ref} className={'to'} type="text" defaultValue={to} /></div>
          <div><b>Amount (ETH):</b><input ref={ref => this.ethInput = ref} className={'eth'} type="text" defaultValue={value} /></div>
          <div><b>Gas:</b><input ref={ref => this.gasInput = ref} className={'gas'} type="text" defaultValue={gas} /></div>
        </Tx>
        <Confirm>
          <button type="button" onClick={() => walletStore.okCancel = false}>Cancel</button>
          <button type="button" onClick={this.sendETH}>Send</button>
        </Confirm>
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  background-color: #999;
  border: 2px solid black;
  border-top: 0;
  border-radius: 0 0 20px 20px;

  box-shadow: 0 2px 16px rgba(0,0,0,0.4);

  padding: 20px;
`

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  color: black;
  padding-bottom: 3px;
  border-bottom: 1px solid black;
`

const Tx = styled.div`
  color: black;
  font-size: 1.8rem;
  line-height: 22px;
  text-align: left;
  width: 100%;
  background-color: #CCC;

  border-top: 1px solid black;
  border-bottom: 1px solid black;

  padding: 30px 5px;

  input {
    width: 100%;
    font-size: 1.8rem;
  }
`

const Confirm = styled.div`
  padding-top: 40px;
  width: 100%;
  text-align: center;

  button {
    font-size: 1.5rem;
  }
`
