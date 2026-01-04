# Track Spec: Advanced Tab Management and Shortcuts

## Overview
This track enhances the Tab Hero extension by implementing global keyboard shortcuts, real-time tab synchronization in the dashboard, improved window-based organization, and keyboard-driven history navigation.

## Goals
- **Global Shortcuts:** Enable users to configure global hotkeys to open the dashboard and navigate tab history.
- **Real-time Sync:** Ensure the dashboard reflects tab changes (creation, deletion, updates) instantly without manual refresh.
- **Keyboard-Only History:** Replace the "Back" button with keyboard shortcuts for jumping back and forward in the tab history stack.
- **Window Organization:** Group tabs by their respective windows in the dashboard list.
- **User Guidance:** Provide instructions in the dashboard on how to configure these keys.

## Functional Requirements
### 1. Keyboard Shortcuts (Configuration)
- Provide a clear instruction section or link in the dashboard directing users to `chrome://extensions/shortcuts` to configure the "Activate Extension" command.
- Define commands in `manifest.json` for:
    - `_execute_action`: Open Dashboard.
    - `jump_back`: Switch to the previously visited tab.
    - `jump_forward`: Switch to the next tab in history (if applicable).
- **Note:** Global shortcuts are managed by Chrome. The extension just defines the commands.

### 2. Real-Time Dashboard Updates
- The dashboard (`App.tsx`) must listen for chrome tab events (`onCreated`, `onUpdated`, `onRemoved`, `onMoved`, `onDetached`, `onAttached`) and update the `tabs` state immediately.
- Remove any manual "Refresh" mechanisms if they exist.

### 3. Keyboard-Only History Navigation
- Remove the visual "Back to Previous Tab" button from the dashboard.
- Implement the `jump_back` and `jump_forward` commands in the background script.
- **Logic:**
    - "Jump Back": Switch to the previous tab in the history stack.
    - "Jump Forward": Switch to the next tab (if the user has navigated back). Requires changing the simple stack to a history pointer or dual-stack approach.

### 4. Window-Based Organization
- In the dashboard, group the flat list of tabs by `windowId`.
- Display a header for each window group (e.g., "Window 1", "Window 2" or "Current Window").
- Sort groups so the current window is at the top.

## User Interface Changes
- **Dashboard:**
    - Remove "Back" button.
    - Add a "Shortcuts" info box/link pointing to `chrome://extensions/shortcuts`.
    - Change TabList layout to render groups of tabs with headers.

## Technical Constraints
- Must use `chrome.commands` API for shortcuts.
- Real-time updates must be efficient.
