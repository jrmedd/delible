import styled, { css } from 'styled-components'

const StyledSVG = styled.svg(props => css`
  display: inline-block;
  & path {
    fill: ${props => props.theme.text};
  }
`)

export const SVGIcon = props => <StyledSVG viewBox='0 0 16 16' width={props.size} height={props.size}>{props.children}</StyledSVG>
