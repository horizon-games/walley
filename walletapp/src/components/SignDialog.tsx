import * as React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import WalletStore from '~/stores/WalletStore'

export interface ISignDialogProps {
  walletStore?: WalletStore
}

@inject('walletStore')
@observer
export default class SignDialog extends React.Component<ISignDialogProps, {}> {
  render() {
    return (
      <div>word.</div>
    )
  }
}
