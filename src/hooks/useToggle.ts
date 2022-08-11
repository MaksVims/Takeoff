import { useState, useCallback } from 'react'

type returnedValues = [boolean, (newState: boolean) => void]

export function useToggle(defaultValue: boolean = false): returnedValues {
  const [state, setState] = useState<boolean>(defaultValue)

  const toggleState = useCallback((newState: boolean) => {
    setState(prevState => newState ? newState : !prevState)
  }, [])

  return [state, toggleState]
}