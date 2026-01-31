import { Button } from '@/components/ui/button'
import { TIMER_STATUS } from '@/hooks/useTimer'
import { Play, Pause, Square, RotateCcw } from 'lucide-react'

export function SessionControls({
  status,
  onStart,
  onPause,
  onResume,
  onEnd,
  disabled,
}) {
  if (status === TIMER_STATUS.IDLE) {
    return (
      <Button
        variant="accent"
        size="xl"
        onClick={onStart}
        disabled={disabled}
        className="min-w-[200px] gap-2"
      >
        <Play className="w-5 h-5" />
        Start Session
      </Button>
    )
  }

  if (status === TIMER_STATUS.COMPLETED) {
    return (
      <Button
        variant="accent"
        size="xl"
        onClick={onEnd}
        className="min-w-[200px] gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        New Session
      </Button>
    )
  }

  // Running or Paused state
  return (
    <div className="flex items-center gap-3">
      {status === TIMER_STATUS.RUNNING ? (
        <Button
          variant="warning"
          size="lg"
          onClick={onPause}
          className="min-w-[120px] gap-2"
        >
          <Pause className="w-5 h-5" />
          Pause
        </Button>
      ) : (
        <Button
          variant="accent"
          size="lg"
          onClick={onResume}
          className="min-w-[120px] gap-2"
        >
          <Play className="w-5 h-5" />
          Resume
        </Button>
      )}

      <Button
        variant="destructive"
        size="lg"
        onClick={onEnd}
        className="min-w-[100px] gap-2"
      >
        <Square className="w-4 h-4" />
        End
      </Button>
    </div>
  )
}
