import { useState, useEffect, useCallback, useRef } from 'react'

export const TIMER_STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETED: 'completed',
}

export function useTimer(onComplete) {
  const [status, setStatus] = useState(TIMER_STATUS.IDLE)
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [initialSeconds, setInitialSeconds] = useState(0)
  const intervalRef = useRef(null)
  const onCompleteRef = useRef(onComplete)

  // Keep the callback ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Timer tick effect
  useEffect(() => {
    if (status === TIMER_STATUS.RUNNING) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
            setStatus(TIMER_STATUS.COMPLETED)
            onCompleteRef.current?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [status])

  const start = useCallback((durationInSeconds) => {
    setInitialSeconds(durationInSeconds)
    setRemainingSeconds(durationInSeconds)
    setStatus(TIMER_STATUS.RUNNING)
  }, [])

  const pause = useCallback(() => {
    if (status === TIMER_STATUS.RUNNING) {
      setStatus(TIMER_STATUS.PAUSED)
    }
  }, [status])

  const resume = useCallback(() => {
    if (status === TIMER_STATUS.PAUSED) {
      setStatus(TIMER_STATUS.RUNNING)
    }
  }, [status])

  const end = useCallback(() => {
    setStatus(TIMER_STATUS.IDLE)
    setRemainingSeconds(0)
    setInitialSeconds(0)
  }, [])

  const reset = useCallback(() => {
    setStatus(TIMER_STATUS.IDLE)
    setRemainingSeconds(0)
    setInitialSeconds(0)
  }, [])

  // Format time as HH:MM:SS
  const formatTime = useCallback((seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  // Calculate progress percentage
  const progress = initialSeconds > 0
    ? ((initialSeconds - remainingSeconds) / initialSeconds) * 100
    : 0

  return {
    status,
    remainingSeconds,
    initialSeconds,
    formattedTime: formatTime(remainingSeconds),
    progress,
    start,
    pause,
    resume,
    end,
    reset,
  }
}
