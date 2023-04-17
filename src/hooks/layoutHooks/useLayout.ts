import { useLayoutEffect, useState, useEffect } from "react";


import { useEffectOnce, useEventListener, useIsomorphicLayoutEffect } from 'usehooks-ts'

interface Size {
  width: number
  height: number
}

export const useWindowSize = (): Size => {
  const [windowSize, setWindowSize] = useState<Size>()

  const handleSize = () => {
    setWindowSize({
      width: window.outerWidth,
      height: window.outerHeight,
    })
  }

  useEventListener('resize', handleSize)
  useIsomorphicLayoutEffect(() => {
    handleSize()
  }, [])

  return windowSize ? windowSize : {
    width: 0,
    height: 0
  }
}
export const useContentSize = (): Size => {
  const [windowSize, setWindowSize] = useState<Size>()

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEventListener('resize', handleSize)
  useIsomorphicLayoutEffect(() => {
    handleSize()
  }, [])

  return windowSize ? windowSize : {
    width: 0,
    height: 0
  }
}