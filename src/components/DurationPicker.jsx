import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const PRESETS = [
  { label: '25m', minutes: 25 },
  { label: '45m', minutes: 45 },
  { label: '1h', minutes: 60 },
  { label: '1.5h', minutes: 90 },
  { label: '2h', minutes: 120 },
]

const HOURS = [0, 1, 2, 3, 4]
const MINUTES = Array.from({ length: 60 }, (_, i) => i)

export function DurationPicker({ onDurationChange, selectedDuration }) {
  const [hours, setHours] = useState(1)
  const [minutes, setMinutes] = useState(30)
  const [activePreset, setActivePreset] = useState(null)

  // Convert selectedDuration to hours/minutes on mount
  useEffect(() => {
    if (selectedDuration > 0) {
      const h = Math.floor(selectedDuration / 3600)
      const m = Math.floor((selectedDuration % 3600) / 60)
      setHours(h)
      setMinutes(m)
    }
  }, [])

  // Update parent when custom selection changes
  useEffect(() => {
    const totalSeconds = hours * 3600 + minutes * 60
    if (totalSeconds > 0 && activePreset === null) {
      onDurationChange(totalSeconds)
    }
  }, [hours, minutes, activePreset, onDurationChange])

  const handlePresetClick = (preset) => {
    setActivePreset(preset.minutes)
    const totalSeconds = preset.minutes * 60
    onDurationChange(totalSeconds)

    // Update the selects to match
    const h = Math.floor(preset.minutes / 60)
    const m = preset.minutes % 60
    setHours(h)
    setMinutes(m)
  }

  const handleHourChange = (value) => {
    setHours(parseInt(value, 10))
    setActivePreset(null)
  }

  const handleMinuteChange = (value) => {
    setMinutes(parseInt(value, 10))
    setActivePreset(null)
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      {/* Preset buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {PRESETS.map((preset) => (
          <Button
            key={preset.label}
            variant={activePreset === preset.minutes ? 'accent' : 'secondary'}
            size="sm"
            onClick={() => handlePresetClick(preset)}
            className={cn(
              'min-w-[60px] transition-all',
              activePreset === preset.minutes && 'ring-2 ring-accent ring-offset-2 ring-offset-background'
            )}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {/* Custom duration selectors */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Hours</span>
          <Select value={hours.toString()} onValueChange={handleHourChange}>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Hr" />
            </SelectTrigger>
            <SelectContent>
              {HOURS.map((h) => (
                <SelectItem key={h} value={h.toString()}>
                  {h.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <span className="text-2xl text-muted-foreground mt-5">:</span>

        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Minutes</span>
          <Select value={minutes.toString()} onValueChange={handleMinuteChange}>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Min" />
            </SelectTrigger>
            <SelectContent>
              {MINUTES.map((m) => (
                <SelectItem key={m} value={m.toString()}>
                  {m.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
