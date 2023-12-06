import styled, { css } from 'styled-components'
import { Modal } from './Modal'
import { StyledSection } from './Layout'
import { Button } from './Button'
import { Link, MinorHeading, Paragraph } from './Typography'
import { EmailIcon } from './icons/EmailIcon'
import { GitHubIcon } from './icons/GitHubIcon'

const LinkContainer = styled.div(props => css`
  display: flex;
  flex-flow: row;
  gap: 1rem;
`)

export const AboutModal = props => (
  <Modal title={props.title} isOpen={props.isOpen} onClose={props.onClose}>
    <StyledSection fullWidth>
      <Paragraph>My therapist recently asked me to start writing things down. The purpose of this writing isn't to record anything, just to get it out of my brain. Doing this repeatedly helps me to get things straight, and form positive mental pathways for things that I don't do habitually. I don't like to waste paper, so I created Delible Ink.</Paragraph>
      <Paragraph>Unlike indelible ink, this ink won't last longer than a day. Anything you type into it is totally private and disappears completely at midnight. It's minimal and unobtrusive, so I can focus on getting my thoughts down without too much distraction.</Paragraph>
    </StyledSection>
    <StyledSection fullWidth>
      <MinorHeading>About me</MinorHeading>
      <Paragraph>I'm <Link href='https://portfolio.jamesmedd.co.uk'>James Medd</Link>, a digital design consultant at <Link href='https://sparck.io'>SPARCK</Link>. I believe that open and frank conversations about our mental health are essential to moving the conversation forwards, and I'm keen to share as much of my experience as possible.</Paragraph>
    </StyledSection>
    <StyledSection fullWidth>
      <MinorHeading>Got something to add?</MinorHeading>
      <Paragraph>If you've got something to add, you can send us feedback or contribute on GitHub:</Paragraph>
      <LinkContainer>
        <Button aria-label='Email your feedback' as='a' href='mailto:feedback@delible.ink?subject=Delible ink. feedback'>
          <EmailIcon size={32} />
        </Button>
        <Button aria-label='View Delible Ink on GitHub' as='a' href='https://github.com/jrmedd/delible'>
          <GitHubIcon size={32} />
        </Button>
      </LinkContainer>
    </StyledSection>
  </Modal>)
