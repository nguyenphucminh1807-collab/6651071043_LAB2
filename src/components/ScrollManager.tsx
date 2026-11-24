import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Cuộn lên đầu trang khi đổi route, hoặc tới phần tử theo #hash */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
