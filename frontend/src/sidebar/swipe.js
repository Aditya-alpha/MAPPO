import { useState, useRef, useEffect, useCallback } from "react"

const useSwipe = (onSwipeOpen, onSwipeClose) => {
    const touchStartX = useRef(0)
    const touchEndX = useRef(0)
    const [isSwiping, setIsSwiping] = useState(false)

    const handleTouchStart = useCallback((e) => {
        touchStartX.current = e.touches[0].clientX
        setIsSwiping(true)
    }, [])

    const handleTouchEnd = useCallback((e) => {
        touchEndX.current = e.changedTouches[0].clientX

        const swipeDistance = touchEndX.current - touchStartX.current
        const swipeThreshold = 100

        if (isSwiping) {
            if (swipeDistance > swipeThreshold) {
                onSwipeOpen()
            } else if (swipeDistance < -swipeThreshold) {
                onSwipeClose()
            }
        }

        setIsSwiping(false)
    }, [isSwiping, onSwipeOpen, onSwipeClose])

    useEffect(() => {
        document.addEventListener("touchstart", handleTouchStart)
        document.addEventListener("touchend", handleTouchEnd)

        return () => {
            document.removeEventListener("touchstart", handleTouchStart)
            document.removeEventListener("touchend", handleTouchEnd)
        }
    }, [handleTouchStart, handleTouchEnd])

    return {
        handleTouchStart,
        handleTouchEnd
    }
}

export default useSwipe