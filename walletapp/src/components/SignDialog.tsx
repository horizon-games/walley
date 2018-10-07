import * as React from 'react'
import styled from 'styled-components'

export default class SignDialog extends React.Component<{}, {}> {

  render() {
    return (
      <Container>
        <Dialog>hi.!</Dialog>
      </Container>
    )
  }
}

const dialogWidth = 400

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  width: ${dialogWidth}px;
  height: 600px;
  margin-left: -${dialogWidth/2}px;

  background-color: blue;
  opacity: 0.5;
`

const Dialog = styled.div`
`
