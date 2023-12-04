import styled, { css } from 'styled-components'

const StyledTextarea = styled.textarea(props => css`
  width: 100%;
  outline: none;
  border: 0;
  padding: 0;
  font-family: 'PlayfairDisplay', Georgia, serif;
  min-height: 66vh;
  height: 100%;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0);
  border-radius: .6rem;
  resize: none;
  transition: all 0.3s ease;
  font-size: 1.25rem;
  font-weight: 500;
  caret-color: ${props => props.theme.text};
  color: rgba(0,0,0,0);
  &:focus {
    outline: none;
  }
`)
const TextDisplay = styled.p(props => {
  const numLetters = props.children.length
  const fadeIncrement = (1 - 0.25) / numLetters
  return (css`
    & {
      ${Array(numLetters).fill('').map((_, index) => `span:nth-child(${index}){ opacity: ${0.25 + (index * fadeIncrement)};}`).join('')}
      span {
        display: inline;
      }
    }
    padding: 0;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 66vh;
    pointer-events: none;
    font-size: 1.25rem;
    font-weight: 500;
`)
})
export const FadingTextInput = props => (
  <>
    <TextDisplay aria-hidden>{props.value.split(/(?<=\.\s)/g).map((sentence, index) => sentence.length > 0 ? <span key={`split-${index}`}>{sentence}</span> : <span key='empty' />)}</TextDisplay>
    <StyledTextarea aria-label={props.accessibleLabel} onChange={props.onChange} placeholder={props.placeholder} value={props.value} spellCheck={false} />
  </>
)
