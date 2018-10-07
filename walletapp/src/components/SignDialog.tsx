import * as React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import WalletStore from '~/stores/WalletStore'

export interface ISignDialogProps {
  walletStore: WalletStore
}

@inject('walletStore')
@observer
export default class SignDialog extends React.Component<{}, {}> {

  render() {
    // const { walletStore } = this.props

    return (
      <Container visible={true}>
        <Dialog>
          hi.!
        </Dialog>
      </Container>
    )
  }
}

const dialogWidth = 400

const Container = styled.div<{ visible: boolean }>`
  opacity: ${props => props.visible ? 0.9 : 0};
  position: fixed;
  top: 0;
  left: 50%;
  width: ${dialogWidth}px;
  height: 600px;
  margin-left: -${dialogWidth/2}px;

  background-color: blue;
`

const Dialog = styled.div`
`
