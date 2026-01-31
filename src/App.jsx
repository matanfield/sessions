import { useState, useEffect, useCallback } from 'react'
import { useTimer, TIMER_STATUS } from '@/hooks/useTimer'
import { TimerDisplay } from '@/components/TimerDisplay'
import { DurationPicker } from '@/components/DurationPicker'
import { SessionControls } from '@/components/SessionControls'
import {
  requestNotificationPermission,
  sendNotification,
  getNotificationPermissionStatus,
} from '@/utils/notifications'
import { Bell, BellOff } from 'lucide-react'

function App() {
  const [selectedDuration, setSelectedDuration] = useState(90 * 60) // Default 1.5 hours
  const [notificationStatus, setNotificationStatus] = useState('default')

  // Handle timer completion
  const handleComplete = useCallback(() => {
    sendNotification('Session Complete! 🎉', {
      body: 'Great work! Your focus session has ended.',
    })
  }, [])

  const timer = useTimer(handleComplete)

  // Check notification permission on mount
  useEffect(() => {
    setNotificationStatus(getNotificationPermissionStatus())
  }, [])

  // Request notification permission when starting first session
  const handleStart = async () => {
    if (notificationStatus === 'default') {
      const granted = await requestNotificationPermission()
      setNotificationStatus(granted ? 'granted' : 'denied')
    }
    timer.start(selectedDuration)
  }

  const handleDurationChange = useCallback((seconds) => {
    setSelectedDuration(seconds)
  }, [])

  // Format the initial duration for display when idle
  const formatIdleTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:00`
  }

  const displayTime = timer.status === TIMER_STATUS.IDLE
    ? formatIdleTime(selectedDuration)
    : timer.formattedTime

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-light tracking-[0.3em] text-foreground/90 uppercase">
          Sessions
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Focus. Flow. Finish.
        </p>
      </header>

      {/* Timer Display */}
      <div className="mb-10">
        <TimerDisplay
          formattedTime={displayTime}
          status={timer.status}
          progress={timer.progress}
        />
      </div>

      {/* Duration Picker (only in idle state) */}
      {timer.status === TIMER_STATUS.IDLE && (
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <DurationPicker
            onDurationChange={handleDurationChange}
            selectedDuration={selectedDuration}
          />
        </div>
      )}

      {/* Controls */}
      <div className="mb-8">
        <SessionControls
          status={timer.status}
          onStart={handleStart}
          onPause={timer.pause}
          onResume={timer.resume}
          onEnd={timer.end}
          disabled={selectedDuration === 0}
        />
      </div>

      {/* Notification status indicator */}
      <div className="fixed bottom-4 right-4 flex items-center gap-2 text-xs text-muted-foreground">
        {notificationStatus === 'granted' ? (
          <>
            <Bell className="w-3 h-3" />
            <span>Notifications on</span>
          </>
        ) : notificationStatus === 'denied' ? (
          <>
            <BellOff className="w-3 h-3" />
            <span>Notifications blocked</span>
          </>
        ) : (
          <>
            <Bell className="w-3 h-3 opacity-50" />
            <span>Click start to enable notifications</span>
          </>
        )}
      </div>
    </main>
  )
}

export default App
