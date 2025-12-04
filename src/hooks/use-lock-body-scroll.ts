import { useEffect } from 'react'

const isBrowser = typeof window !== 'undefined'
const isIosDevice = isBrowser && /iP(ad|hone|od)/.test(navigator.platform)
let documentListenerAdded = false

const bodies = new Map<
  HTMLElement,
  { counter: number; initialOverflow: string }
>()

const lockBodyScroll = () => {
  const body = document.body
  const bodyInfo = bodies.get(body)

  if (!bodyInfo) {
    bodies.set(body, { counter: 1, initialOverflow: body.style.overflow })
    body.style.overflow = 'hidden'
    body.style.paddingRight = '8px' /* Compensate for scrollbar width */

    if (isIosDevice && !documentListenerAdded) {
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      })
      documentListenerAdded = true
    }
  } else {
    bodies.set(body, { ...bodyInfo, counter: bodyInfo.counter + 1 })
  }
}

const unlockBodyScroll = () => {
  const body = document.body
  const bodyInfo = bodies.get(body)

  if (bodyInfo) {
    if (bodyInfo.counter === 1) {
      bodies.delete(body)
      body.style.overflow = bodyInfo.initialOverflow
      body.style.paddingRight = '' /* Remove padding compensation */

      if (isIosDevice && documentListenerAdded) {
        document.removeEventListener('touchmove', handleTouchMove)
        documentListenerAdded = false
      }
    } else {
      bodies.set(body, { ...bodyInfo, counter: bodyInfo.counter - 1 })
    }
  }
}

const handleTouchMove = (event: TouchEvent) => {
  const target = event.target as HTMLElement
  if (canScroll(target) || target.closest('.scrollable')) return
  event.preventDefault()
}

const canScroll = (el: HTMLElement) => el.scrollHeight > el.clientHeight

const useLockBodyScroll = (locked: boolean = true) => {
  useEffect(() => {
    if (locked) {
      lockBodyScroll()
    } else {
      unlockBodyScroll()
    }

    return () => unlockBodyScroll()
  }, [locked])
}

export default useLockBodyScroll
