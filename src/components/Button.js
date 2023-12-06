import styled, { css } from 'styled-components'

export const Button = styled.button(props => css`
  outline: none;
  background: none;
  appearance: none;
  border: none;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.2s ease;
  & {
    * {
      transform-origin: center;
      transform: scale(0.9);
      transition: all 0.2s ease;
    }
  }
  &:hover, &:focus {
    opacity: 1;
    * {
      transform: scale(1);
    }
  }
  &:active {
    * {
      transform: scale(0.9);
    }
  }
  &:visited {
    color: ${props => props.theme.text};
  }
`)
