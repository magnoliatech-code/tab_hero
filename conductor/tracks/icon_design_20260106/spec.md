# Specification: Extension Icon Design

## Overview
Design and implement a set of modern, sleek icons for the "Tab Hero" Chrome extension. The design will follow official Chrome Extension guidelines while maintaining a consistent visual identity with the existing application theme.

## Visual Identity
- **Primary Color:** Vivid Orange (HSL 12, 76%, 61%), matching the `chart-1` theme variable.
- **Visual Metaphor:** An abstract combination of a browser tab and a stack of tabs, incorporating the letter "T" (for Tab Hero) to create a distinct brand identity and avoid resemblance to other document icons.
- **Aesthetic:** Modern, minimalist, and sleek with plenty of negative space.

## Functional Requirements
- **Standard Sizes:** Generate icons in 16x16, 32x32, 48x48, and 128x128 pixels.
- **Format:** Export as transparent PNG files.
- **Scaling Strategy:** 
    - 128px, 48px, 32px: Full detailed design (Tab stack + "T" monogram).
    - 16px (Toolbar): Simplified version retaining the "T" or a strong distinctive element.

## Non-Functional Requirements
- **Visibility:** High contrast against both light and dark browser toolbars.
- **Manifest Integration:** Update `src/manifest.json` to reference the new icons.

## Acceptance Criteria
- [ ] Icons are generated in all four required sizes.
- [ ] Icons are placed in the `public/` directory (or appropriate assets folder).
- [ ] The 16px icon remains legible and distinct in the Chrome toolbar.
- [ ] `manifest.json` correctly points to the new assets.
- [ ] Icons appear correctly in the browser extension management page.

## Out of Scope
- Promotional tiles or screenshots for the Chrome Web Store (to be handled in a later track).
- Animated icons.
