# ClarityAge - 40: Design System Documentation

**📚 Part of ClarityAge Documentation | See [README.md](../../README.md) for project overview**

---

## Overview

This document serves as the comprehensive design guide for ClarityAge - 40, defining the visual language, components, and user experience patterns that create a cohesive, thoughtful interface for philosophical reflection.

---

## Design Philosophy

### Core Principles

**Contemplative Minimalism**: Clean, uncluttered interfaces that encourage deep thought and reflection without distraction.

**Purposeful Elegance**: Every design element serves a clear purpose in facilitating meaningful self-reflection and philosophical exploration.

**Accessible Wisdom**: Complex philosophical concepts presented through intuitive, approachable design that welcomes users of all backgrounds.

**Emotional Resonance**: Visual elements that evoke contemplation, growth, and introspection while maintaining professional polish.

### Visual Personality

- **Thoughtful**: Spacious layouts with intentional white space
- **Sophisticated**: Modern typography and refined color choices
- **Warm**: Approachable despite the philosophical depth
- **Timeless**: Design that ages gracefully, much like philosophical wisdom

---

## Color Palette

### Primary Colors

```
Primary Blue: #1976D2 (Material-UI Primary)
- Used for: Primary actions, links, progress indicators
- Represents: Trust, depth, contemplation

Primary Dark: #115293
- Used for: Hover states, emphasis
- Represents: Stability, authority
```

### Secondary Colors

```
Secondary Purple: #7B1FA2 (Material-UI Secondary)
- Used for: Accent elements, highlights, quotes
- Represents: Wisdom, introspection, transformation

Secondary Dark: #4A148C
- Used for: Secondary actions, philosophical emphasis
- Represents: Deep thought, spirituality
```

### Accent Colors

```
Success Green: #2E7D32
- Used for: Completion states, positive feedback
- Represents: Growth, achievement, clarity

Warning Amber: #F57F17
- Used for: Important notices, attention-grabbing elements
- Represents: Enlightenment, insight, caution

Error Red: #C62828
- Used for: Error states, destructive actions
- Represents: Urgency, important warnings
```

### Neutral Colors

```
Background Light: #FAFAFA
Background Dark: #121212

Surface Light: #FFFFFF
Surface Dark: #1E1E1E

Text Primary Light: #212121
Text Primary Dark: #FFFFFF

Text Secondary Light: #666666
Text Secondary Dark: #AAAAAA

Divider Light: #E0E0E0
Divider Dark: #333333
```

---

## Typography

### Font Pairing

**Primary Font (Roboto)**: Already integrated via @fontsource/roboto

- **Usage**: All UI text, body content, interface elements
- **Rationale**: Excellent readability, Material-UI native, multilingual support

**Accent Font (Roboto Slab)**: For philosophical quotes and emphasis

- **Usage**: Philosophical quotes, question titles, important callouts
- **Rationale**: Serif qualities add gravitas to philosophical content

### Type Scale

```
H1 (Main Title): 3.5rem (56px) - Roboto Light
H2 (Section Headers): 2.5rem (40px) - Roboto Regular
H3 (Question Titles): 2rem (32px) - Roboto Medium
H4 (Subsections): 1.5rem (24px) - Roboto Medium
H5 (Card Headers): 1.25rem (20px) - Roboto Medium
H6 (Small Headers): 1rem (16px) - Roboto Medium

Body Large: 1.125rem (18px) - Roboto Regular
Body Regular: 1rem (16px) - Roboto Regular
Body Small: 0.875rem (14px) - Roboto Regular
Caption: 0.75rem (12px) - Roboto Regular

Quote: 1.25rem (20px) - Roboto Slab Regular (Italic)
```

---

## Layout & Grid

### Grid System

**12-Column Responsive Grid** (Material-UI Grid)

- **Desktop (lg)**: 1200px+ container, full 12 columns
- **Tablet (md)**: 900px-1199px container, 8-10 columns typical
- **Mobile (sm)**: 600px-899px container, 6-8 columns typical
- **Mobile (xs)**: <600px container, 4-6 columns typical

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│                    Header                           │
│  [Logo/Title]              [Theme][Lang][Contact]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│              Main Content Area                      │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │           Progress Indicator                │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │           Question Card                     │   │
│  │  ┌─────────────────────────────────────┐   │   │
│  │  │         Quote Section               │   │   │
│  │  └─────────────────────────────────────┘   │   │
│  │  ┌─────────────────────────────────────┐   │   │
│  │  │       Question Content              │   │   │
│  │  └─────────────────────────────────────┘   │   │
│  │  ┌─────────────────────────────────────┐   │   │
│  │  │       Answer Interface              │   │   │
│  │  └─────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│              Action Buttons                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Spacing System

```
xs: 8px    (0.5rem)
sm: 16px   (1rem)
md: 24px   (1.5rem)
lg: 32px   (2rem)
xl: 40px   (2.5rem)
xxl: 48px  (3rem)
```

---

## Key User Flows

### 1. Initial Application Load & Setup

```
1. User lands on welcome screen
   ↓
2. Language auto-detection occurs
   ↓
3. Theme preference applied (defaults to dark)
   ↓
4. User sees introduction with "Get Started" CTA
   ↓
5. User clicks "Get Started"
   ↓
6. First question loads with progress indicator
```

### 2. Question Answering Flow

