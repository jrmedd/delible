import styled, { css } from 'styled-components'

const TimeRemainingText = styled.p(props => css`
  font-size: 1rem;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 1s ease;
`)

const TimeRemainingFormat = props => {
  const hours = Math.floor(props.seconds / (1000 * 60 * 60))
  const minutes = Math.floor((props.seconds % (1000 * 60 * 60)) / (1000 * 60))
  return (<>These words will disappear in {hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} and` : ''} {minutes} minute{minutes === 1 ? '' : 's'}</>)
}

export const TimeRemaining = props => (
  <TimeRemainingText id={props.id} $visible={props.visible}>
    <TimeRemainingFormat seconds={props.seconds} />
  </TimeRemainingText>
)
