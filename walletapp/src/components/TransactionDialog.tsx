import * as React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import WalletStore from '~/stores/WalletStore'

export interface ITransactionDialogProps {
  walletStore?: WalletStore
}

@inject('walletStore')
@observer
export default class TransactionDialog extends React.Component<ITransactionDialogProps, {}> {
  render() {
    return (
      <div>word.</div>
    )
  }
}