```
1. User sees question card with:
   - Progress indicator at top
   - Philosophical quote with attribution
   - Question text
   - Answer options (radio buttons)
   ↓
2. User selects an answer
   ↓
3. "Next" button becomes enabled
   ↓
4. User clicks "Next"
   ↓
5. Smooth transition to next question
   ↓
6. Progress indicator updates
   ↓
7. Repeat until all questions answered
```

### 3. Results & Reflection Flow

```
1. User completes final question
   ↓
2. Completion animation plays
   ↓
3. Results summary appears showing:
   - Congratulations message
   - Answer review capability
   - Reflection insights
   ↓
4. User can:
   - Review individual answers
   - Start questionnaire again
   - Contact for feedback
```

---

## Component Library (High-Level)

| Component Name           | Description                                                  | Key Props                                      |
| ------------------------ | ------------------------------------------------------------ | ---------------------------------------------- |
| **ThemeProvider**        | Global theme context and Material-UI theme provider          | `children`, `defaultTheme`                     |
| **Header**               | Top navigation with theme toggle, language switcher, contact | `title`, `showContact`                         |
| **LanguageSwitcher**     | Dropdown for language selection                              | `currentLanguage`, `onLanguageChange`          |
| **EnhancedProgressBar**  | Circular progress with step indicators and breadcrumbs       | `current`, `total`, `completed`                |
| **ProgressBar**          | Simple linear progress indicator                             | `value`, `max`, `animated`                     |
| **QuestionCard**         | Main container for question display                          | `question`, `onAnswer`, `currentAnswer`        |
| **QuoteBox**             | Displays philosophical quotes with attribution               | `quote`, `author`, `citation`                  |
| **Question**             | Question text and content display                            | `title`, `description`, `content`              |
| **RadioAnswers**         | Radio button group for answer selection                      | `options`, `value`, `onChange`, `name`         |
| **ActionButtons**        | Navigation buttons (Next, Previous, Submit)                  | `onNext`, `onPrev`, `nextDisabled`, `showPrev` |
| **ResultsDisplay**       | Shows completion results and insights                        | `answers`, `insights`, `onRestart`             |
| **ContactPopup**         | Modal for contact form/information                           | `open`, `onClose`, `contactInfo`               |
| **NotificationProvider** | Toast notifications for user feedback                        | `children`, `position`, `autoHide`             |
| **QuestionList**         | List view of all questions for review                        | `questions`, `answers`, `onQuestionClick`      |

### Component Hierarchy

```
App
├── ThemeProvider
│   ├── NotificationProvider
│   │   ├── Header
│   │   │   ├── LanguageSwitcher
│   │   │   └── ContactPopup
│   │   ├── EnhancedProgressBar
│   │   ├── QuestionCard
│   │   │   ├── QuoteBox
│   │   │   ├── Question
│   │   │   └── RadioAnswers
│   │   ├── ActionButtons
│   │   └── ResultsDisplay
│   └── QuestionList (when in review mode)
```

---

## Animation & Transitions

### Micro-Interactions

- **Button Hover**: Gentle scale (1.02x) with 200ms ease-out
- **Card Hover**: Subtle shadow elevation with 300ms ease-out
- **Progress Updates**: Smooth circular progress animation over 500ms
- **Theme Toggle**: Smooth color transition over 300ms

### Page Transitions

- **Question Navigation**: Slide transition (300ms ease-in-out)
- **Modal Appearance**: Fade in with scale (250ms ease-out)
- **Loading States**: Pulse animation for skeleton screens

### States & Feedback

- **Form Validation**: Gentle shake animation for errors
- **Success States**: Checkmark animation with green accent
- **Loading States**: Circular progress with primary color

---

## Accessibility Considerations

### Color & Contrast

- All text meets WCAG 2.1 AA contrast requirements (4.5:1 minimum)
- Color is never the only means of conveying information
- High contrast mode support for enhanced accessibility

### Navigation & Interaction

- Full keyboard navigation support
- Screen reader optimized markup and ARIA labels
- Focus indicators clearly visible in both themes
- Logical tab order throughout the application

### Content & Language

- Clear, simple language for complex philosophical concepts
- Consistent terminology across all interface elements
- Proper heading hierarchy for screen reader navigation
- Alternative text for all meaningful images/icons

---

## Responsive Design Patterns

### Mobile-First Approach

- Base styles designed for mobile (320px+)
- Progressive enhancement for larger screens
- Touch-friendly interface elements (44px minimum)

### Breakpoint Strategy

```
xs: 0px     (Mobile Portrait)
sm: 600px   (Mobile Landscape / Small Tablet)
md: 900px   (Tablet Portrait)
lg: 1200px  (Desktop)
xl: 1536px  (Large Desktop)
```

### Adaptive Components

- **Navigation**: Collapses to hamburger menu on mobile
- **Progress Bar**: Switches from breadcrumbs to simple indicator
- **Question Cards**: Stack vertically on mobile, side-by-side on desktop
- **Typography**: Scales down proportionally for mobile readability

---

## Performance Considerations

### Optimization Strategies

- **Component Lazy Loading**: Non-critical components loaded on demand
- **Image Optimization**: WebP format with fallbacks
- **Animation Performance**: CSS transforms over layout changes
- **Bundle Splitting**: Separate chunks for different language packs

### Loading States

- **Skeleton Loading**: For question cards and content
- **Progressive Loading**: Questions loaded in batches
- **Optimistic Updates**: Immediate feedback for user actions

---

_This design system document should be reviewed and updated regularly as the product evolves and user feedback is incorporated._
