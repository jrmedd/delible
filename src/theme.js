import { createGlobalStyle } from 'styled-components'

export const theme = {
  dark: {
    text: 'rgb(250, 245, 234)',
    background: 'rgb(0, 0, 0)'
  },
  light: {
    text: 'rgb(0, 0, 0)',
    background: 'rgb(250, 245, 234)'
  }
}
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'PlayfairDisplay';
    src: url('PlayfairDisplay-VariableFont_wght.ttf');
    font-display: swap;
  }
  body {
    background-color: ${props => props.theme.background};
    font-family: 'PlayfairDisplay', Georgia, serif;
  }
`
