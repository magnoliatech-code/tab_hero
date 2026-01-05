# Specification - Advanced Tab and Window Management

## Overview
This track introduces advanced management capabilities to the Tab Hero dashboard, allowing users to manipulate tabs and windows directly from the UI. Key features include individual tab closing, alphabetical sorting of tabs within windows, and flexible window merging.

## Functional Requirements

### 1. Tab Closing
- Add a "Close" (X) button to the right side of each tab item in the dashboard.
- Clicking the button must immediately close the corresponding tab in the browser.
- The UI must update immediately to reflect the tab's removal.

### 2. Tab Sorting
- Implement a "Sort" dropdown menu for each window group in the dashboard.
- **Options:**
  - **Sort by Title:** Reorder tabs alphabetically by their title.
  - **Sort by URL:** Reorder tabs alphabetically by their URL.
- Sorting must physically reorder the tabs in the actual browser window.

### 3. Window Merging
- **Merge All:** A global action to merge all non-app browser windows into the current (active) window.
- **Selective Merge:** 
  - Provide a way to select specific windows (e.g., via checkboxes or a selection mode).
  - A "Merge Selected" action to combine only the chosen windows into a target window.
- Merging should ignore "app" windows (as per browser constraints/user preference).

## Non-Functional Requirements
- **Immediate Feedback:** UI should react instantly to close/sort/merge actions.
- **Consistency:** Use existing Shadcn/UI components (Buttons, Dropdowns) to maintain design language.

## Acceptance Criteria
- [ ] Tabs can be closed with a single click from the dashboard.
- [ ] Selecting "Sort by Title" reorders tabs in the browser and the dashboard.
- [ ] Selecting "Sort by URL" reorders tabs in the browser and the dashboard.
- [ ] "Merge All" combines all eligible windows into one.
- [ ] "Merge Selected" correctly merges only the specified windows.

## Out of Scope
- Confirmation dialogs for closing tabs.
- "Undo" functionality for closed tabs.
- Drag-and-drop reordering.