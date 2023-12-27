import styled, { css } from 'styled-components'

export const StyledContainer = styled.div(props => css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.background};
  align-items: center;
`)
export const StyledSection = styled.section(props => css`
  width: ${props => props.$fullWidth ? '100%' : '65ch'};
  max-width: ${props => props.$fullWidth ? '100%' : '95%'};
  position: relative;
  display: flex;
  flex-flow: ${props => props.$horizontal ? 'row wrap' : 'column'};
  flex-grow: ${props => props.$grow ? '1' : '0'};
  justify-content: ${props => props.$justify ?? 'unset'};
  align-items: ${props => props.$align ?? 'unset'};
`)

export const ButtonToolbar = styled.div(props => css`
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  gap: .5rem;
`)
