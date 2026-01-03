# Track Plan: Project Initialization and Core Tab Management MVP

## Phase 1: Project Scaffolding
- [x] Task: Initialize Vite project with React, TypeScript, and Vitest 40549d7
- [x] Task: Configure Tailwind CSS, Shadcn/UI, and Lucide icons e114065
- [~] Task: Setup CRXJS and define initial `manifest.json`
- [ ] Task: Conductor - User Manual Verification 'Project Scaffolding' (Protocol in workflow.md)

## Phase 2: Tab History Service (Background)
- [ ] Task: Write Tests: History stack management logic (push, pop, limit size)
- [ ] Task: Implement Feature: History stack service module
- [ ] Task: Write Tests: Chrome storage integration for persistence
- [ ] Task: Implement Feature: Background script to sync stack with `chrome.tabs` events
- [ ] Task: Conductor - User Manual Verification 'Tab History Service' (Protocol in workflow.md)

## Phase 3: Tab Management UI (Popup)
- [ ] Task: Write Tests: Tab search and duplicate detection utility functions
- [ ] Task: Implement Feature: Search and duplicate detection logic
- [ ] Task: Write Tests: Tab list component rendering and interaction
- [ ] Task: Implement Feature: Popup UI with Tab list, Search bar, and Duplicate removal button
- [ ] Task: Conductor - User Manual Verification 'Tab Management UI' (Protocol in workflow.md)
