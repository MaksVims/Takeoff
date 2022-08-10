import { useState, useEffect } from 'react';

export function useLocaleStorage<T>(key: string, initialValue: T)
  : [T, React.Dispatch<React.SetStateAction<T>>] {

  function getInitialValue() {
    const json = localStorage.getItem(key)
    if (json) {
      const result: T = JSON.parse(json!)
      return result
    }
  }

  const [value, setValue] = useState<T>(() => getInitialValue() || initialValue)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}