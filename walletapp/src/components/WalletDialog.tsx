import * as React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import WalletStore from '~/stores/WalletStore'

export interface IWalletDialogProps {
  walletStore?: WalletStore
}

@inject('walletStore')
@observer
export default class WalletDialog extends React.Component<IWalletDialogProps, {}> {
  render() {
    return (
      <div>word.</div>
    )
  }
}
