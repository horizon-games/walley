import * as React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import WalletStore from '~/stores/WalletStore'
import SignDialog from './SignDialog'
import * as ethers from 'ethers'

export interface IWalletDialogProps {
  walletStore?: WalletStore
}

@inject('walletStore')
@observer
export default class WalletDialog extends React.Component<IWalletDialogProps, {}> {
  render() {
    const walletStore = this.props.walletStore!

    const visible = !!walletStore.signRequest

    return (
      <Container visible={visible}>
        { walletStore.signRequest && <SignDialog /> }
      </Container>
    )
  }
}

const dialogWidth = 320
const dialogHeight = 400


const Container = styled.div<{ visible: boolean }>`
  opacity: ${props => props.visible ? 1.0 : 0};
  position: fixed;
  top: 0;
  left: 50%;
  width: ${dialogWidth}px;
  height: ${dialogHeight}px;
  margin-left: -${dialogWidth/2}px;
  pointer-events: ${props => props.visible ? 'auto' : 'none'};
`
