import { useState, useRef, useEffect } from "react";

const useSwipe = (onSwipeOpen, onSwipeClose) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const swipeThreshold = 100;
    if (isSwiping) {
      if (touchEndX.current - touchStartX.current > swipeThreshold)
        onSwipeOpen();
      if (touchStartX.current - touchEndX.current > swipeThreshold)
        onSwipeClose();
    }
    setIsSwiping(false);
  };

  //to attach touch event globally
  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);
  return {
    handleTouchStart,
    handleTouchEnd,
  };
};

export default useSwipe;
