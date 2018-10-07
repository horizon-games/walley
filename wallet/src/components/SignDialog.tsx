import * as React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import WalletStore from '~/stores/WalletStore'
import * as ethers from 'ethers'

export interface ISignDialogProps {
  walletStore?: WalletStore
}

@inject('walletStore')
@observer
export default class SignDialog extends React.Component<ISignDialogProps, {}> {
  render() {
    const walletStore = this.props.walletStore!

    const signRequest = walletStore.signRequest! as { params: any[] }
    const message = ethers.utils.toUtf8String(signRequest.params[1])

    return (
      <Container>
        <Title>Signature Request</Title>
        <Message>
          <div className={'label'}>Message:</div>
          <div className={'message'}>{message}</div>
        </Message>
        <Confirm>
          <button type="button" onClick={() => walletStore.okCancel = false}>Cancel</button>
          <button type="button" onClick={() => walletStore.okCancel = true}>Sign</button>
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

const Message = styled.div`
  .label {
    color: black;
    padding: 20px 0;
  }

  .message {
    color: black;
    font-size: 2rem;
    text-align: center;
    width: 100%;

    border-top: 1px solid black;
    border-bottom: 1px solid black;

    padding: 30px 0;
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
