# Track Plan: Advanced Tab Management and Shortcuts

## Phase 1: Commands and Global Shortcuts [checkpoint: 5ca6576]
- [x] Task: Update `manifest.json` with `commands` for activation and history navigation a42e466
- [x] Task: Write Tests: Commands listener in background script f949ce5
- [x] Task: Implement Feature: Handle `onCommand` events in background script d2a3f59
- [x] Task: Conductor - User Manual Verification 'Commands and Global Shortcuts' (Protocol in workflow.md) 5ca6576

## Phase 2: Enhanced History Navigation (Back/Forward) [checkpoint: e325dce]
- [x] Task: Write Tests: History service traversal (undo/redo style) ab7c9b7
- [x] Task: Implement Feature: Update HistoryStack and Storage to support forward navigation f228d54
- [x] Task: Write Tests: Background message handlers for history traversal 8fc4d6d
- [x] Task: Implement Feature: Refine background logic to use the new history traversal ee6f3aa
- [x] Task: Conductor - User Manual Verification 'Enhanced History Navigation' (Protocol in workflow.md) e325dce

## Phase 3: Real-time Dashboard Synchronization [checkpoint: de01557]
- [x] Task: Write Tests: Custom hook for real-time chrome tab events 643eec3
- [x] Task: Implement Feature: `useTabs` hook in dashboard to listen for tab changes a9a2a74
- [x] Task: Conductor - User Manual Verification 'Real-time Dashboard Synchronization' (Protocol in workflow.md) de01557

## Phase 4: Window-Based Organization and Dashboard UI
- [x] Task: Write Tests: Tab grouping by windowId and sorting 1b89fe6
- [x] Task: Implement Feature: Grouping logic and updated Dashboard layout eb64294
- [x] Task: Implement Feature: Add Shortcuts instruction section to dashboard eb64294
- [x] Task: Implement Feature: Remove the "Back" button from dashboard eb64294
- [~] Task: Conductor - User Manual Verification 'Window-Based Organization and Dashboard UI' (Protocol in workflow.md)
