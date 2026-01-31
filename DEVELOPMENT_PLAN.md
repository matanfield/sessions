# Sessions - Development Plan

## Phase 1 Build Steps

### Step 1: Project Setup (5 min)
```bash
# Create Vite React project
npm create vite@latest sessions-app -- --template react
cd sessions-app
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install shadcn/ui dependencies
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
npm install @radix-ui/react-slot
npm install @radix-ui/react-select
```

### Step 2: Configure Tailwind + shadcn (10 min)
1. Configure `tailwind.config.js` with shadcn theme
2. Set up `src/index.css` with Tailwind directives and CSS variables
3. Create `src/lib/utils.js` with cn() helper
4. Create `components.json` for shadcn CLI compatibility

### Step 3: Create shadcn UI Components (15 min)
Create minimal set of shadcn components needed:
- `Button` - for controls and presets
- `Select` - for hour/minute scrollers
- `Card` - for timer container (optional)

### Step 4: Build Custom Components (30 min)

#### 4.1 TimerDisplay.jsx
- Large countdown display (HH:MM:SS)
- Color-coded by state (running/paused/completed)
- Pulse animation when completed

#### 4.2 DurationPicker.jsx
- Preset buttons row (25m, 45m, 1h, 1.5h, 2h)
- Hour select (0-4)
- Minute select (0, 5, 10, 15... 55)
- Only visible in IDLE state

#### 4.3 SessionControls.jsx
- Start button (IDLE state)
- Pause/Resume + End buttons (RUNNING/PAUSED states)
- "New Session" button (COMPLETED state)

### Step 5: Build Timer Hook (20 min)

#### useTimer.js
```javascript
// State
- status: 'idle' | 'running' | 'paused' | 'completed'
- remainingSeconds: number
- initialSeconds: number

// Actions
- start(durationInSeconds)
- pause()
- resume()
- end()
- reset()

// Effects
- Interval management (1 second tick)
- Completion detection
- Cleanup on unmount
```

### Step 6: Notifications Utility (10 min)

#### notifications.js
```javascript
- requestPermission(): Promise<boolean>
- sendNotification(title, body): void
- isSupported(): boolean
```

### Step 7: Main App Assembly (15 min)

#### App.jsx
```jsx
function App() {
  const timer = useTimer()

  // Request notification permission on mount
  // Trigger notification on completion

  return (
    <main>
      <h1>Sessions</h1>
      <TimerDisplay ... />
      {timer.status === 'idle' && <DurationPicker ... />}
      <SessionControls ... />
    </main>
  )
}
```

### Step 8: Styling & Polish (20 min)
- Dark theme implementation
- Transitions and animations
- Responsive layout
- Focus states and accessibility

### Step 9: Testing (15 min)
- Manual test all state transitions
- Test notification permission flow
- Test edge cases (rapid clicks, tab switching)
- Mobile viewport check

---

## File Creation Order

1. `package.json` - dependencies
2. `vite.config.js` - Vite config
3. `tailwind.config.js` - Tailwind + shadcn theme
4. `postcss.config.js` - PostCSS config
5. `components.json` - shadcn config
6. `index.html` - entry HTML
7. `src/index.css` - global styles
8. `src/lib/utils.js` - cn() utility
9. `src/components/ui/button.jsx` - shadcn Button
10. `src/components/ui/select.jsx` - shadcn Select
11. `src/utils/notifications.js` - notification helper
12. `src/hooks/useTimer.js` - timer logic
13. `src/components/TimerDisplay.jsx` - timer display
14. `src/components/DurationPicker.jsx` - duration picker
15. `src/components/SessionControls.jsx` - control buttons
16. `src/App.jsx` - main app
17. `src/main.jsx` - React entry

---

## Commands to Run

```bash
# Development
cd sessions-app
npm install
npm run dev

# Build for production
npm run build
npm run preview
```

---

## Time Estimate
Total: ~2 hours for complete Phase 1 implementation
