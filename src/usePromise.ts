import { useState } from 'react'

export const usePromise = <T, E extends Error = Error>(): [{resolve?: (t: T) => void, reject?: (e: E) => void}, () => Promise<T>] => {
  const [{resolve, reject}, setPromise] = useState<{resolve?: (t: T) => void, reject?: (e: E) => void}>({})
  const makePromise = async (): Promise<T> => {
    return await new Promise((resolve, reject) => {
      setPromise({resolve, reject})
    })
  }
  return [{resolve, reject}, makePromise]
}
