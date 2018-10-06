import * as React from 'react'
import Subdivision from 'subdivision-styled-components'
import styled, { css } from 'styled-components'

const subdivision = new Subdivision({ gutter: 20 })
const { Grid } = subdivision

export const desktop = (...args: any[]) => {
  // @ts-ignore
  const s = css(...args) as string[]

  return css`
    @media screen and (min-width: 1025px) {
      ${s};
    }
  `
}

export const tablet = (...args: any[]) => {
  // @ts-ignore
  const s = css(...args)

  return css`
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      ${s};
    }
  `
}

export const mobile = (...args: any[]) => {
  // @ts-ignore
  const s = css(...args)

  return css`
    @media screen and (max-width: 767px) {
      ${s};
    }
  `
}

const layout = {
  desktop,
  tablet,
  mobile,

  subdivision: subdivision,
  Grid: subdivision.Grid,
  gutter: subdivision.gutter,
  column: subdivision.column,
  offset: subdivision.offset,
  center: subdivision.center,
  stack: subdivision.stack(),
  fullBleed: subdivision.fullBleed(),
  uncenter: subdivision.uncenter(),
  rows: subdivision.rows(),
  columns: subdivision.columns()
}

export default layout

export { Grid }

if (process.env.NODE_ENV === 'development') {
  window.addEventListener('keypress', ev => {
    if (ev.keyCode === 96) { // key: `
      const el = document.getElementsByClassName('gridColumnHelper').item(0)
      // @ts-ignore
      if (el.style.display === '' || el.style.display === 'none') {
        // @ts-ignore
        el.style.display = 'block'
      } else {
        // @ts-ignore
        el.style.display = 'none'
      }
    }
  })
}

export const GridColumnHelper = ({ visible }: { visible?: boolean }) => {
  if (process.env.NODE_ENV !== 'development') {
    return <></>
  } else {
    return (
      <GridColumnHelperContainer className={'gridColumnHelper'} visible={visible}>
        <div className={'centered'}>
          <Grid>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </Grid>
        </div>
      </GridColumnHelperContainer>
    )
  }
}

const GridColumnHelperContainer = styled.div<{ visible?: boolean }>`
  ${props => !!props.visible ? 'display: block;' : 'display: none;' }

  ${layout.mobile`
    ${Grid} > div:nth-child(n+3) {
      display: none;
    }
  `};

  ${layout.tablet`
    ${Grid} > div:nth-child(n+9) {
      display: none;
    }
  `};

  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .centered {
    height: 100%;

    ${layout.center(12 / 12)};
  }

  ${Grid} {
    height: 100%;

    > div {
      background-color: rgba(255, 0, 128, 0.1);
    }
  }
`
