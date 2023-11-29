import { useEffect, useState } from 'react'
import './App.css'
import styled, { css, keyframes } from 'styled-components'
import { useInterval, useLocalStorage } from 'usehooks-ts'

const StyledMain = styled.main(props => css`
  width: 100%;
  height: 100vh;
  font-family: 'PlayfairDisplay';
  display: flex;
  flex-flow: column;
  gap: 1rem;
  background: #faf5e9;
  align-items: center;
`)

const StyledSpan = styled.span(props => css`
  display: inline-block;
  font-weight: ${props => props.weight};
  opacity: ${props => props.opacity};
  transition: all 6s ease;
`)

const writingFade = keyframes`
  0% {
    font-weight: 900;
    opacity: 1;
  }
  50% {
    font-weight: 400;
    opacity: 0.25;
  }
  100% {
    font-weight: 900;
    opacity: 1;
  }
`

const AnimatedLetter = styled.span(props => css`
  display: inline-block;
  animation: ${writingFade} 60s infinite;
  animation-delay: ${props => props.delay * 3}s;
`)

const StyledSection = styled.section(props => css`
  width: 65ch;
  max-width: 95%;
  position: relative;
  flex-grow: ${props => props.grow ? '1' : '0'};
`)

const PageHeading = styled.h1(props => css`
  font-size: 2.25rem;
`)

const StyledTextarea = styled.textarea(props => css`
  width: 100%;
  outline: none;
  border: 0;
  padding: 0;
  font-family: 'PlayfairDisplay';
  min-height: 66vh;
  height: 100%;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0);
  border-radius: .6rem;
  resize: none;
  transition: all 0.3s ease;
  font-size: 1.25rem;
  font-weight: 500;
  caret-color: #000;
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

const FadingText = props => {
  const letters = props.text.split('')
  const weightStep = Math.floor((900 - 400) / letters.length)
  const opacityStep = 0.5 / letters.length
  return (
    <>
      {
         letters.map((letter, index) => <StyledSpan key={`letter-${index}`} opacity={0.5 + (index * opacityStep)} weight={400 + (index * weightStep)}>{letter !== ' ' ? <>{letter}</> : <>&nbsp;</>}</StyledSpan>)
      }
    </>
  )
}

const TimeRemainingText = styled.p(props => css`
  font-size: 1rem;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 1s ease;
`)

const TimeRemainingFormat = props => {
  const hours = Math.floor(props.seconds / (1000 * 60 * 60))
  const minutes = Math.floor((props.seconds % (1000 * 60 * 60)) / (1000 * 60))
  return (<>These words will disappear in {hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} and` : ''} {minutes} minute{minutes === 1 ? '' : 's'}</>)
}

function App () {
  const [message, setMessage] = useLocalStorage('message', window.localStorage.getItem('message') ?? '')
  const [timeRemaining, setTimeRemaining] = useState(0)
  const handleChange = event => {
    if (event.nativeEvent.inputType !== 'insertLineBreak') {
      setMessage(event.target.value.replace(/\s\s+/g, ' '))
    }
  }
  useEffect(() => {
    if (!window.localStorage.getItem('expiryDate') || new Date() > new Date(window.localStorage.getItem('expiryDate'))) {
      setMessage('')
      const expiryDate = new Date()
      expiryDate.setHours(23, 59, 59)
      window.localStorage.setItem('expiryDate', expiryDate)
    }
  }
  , [timeRemaining])
  useInterval(() => setTimeRemaining(new Date(window.localStorage.getItem('expiryDate')).getTime() - new Date().getTime()), 500)
  return (
    <StyledMain>
      <StyledSection>
        <PageHeading>
          <FadingText text='Delible ink.' />
        </PageHeading>
      </StyledSection>
      <StyledSection grow>
        <TextDisplay aria-hidden>{message.split(/(?<=\.\s)/g).map((sentence, index) => sentence.length > 0 ? <span key={`split-${index}`}>{sentence}</span> : <span key='empty' />)}</TextDisplay>
        <StyledTextarea onChange={handleChange} placeholder='Write here...' value={message} spellCheck={false} />
      </StyledSection>
      <StyledSection>
        <TimeRemainingText visible={message.length > 0}>
          <TimeRemainingFormat seconds={timeRemaining} />
        </TimeRemainingText>
      </StyledSection>
    </StyledMain>
  )
}

export default App
