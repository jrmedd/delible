import styled, { css } from 'styled-components'

const StyledSpan = styled.span(props => css`
  display: inline-block;
  font-weight: ${props => props.weight};
  opacity: ${props => props.opacity};
`)

export const FadingText = props => {
  const letters = props.text.split('')
  const weightStep = Math.floor((900 - 400) / letters.length)
  const opacityStep = 0.5 / letters.length
  return (
    <>
      {letters.map((letter, index) => <StyledSpan key={`letter-${index}`} opacity={0.5 + (index * opacityStep)} weight={400 + (index * weightStep)}>{letter !== ' ' ? <>{letter}</> : <>&nbsp;</>}</StyledSpan>)}
    </>
  )
}
