import styled, { css } from 'styled-components'

const StyledSVG = styled.svg(props => css`
  display: inline-block;
  & g {
    fill: ${props => props.theme.text};
  }
`)

export const ThemeIcon = props => (
  <StyledSVG viewBox='0 0 16 16' width={props.size} height={props.size}>
    <g><path d='M12.6 2.7a7 7 0 1 0-9.9 9.9l9.9-9.9Z' /><path fillRule='evenodd' d='M13.24 4.88a6 6 0 0 1-8.36 8.36l8.36-8.36Zm.72-.72A7 7 0 0 1 3.4 13.3l9.9-9.9c.24.24.46.5.66.76Z' clipRule='evenodd' /></g>
  </StyledSVG>
)
