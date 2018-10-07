import * as React from 'react'
import styled from 'styled-components'

export default class SignDialog extends React.Component<{}, {}> {

  render() {
    return (
      <Container>
        hi
      </Container>
    )
  }
}

const Container = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 250px;
  width: 400px;
  height: 600px;
  background-color: blue;
  opacity: 0.5;
`
