import styled, { css } from 'styled-components'

export const PageHeading = styled.h1(props => css`
  font-size: 2.25rem;
`)

export const SubHeading = styled.h2(props => css`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
`)

export const MinorHeading = styled.h3(props => css`
  font-size: 1.2rem;
  font-weight: 450;
  margin: 0;
`)

export const Paragraph = styled.p(props => css`
  font-size: 1rem;
  font-weight: 400;
  line-height: 150%;
`)

export const Link = styled.a(props => css`
  font-weight: 450;
  color: ${props => props.theme.text};
  &:visited {
    color: ${props => props.theme.text};
  }
`)
