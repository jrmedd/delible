import { useSyncExternalStore } from 'react'

const useVisibilityChangeSubscribe = callback => {
  document.addEventListener('visibilitychange', callback)
  return () => {
    document.removeEventListener('visibilitychange', callback)
  }
}

const getVisibilityChangeSnapshot = () => {
  return document.visibilityState
}

export function useVisibilityChange () {
  const visibilityState = useSyncExternalStore(
    useVisibilityChangeSubscribe,
    getVisibilityChangeSnapshot
  )
  return visibilityState === 'visible'
}
