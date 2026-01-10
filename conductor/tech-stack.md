# Tech Stack - Tab Hero

## Core Technologies
- **Language:** TypeScript
- **Frontend Framework:** React (using Vite)
- **Bundler:** Vite with `@crxjs/vite-plugin` for Chrome Extension development.

## Styling & UI Components
- **CSS Framework:** Tailwind CSS
- **Component Library:** Shadcn/UI (Radix UI primitives)
- **Icons:** Lucide React

## State Management & Storage
- **Global State:** Zustand (for managing the tab history stack and UI state)
- **Persistence:** `chrome.storage.local` (for saving history stack across sessions)

## Quality Assurance
- **Linting:** ESLint
- **Formatting:** Prettier
- **Testing:** Vitest (unit/component testing, including manifest and asset verification)

## Build & Tooling
- **Image Processing:** `sharp` (used for SVG to PNG conversion of extension assets)
