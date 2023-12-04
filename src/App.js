import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { useDarkMode, useInterval, useLocalStorage } from 'usehooks-ts'
import { GlobalStyle, theme } from './theme.js'
import { ThemeIcon } from './components/icons/ThemeIcon.js'
import { FadingText } from './components/FadingText.js'
import { Button } from './components/Button.js'
import { StyledMain, StyledSection } from './components/Layout.js'
import { FadingTextInput } from './components/FadingTextInput.js'
import { TimeRemaining } from './components/TimeRemaining.js'
import { PageHeading } from './components/Typography.js'

function App () {
  const { isDarkMode, toggle } = useDarkMode()
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
    <ThemeProvider theme={theme[isDarkMode ? 'dark' : 'light']}>
      <GlobalStyle />
      <StyledMain>
        <StyledSection horizontal justify='space-between' align='center'>
          <PageHeading aria-label='Delible ink'>
            <FadingText text='Delible ink.' />
          </PageHeading>
          <Button onClick={toggle} aria-label={`Change to ${isDarkMode ? 'light' : 'dark'} theme`}>
            <ThemeIcon size={24} />
          </Button>
        </StyledSection>
        <StyledSection grow>
          <FadingTextInput value={message} onChange={handleChange} accessibleLabel='Text you want to disappear' placeholder='Write here...' />
        </StyledSection>
        <StyledSection>
          <TimeRemaining seconds={timeRemaining} visible={message.length > 0} />
        </StyledSection>
      </StyledMain>
    </ThemeProvider>
  )
}

export default App
