---
name: Warm Tech Material
colors:
  surface: '#fff8f6'
  surface-dim: '#e4d7d4'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fef1ed'
  surface-container: '#f8ebe7'
  surface-container-high: '#f2e5e2'
  surface-container-highest: '#ece0dc'
  on-surface: '#201a18'
  on-surface-variant: '#564339'
  inverse-surface: '#362f2d'
  inverse-on-surface: '#fbeeea'
  outline: '#897267'
  outline-variant: '#ddc1b4'
  surface-tint: '#9d4300'
  primary: '#783100'
  on-primary: '#ffffff'
  primary-container: '#9d4300'
  on-primary-container: '#ffceb6'
  inverse-primary: '#ffb690'
  secondary: '#765a00'
  on-secondary: '#ffffff'
  secondary-container: '#fdd677'
  on-secondary-container: '#775b01'
  tertiary: '#633b48'
  on-tertiary: '#ffffff'
  tertiary-container: '#7d5260'
  on-tertiary-container: '#ffcbda'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#ffb690'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#783200'
  secondary-fixed: '#ffdf96'
  secondary-fixed-dim: '#e8c266'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5a4400'
  tertiary-fixed: '#ffd9e3'
  tertiary-fixed-dim: '#eeb8c8'
  on-tertiary-fixed: '#31111d'
  on-tertiary-fixed-variant: '#633b48'
  background: '#fff8f6'
  on-background: '#201a18'
  surface-variant: '#ece0dc'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 57px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.25px
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0.15px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
  code-body:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  code-table:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 1px
  sidebar_width: 260px
---

## Brand & Style

This design system is built upon a **Corporate Modern** aesthetic, specifically leveraging the Material 3 (M3) architectural framework. The personality is a fusion of technical precision and organic warmth, moving away from the cold, sterile blues typical of developer tools in favor of a sophisticated terracotta palette.

The target audience consists of developers, educators, and students who require a focused environment for multi-file orchestration. The UI evokes a sense of **grounded reliability** and **focused calm**. It utilizes M3's "Surface-Container" logic to create a clear information hierarchy without relying on traditional drop shadows, instead using tonal elevation and subtle container differentiation to organize complex multi-pane layouts.

## Colors

The color system is strictly partitioned into functional "surfaces." 
- **Surfaces:** Use the varying container levels (Low to Highest) to denote depth. The sidebars and file explorers should utilize `surface-container-low`, while the main editor uses `surface`.
- **Accents:** Terracotta (`primary`) is used for primary actions, active tab indicators, and cursor focus. 
- **Constraints:** Avoid all cool tones. Success states in the terminal may use a muted olive-green (derived from the secondary palette) but should otherwise stay within the warm earth-tone spectrum.

## Typography

This design system uses a dual-font strategy:
- **UI & Navigation:** `Inter` provides high legibility for all interface elements, labels, and system messages. It uses standard M3 weight distribution (Medium for labels, Regular for body).
- **Technical Content:** `JetBrains Mono` is reserved for the code editor, terminal output, and file names in the tree view. Its increased x-height and clear character distinction are vital for error-free coding.
- **Mobile scaling:** On screens smaller than 600px, `display` levels should be reduced to `headline-lg` sizes.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a specific focus on **pane-based orchestration**. 
- **Structure:** A horizontal layout with a fixed-width sidebar (260px) for file navigation, and a flexible central area for the code editor.
- **Grids:** The UI uses a 1px "outline-variant" gutter to separate panes instead of thick borders or wide gaps, maximizing screen real estate for code.
- **Responsive Behavior:** 
  - **Desktop:** Multi-pane view (File tree + Editor + Terminal).
  - **Tablet:** Collapsible sidebar via a hamburger/menu toggle. 
  - **Mobile:** Single-pane focus. Terminal and File Tree move to bottom-sheet or full-screen overlays.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** rather than heavy shadows, following Material 3 principles.
- **Level 0 (Background):** Used for the primary app shell.
- **Level 1 (Surface Container):** Used for the main editor canvas.
- **Level 2 (Surface Container High):** Used for floating panels or active sidebar items.
- **Glassmorphism (Subtle):** Only used for the "Terminal" header or top navigation bar during scroll, using a 12px backdrop blur and 80% opacity of the `surface` color.
- **States:** Hover states are indicated by a 0.08 opacity overlay of the `on-surface` color. Pressed states use a 0.12 opacity overlay and a slight scale down (0.97).

## Shapes

The shape language is strictly categorized by component size:
- **Small (8px):** Buttons, text fields, chips, and checkboxes. This provides a modern but structured feel.
- **Medium (12px):** File explorer cards, code snippet previews, and popovers.
- **Large (24px):** Modals, dialogs, and main execution "Run" buttons.
- **Tabs:** Use "top-rounded" only (8px) to anchor them to the editor pane.

## Components

- **Buttons:** 
  - *Primary:* Filled with `primary` color, 8px radius, `on-primary` text.
  - *Secondary:* Outlined with `outline` color, 8px radius.
- **Tabs:** Active tabs use a 3px `primary` underline and `surface-container-highest` background. Inactive tabs use `surface-container`.
- **File Tree:** Monospaced font for file names. Selected files use `primary-container` with `on-primary-container` text.
- **Input Fields:** Outlined style (M3). On focus, the border thickens to 2px using the `primary` color.
- **Terminal:** `surface-container-highest` background. Success text uses olive (Secondary 50), Error text uses `error` red.
- **Press Interaction:** All clickable elements must scale to 0.97 on active state with a 150ms transition.