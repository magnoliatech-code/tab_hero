# Plan - Advanced Tab and Window Management

## Phase 1: Tab Closing Functionality
- [x] Task: Create unit tests for tab closing logic (Verify `chrome.tabs.remove` is called)
- [x] Task: Implement tab closing logic in `src/lib/tabs.ts`
- [x] Task: Add "Close" button to `TabItem` component (or equivalent in `TabList.tsx`)
- [x] Task: Connect UI button to tab closing logic
- [x] Task: Conductor - User Manual Verification 'Phase 1: Tab Closing Functionality' (Protocol in workflow.md)

## Phase 2: Tab Sorting Functionality
- [x] Task: Create unit tests for sorting logic (Verify `chrome.tabs.move` is called for reordering)
- [x] Task: Implement `sortTabsByTitle` and `sortTabsByUrl` in `src/lib/tabs.ts`
- [x] Task: Create `SortDropdown` component using Shadcn/UI
- [x] Task: Integrate `SortDropdown` into the window header in the dashboard
- [x] Task: Conductor - User Manual Verification 'Phase 2: Tab Sorting Functionality' (Protocol in workflow.md)

## Phase 3: Window Merging Functionality
- [x] Task: Create unit tests for window merging (Verify moving tabs between windows)
- [x] Task: Implement `mergeAllWindows` logic (excluding apps) in `src/lib/tabs.ts`
- [x] Task: Implement `mergeSelectedWindows` logic in `src/lib/tabs.ts`
- [x] Task: Add "Merge All" button to global dashboard actions
- [x] Task: Implement selection mode/UI for selective merging
- [x] Task: Conductor - User Manual Verification 'Phase 3: Window Merging Functionality' (Protocol in workflow.md)