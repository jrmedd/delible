import styled, { css } from 'styled-components'
import { Button } from './Button.jsx'
import { CloseIcon } from './icons/CloseIcon.jsx'
import { StyledSection } from './Layout.jsx'
import { SubHeading } from './Typography.jsx'
import { useEffect, useRef } from 'react'
import FocusTrap from 'focus-trap-react'

const Overlay = styled.div(pops => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  overflow: auto;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  backdrop-filter: blur(6px);
`
)

const ModalWrapper = styled.aside(props => css`
  box-sizing: border-box;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 1.25rem;
  border-radius: .5rem;
  width: 65ch;
  max-width: 95%;
  border: 1px solid ${props => props.theme.text};
`)

export const Modal = ({ isOpen, onClose, title, children }) => {
  const modalId = `${title.toLowerCase()}-modal`
  const initialFocus = useRef(null)
  useEffect(() => {
    if (isOpen) {
      initialFocus.current.focus()
    }
  }, [isOpen])
  if (!isOpen) return null
  return (
    <Overlay>
      <FocusTrap>
        <ModalWrapper aria-modal='true' aria-labelledby={modalId}>
          <StyledSection $horizontal $justify='space-between' $align='center' $fullWidth>
            <SubHeading ref={initialFocus} tabIndex='-1' id={modalId}>{title}</SubHeading>
            <Button aria-label={`Close "${title}"`} onClick={onClose}>
              <CloseIcon size={24} />
            </Button>
          </StyledSection>
          {children}
        </ModalWrapper>
      </FocusTrap>
    </Overlay>
  )
}
