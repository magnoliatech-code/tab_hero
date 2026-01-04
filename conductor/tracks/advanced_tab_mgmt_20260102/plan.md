# Track Plan: Advanced Tab Management and Shortcuts

## Phase 1: Commands and Global Shortcuts [checkpoint: 5ca6576]
- [x] Task: Update `manifest.json` with `commands` for activation and history navigation a42e466
- [x] Task: Write Tests: Commands listener in background script f949ce5
- [x] Task: Implement Feature: Handle `onCommand` events in background script d2a3f59
- [x] Task: Conductor - User Manual Verification 'Commands and Global Shortcuts' (Protocol in workflow.md) 5ca6576

## Phase 2: Enhanced History Navigation (Back/Forward)
- [ ] Task: Write Tests: History service traversal (undo/redo style)
- [ ] Task: Implement Feature: Update HistoryStack and Storage to support forward navigation
- [ ] Task: Write Tests: Background message handlers for history traversal
- [ ] Task: Implement Feature: Refine background logic to use the new history traversal
- [ ] Task: Conductor - User Manual Verification 'Enhanced History Navigation' (Protocol in workflow.md)

## Phase 3: Real-time Dashboard Synchronization
- [ ] Task: Write Tests: Custom hook for real-time chrome tab events
- [ ] Task: Implement Feature: `useTabs` hook in dashboard to listen for tab changes
- [ ] Task: Conductor - User Manual Verification 'Real-time Dashboard Synchronization' (Protocol in workflow.md)

## Phase 4: Window-Based Organization and Dashboard UI
- [ ] Task: Write Tests: Tab grouping by windowId and sorting
- [ ] Task: Implement Feature: Grouping logic and updated Dashboard layout
- [ ] Task: Implement Feature: Add Shortcuts instruction section to dashboard
- [ ] Task: Implement Feature: Remove the "Back" button from dashboard
- [ ] Task: Conductor - User Manual Verification 'Window-Based Organization and Dashboard UI' (Protocol in workflow.md)
