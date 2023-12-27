import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { useDarkMode, useInterval, useLocalStorage } from 'usehooks-ts'
import { GlobalStyle, theme } from './theme.js'
import { ThemeIcon } from './components/icons/ThemeIcon.jsx'
import { FadingText } from './components/FadingText.jsx'
import { Button } from './components/Button.jsx'
import { ButtonToolbar, StyledContainer, StyledSection } from './components/Layout.jsx'
import { FadingTextInput } from './components/FadingTextInput.jsx'
import { TimeRemaining } from './components/TimeRemaining.jsx'
import { PageHeading } from './components/Typography.jsx'
import { AboutIcon } from './components/icons/AboutIcon.jsx'
import { AboutModal } from './components/AboutModal.jsx'
import { SimpleCrypto } from './SimpleCrypto.js'

function App () {
  const sc = new SimpleCrypto()
  const { isDarkMode, toggle } = useDarkMode()
  const [writing, setWriting] = useLocalStorage('writing', window.localStorage.getItem('writing') ?? '')
  const [displayedWriting, setDisplayedWriting] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [displayingAbout, setDisplayingAbout] = useState(false)

  useEffect(() => {
    if (writing.length > 0) sc.decryptText(writing).then(text => setDisplayedWriting(text))
  }, [writing])

  const handleChange = event => {
    const incomingWriting = event.target.value.replace(/[^\S\n][^\S\n]+/g, ' ').replace(/\n[^\S\n]/, '\n')
    setDisplayedWriting(incomingWriting)
    sc.encryptText(incomingWriting).then(text => setWriting(text))
  }
  useEffect(() => {
    if (!window.localStorage.getItem('expiryDate') || new Date() > new Date(window.localStorage.getItem('expiryDate'))) {
      setWriting('')
      setDisplayedWriting('')
      const expiryDate = new Date()
      expiryDate.setHours(23, 59, 59)
      window.localStorage.setItem('expiryDate', expiryDate)
    }
  }
  , [timeRemaining])
  useInterval(() => setTimeRemaining(new Date(window.localStorage.getItem('expiryDate')).getTime() - new Date().getTime()), 500)
  return (
    <ThemeProvider theme={theme[isDarkMode ? 'dark' : 'light']}>
      <GlobalStyle />
      <AboutModal title='About' isOpen={displayingAbout} onClose={() => setDisplayingAbout(false)} />
      <StyledContainer>
        <StyledSection as='header' $horizontal $justify='space-between' $align='center'>
          <PageHeading aria-label='Delible ink'>
            <FadingText text='Delible ink.' />
          </PageHeading>
          <ButtonToolbar role='toolbar'>
            <Button onClick={() => setDisplayingAbout(!displayingAbout)} aria-label={`${displayingAbout ? 'Close about' : 'Open about'}`}>
              <AboutIcon size={24} />
            </Button>
            <Button onClick={toggle} aria-label={`Change to ${isDarkMode ? 'light' : 'dark'} theme`}>
              <ThemeIcon size={24} />
            </Button>
          </ButtonToolbar>
        </StyledSection>
        <StyledSection as='main' $grow>
          <FadingTextInput id='text-to-disappear' value={displayedWriting} onChange={handleChange} accessibleLabel='Text you want to disappear' describedBy='time-remaining' placeholder='Write here...' />
        </StyledSection>
        <StyledSection as='footer'>
          <TimeRemaining id='time-remaining' seconds={timeRemaining} visible={displayedWriting.length > 0} />
        </StyledSection>
      </StyledContainer>
    </ThemeProvider>
  )
}

export default App
