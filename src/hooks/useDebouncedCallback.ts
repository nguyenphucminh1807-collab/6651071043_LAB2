import { useEffect, useMemo, useRef } from 'react'
import { debounce } from '../utils'

/** Trả về hàm đã debounce nhưng luôn gọi phiên bản callback mới nhất */
export function useDebouncedCallback<T extends (...args: never[]) => void>(callback: T, delay: number): T {
  const latest = useRef<T>(callback)

  useEffect(() => {
    latest.current = callback
  }, [callback])

  return useMemo(() => {
    const invoke = ((...args: Parameters<T>) => latest.current(...args)) as unknown as T
    return debounce(invoke, delay)
  }, [delay])
}
