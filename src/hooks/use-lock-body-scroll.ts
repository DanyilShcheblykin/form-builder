import { useEffect } from 'react'

const isBrowser = typeof window !== 'undefined'
const isIosDevice = isBrowser && /iP(ad|hone|od)/.test(navigator.platform)
let documentListenerAdded = false

const bodies = new Map<
  HTMLElement,
  { counter: number; initialOverflow: string; initialPaddingRight: string }
>()

/**
 * Calculate the width of the scrollbar in the current browser
 */
const getScrollbarWidth = (): number => {
  if (!isBrowser) return 0

  // Create a temporary element to measure scrollbar width
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  ;(outer.style as any).msOverflowStyle = 'scrollbar' // needed for WinJS apps
  document.body.appendChild(outer)

  // Create inner element
  const inner = document.createElement('div')
  outer.appendChild(inner)

  // Calculate difference between outer and inner width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

  // Remove temporary elements
  outer.parentNode?.removeChild(outer)

  return scrollbarWidth
}

const lockBodyScroll = () => {
  const body = document.body
  const bodyInfo = bodies.get(body)

  if (!bodyInfo) {
    // Calculate scrollbar width
    const scrollbarWidth = getScrollbarWidth()
    
    // Store initial values
    const initialOverflow = body.style.overflow
    const initialPaddingRight = body.style.paddingRight
    
    // Apply lock
    body.style.overflow = 'hidden'
    
    // Only add padding if scrollbar exists and there's content to scroll
    if (scrollbarWidth > 0 && document.documentElement.scrollHeight > window.innerHeight) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    bodies.set(body, {
      counter: 1,
      initialOverflow,
      initialPaddingRight,
    })

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
      // Restore initial values
      body.style.overflow = bodyInfo.initialOverflow
      body.style.paddingRight = bodyInfo.initialPaddingRight

      bodies.delete(body)

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
