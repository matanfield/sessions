import { cn } from '@/lib/utils'
import { TIMER_STATUS } from '@/hooks/useTimer'

export function TimerDisplay({ formattedTime, status, progress }) {
  const getStatusStyles = () => {
    switch (status) {
      case TIMER_STATUS.RUNNING:
        return 'text-green-400 timer-running'
      case TIMER_STATUS.PAUSED:
        return 'text-amber-400 timer-paused'
      case TIMER_STATUS.COMPLETED:
        return 'text-red-400 timer-completed animate-pulse-slow'
      default:
        return 'text-foreground/80'
    }
  }

  const getStatusLabel = () => {
    switch (status) {
      case TIMER_STATUS.RUNNING:
        return 'Focus'
      case TIMER_STATUS.PAUSED:
        return 'Paused'
      case TIMER_STATUS.COMPLETED:
        return 'Complete!'
      default:
        return 'Ready'
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Status indicator */}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'w-2 h-2 rounded-full transition-colors',
            status === TIMER_STATUS.RUNNING && 'bg-green-400 animate-pulse',
            status === TIMER_STATUS.PAUSED && 'bg-amber-400',
            status === TIMER_STATUS.COMPLETED && 'bg-red-400 animate-pulse',
            status === TIMER_STATUS.IDLE && 'bg-muted-foreground/50'
          )}
        />
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          {getStatusLabel()}
        </span>
      </div>

      {/* Timer display */}
      <div
        className={cn(
          'font-mono text-6xl sm:text-7xl md:text-8xl font-light tracking-tight transition-colors duration-300',
          getStatusStyles()
        )}
      >
        {formattedTime}
      </div>

      {/* Progress bar (only show when running or paused) */}
      {(status === TIMER_STATUS.RUNNING || status === TIMER_STATUS.PAUSED) && (
        <div className="w-full max-w-xs h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full transition-all duration-1000 ease-linear rounded-full',
              status === TIMER_STATUS.RUNNING ? 'bg-green-400' : 'bg-amber-400'
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}
