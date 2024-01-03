import { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

const StyledTextarea = styled.textarea(props => css`
  width: 100%;
  outline: none;
  border: 0;
  padding: 0;
  font-family: 'PlayfairDisplay', Georgia, serif;
  min-height: 66vh;
  height: ${props => props.$height}px;
  line-height: 150%;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0);
  resize: none;
  font-size: 1.25rem;
  font-weight: 500;
  caret-color: ${props => props.theme.text};
  color: rgba(0,0,0,0);
  &:focus {
    outline: none;
  }
  &::-moz-placeholder {
    color: ${props => props.theme.text};
  }
  &::-webkit-scrollbar {
    display: none;
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
    line-height: 150%;
`)
})
export const FadingTextInput = props => {
  const textareaRef = useRef(null)
  const idealHeight = useRef(32)
  const lastScrollHeight = useRef(30)
  useEffect(() => {
    if (textareaRef) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.removeAttribute('style')
      const delta = scrollHeight - lastScrollHeight.current
      lastScrollHeight.current = scrollHeight
      idealHeight.current = idealHeight.current + delta
    }
  }, [props.value])

  return (
    <>
      <TextDisplay aria-hidden>{props.value.split(/(?<=\.\s|\n)/g).map((sentence, index) => sentence.length > 0 ? <span key={`split-${index}`}>{sentence}{sentence.includes('\n') && <br />}</span> : <span key='empty' />)}</TextDisplay>
      <StyledTextarea $height={idealHeight.current} ref={textareaRef} id={props.id} aria-label={props.accessibleLabel} aria-describedby={props.describedBy} onChange={props.onChange} placeholder={props.placeholder} value={props.value} spellCheck={false} />
    </>
  )
}
