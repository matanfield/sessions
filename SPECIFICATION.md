# Sessions - Product Specification

## Overview
Sessions is a minimalistic, beautiful web app for tracking focus sessions with a countdown timer.

## Phase 1 Scope (Current)

### Core Features

#### 1. Session Timer Setup
- **Duration Selection**: Preset buttons for common durations
  - Quick presets: 25m, 45m, 1h, 1.5h, 2h
  - Custom picker: Hour scroller (0-4) + Minute scroller (0-59)
- **Display Format**: HH:MM:SS countdown

#### 2. Session Controls
- **Start**: Begin a new session with selected duration
- **Pause**: Pause the running timer (preserves remaining time)
- **Resume**: Continue from paused state
- **End**: Stop the session entirely (resets to setup)

#### 3. Timer States
```
IDLE → RUNNING → PAUSED → RUNNING → COMPLETED
                    ↓
                   END (manual) → IDLE
```

| State | Description | Available Actions |
|-------|-------------|-------------------|
| IDLE | No active session, showing setup | Start |
| RUNNING | Timer counting down | Pause, End |
| PAUSED | Timer stopped temporarily | Resume, End |
| COMPLETED | Timer reached 00:00:00 | Start New |

#### 4. End Notifications
- **Visual**: Timer display changes color/style when complete
- **Browser Notification**: Push notification when timer ends (requires permission)

### UI/UX Design

#### Layout (Single Page)
```
┌─────────────────────────────────┐
│                                 │
│         S E S S I O N S         │
│                                 │
│      ┌─────────────────┐        │
│      │    01:30:00     │        │
│      └─────────────────┘        │
│                                 │
│   [25m] [45m] [1h] [1.5h] [2h]  │
│                                 │
│      [  HR ▼ ] : [  MIN ▼ ]     │
│                                 │
│          [ START ]              │
│                                 │
└─────────────────────────────────┘
```

#### Color Palette (Dark Theme)
- Background: Deep charcoal (#0a0a0a)
- Surface: Soft dark (#1a1a1a)
- Primary: Warm white (#fafafa)
- Accent: Soft green (#22c55e) for active states
- Warning: Soft amber (#f59e0b) for paused
- Alert: Soft red (#ef4444) for completed

#### Typography
- Timer: Mono font, large (4-6rem)
- Labels: Sans-serif, subtle weight

### Technical Architecture

#### Stack
- **Framework**: React 18 + Vite
- **UI Library**: shadcn/ui + Tailwind CSS
- **State**: React useState/useEffect (no external state management)
- **Notifications**: Web Notifications API

#### File Structure
```
sessions-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── components.json
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── lib/
│   │   └── utils.js
│   ├── hooks/
│   │   └── useTimer.js
│   ├── components/
│   │   ├── ui/          (shadcn components)
│   │   ├── TimerDisplay.jsx
│   │   ├── DurationPicker.jsx
│   │   └── SessionControls.jsx
│   └── utils/
│       └── notifications.js
```

### Non-Goals (Phase 1)
- User authentication
- Database persistence
- Session history/logging
- Sound notifications
- Count-up mode
- Manual duration input

---

## Phase 2 Preview (Future)

### Planned Features
- User authentication
- Session logging to database
- Configurable notifications (sound choices, browser toggle)
- Timer mode toggle (countdown/count-up)
- Manual duration input
- Session history view

### Data Model (Future)
```json
{
  "sessionId": "uuid",
  "userId": "uuid",
  "startedAt": "ISO8601",
  "endedAt": "ISO8601",
  "plannedDuration": 5400,
  "intervals": [
    { "type": "active", "start": "ISO8601", "end": "ISO8601" },
    { "type": "pause", "start": "ISO8601", "end": "ISO8601" },
    { "type": "active", "start": "ISO8601", "end": "ISO8601" }
  ]
}
```
