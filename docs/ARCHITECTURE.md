# ClarityAge - 40: System Architecture

**📚 [Documentation Hub](./README.md) | [← Back to Documentation](./README.md)**

---

## Architecture Overview

ClarityAge is a **single-page web application (SPA)** built with a modern React-based frontend architecture. The application uses a **frontend-only approach** with no backend server, relying on client-side state management and browser localStorage for data persistence.

### Architectural Style

- **Pattern**: Component-based React architecture
- **State Management**: Redux Toolkit with localStorage persistence
- **Styling**: Material-UI (MUI) with Emotion CSS-in-JS
- **Internationalization**: i18next with browser language detection
- **Build Tool**: Vite for fast development and optimized production builds

---

## Technology Stack

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.x | UI component framework |
| **TypeScript** | 5.x | Type-safe JavaScript development |
| **Vite** | 5.x | Build tool and dev server |

### State & Data Management

| Technology | Version | Purpose |
|------------|---------|---------|
| **Redux Toolkit** | Latest | State management with slice architecture |
| **Redux Persist** | Latest | localStorage integration for state persistence |

### UI & Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| **Material-UI (MUI)** | 9.x | Component library and theming |
| **Emotion** | Latest | CSS-in-JS styling engine |
| **@fontsource/roboto** | Latest | Typography |
| **Material Icons** | Latest | UI iconography |

### Internationalization

| Technology | Version | Purpose |
|------------|---------|---------|
| **i18next** | Latest | Internationalization framework |
| **react-i18next** | Latest | React bindings for i18next |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | Latest | Code linting and quality |
| **Prettier** | Latest | Code formatting |
| **gh-pages** | Latest | GitHub Pages deployment |
| **TypeScript Compiler** | 5.x | Type checking and compilation |

---

## Project Structure

```
/workspaces/ClarityAge/
├── docs/                      # Project documentation
│   ├── README.md              # Documentation hub
│   ├── PURPOSE.md             # Project purpose and goals
│   ├── ARCHITECTURE.md        # System architecture (this file)
│   ├── DEVELOPMENT.md         # Development guidelines
│   ├── DEPLOYMENT.md          # Deployment guide
│   ├── IMPLEMENTATION.md      # Technical implementation
│   ├── AI_AGENT_GUIDE.md      # AI agent guidelines
│   ├── design.md              # Design system
│   ├── features.md            # Feature specifications
│   └── awarness.md            # Development awareness
│
├── src/                       # Application source code
│   ├── components/            # React UI components
│   │   ├── ActionButtons.tsx      # Navigation controls (Next, Previous, Submit)
│   │   ├── AppContent.tsx         # Main application container
│   │   ├── ContactPopup.tsx       # Contact form modal
│   │   ├── Header.tsx             # Application header with navigation
│   │   ├── LanguageSwitcher.tsx   # Language selection dropdown
│   │   ├── NotificationProvider.tsx # Toast notifications
│   │   ├── ProgressBar.tsx        # Circular progress indicator
│   │   ├── Question.tsx           # Individual question display
│   │   ├── QuestionList.tsx       # Questions overview/review
│   │   ├── QuoteBox.tsx           # Philosophical quotes display
│   │   ├── RadioAnswers.tsx       # Answer selection interface
│   │   ├── ResultsDisplay.tsx     # Results presentation
│   │   └── ThemeProvider.tsx      # Dark/light mode provider
│   │
│   ├── config/                # Configuration files
│   │   ├── base.ts               # Question definitions (40 questions)
│   │   └── constants.ts          # App constants and state enums
│   │
│   ├── locales/               # Translation files
│   │   ├── en.json              # English translations
│   │   ├── pl.json              # Polish translations
│   │   └── new_q.json           # New questions template
│   │
│   ├── store/                 # Redux store configuration
│   │   ├── hooks.ts              # Redux hooks (useAppSelector, useAppDispatch)
│   │   ├── questionsSlice.ts     # Questions state management
│   │   └── store.ts              # Store configuration with persistence
│   │
│   ├── types/                 # TypeScript type definitions
│   │   └── all.types.ts         # All type definitions
│   │
│   ├── docs/                  # Source documentation (archived)
│   │   ├── AI_GUIDELINES.md
│   │   ├── awarness.md
│   │   ├── base.md
│   │   ├── design.md
│   │   └── features.md
│   │
│   ├── i18n.ts               # i18next configuration
│   ├── App.tsx               # Main App component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
│
├── .github/                  # GitHub configuration
│   └── copilot-instructions.md
│
├── public/                   # Static assets
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── README.md                # Main project README
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
└── LICENSE                 # MIT License
```

---

## Component Architecture

### Component Hierarchy

```
App (root)
├── ThemeProvider (MUI theme context)
│   └── NotificationProvider (Toast notifications)
│       └── AppContent (Main layout)
│           ├── Header (Navigation bar)
│           │   ├── LanguageSwitcher
│           │   └── ContactPopup
│           │
│           ├── ProgressBar (Progress indicator)
│           │
│           ├── Question (Question display)
│           │   ├── QuoteBox (Philosophical quote)
│           │   └── RadioAnswers (Answer selection)
│           │
│           ├── ActionButtons (Navigation)
│           │
│           └── ResultsDisplay (Completion view)
│               └── QuestionList (Answer review)
```

### Component Responsibilities

| Component | Responsibility | Props |
|-----------|----------------|-------|
| **App** | Application root, routing setup | - |
| **ThemeProvider** | Theme context, MUI theme configuration | defaultTheme |
| **NotificationProvider** | Toast notification context | position, autoHide |
| **AppContent** | Main layout, content orchestration | - |
| **Header** | Top navigation, branding | title, showContact |
| **LanguageSwitcher** | Language selection dropdown | currentLanguage, onChange |
| **ContactPopup** | Contact form modal | open, onClose, contactInfo |
| **ProgressBar** | Circular progress indicator | current, total, completed |
| **Question** | Question content display | question, onAnswer |
| **QuoteBox** | Philosophical quote display | quote, author, citation |
| **RadioAnswers** | Answer selection interface | options, value, onChange |
| **ActionButtons** | Navigation controls | onNext, onPrev, nextDisabled |
| **ResultsDisplay** | Completion view, results summary | answers, onRestart |
| **QuestionList** | All questions overview for review | questions, answers |

---

## State Management

### Redux Store Architecture

```typescript
// Store Configuration
store = {
  questions: questionsSlice,
  // Additional slices can be added here
}

// Questions Slice State
questionsState = {
  currentStep: number,        // Current question index
  answers: Record<string, string>, // User answers {questionId: answer}
  completed: boolean,         // Questionnaire completion status
  isStarted: boolean          // User has started questionnaire
}
```

### State Persistence

- **Mechanism**: Redux Persist middleware
- **Storage**: Browser localStorage
- **Key**: `clarityage-root`
- **Whitelist**: `questions` slice only
- **Migration**: Version 1 (current)

### State Flow

1. **User Action** → Component dispatches action
2. **Action** → Redux reducer processes state change
3. **State Update** → Components re-render via selectors
4. **Persistence** → Redux Persist syncs to localStorage
5. **Session Recovery** → State restored from localStorage on load

---

## Data Flow

### Question Answer Flow

```
User selects answer
    ↓
RadioAnswers component onChange
    ↓
Dispatch setAnswer(questionId, answer)
    ↓
questionsSlice reducer updates state
    ↓
Component re-renders with new state
    ↓
State persisted to localStorage
    ↓
Next button enabled (if was disabled)
```

### Navigation Flow

```
User clicks "Next" button
    ↓
ActionButtons onClick handler
    ↓
Validation: Is answer selected?
    ↓ (yes)
Dispatch nextStep() action
    ↓
currentStep incremented in state
    ↓
ProgressBar updates
    ↓
Question component re-renders with next question
    ↓
State persisted to localStorage
```

### Theme Toggle Flow

```
User clicks theme toggle
    ↓
Header theme toggle handler
    ↓
Dispatch toggleTheme() action
    ↓
Theme mode updated in localStorage (direct)
    ↓
ThemeProvider detects change
    ↓
MUI theme updated
    ↓
All components re-render with new theme
```

---

## Internationalization Architecture

### i18next Configuration

```typescript
i18nConfig = {
  lng: 'en' | 'pl',           // Current language
  fallbackLng: 'en',          // Fallback language
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
  },
  resources: {
    en: { translation: enJson },
    pl: { translation: plJson }
  }
}
```

### Translation Structure

```json
{
  "common": {
    "next": "Next",
    "previous": "Previous",
    "submit": "Submit"
  },
  "question": {
    "of": "of",
    "question": "Question"
  },
  "theme": {
    "light": "Light",
    "dark": "Dark"
  }
}
```

### Language Detection

1. **Priority 1**: User-selected language (localStorage)
2. **Priority 2**: Browser navigator.language
3. **Fallback**: English (`en`)

---

## Configuration Files

### Vite Configuration (`vite.config.ts`)

```typescript
{
  server: {
    host: '0.0.0.0',      // Allow external access
    port: 5173            // Default Vite port
  },
  build: {
    outDir: 'dist',       // Output directory
    sourcemap: true,      // Source maps for debugging
    rollupOptions: {
      output: {
        manualChunks:     // Code splitting
      }
    }
  }
}
```

### TypeScript Configuration (`tsconfig.json`)

```typescript
{
  compilerOptions: {
    target: 'ES2020',
    module: 'ESNext',
    lib: ['ES2020', 'DOM', 'DOM.Iterable'],
    jsx: 'react-jsx',
    strict: true,                    // Strict type checking
    moduleResolution: 'bundler',
    resolveJsonModule: true,
    esModuleInterop: true
  }
}
```

---

## Performance Considerations

### Code Splitting

- **Lazy Loading**: Non-critical components loaded on demand
- **Language Bundles**: Separate chunks per language
- **Route Splitting**: Future support for multiple views

### Optimization Strategies

| Area | Strategy |
|------|----------|
| **Bundle Size** | Tree-shaking, code splitting, dependency optimization |
| **Load Time** | Vite's optimized build, caching headers |
| **Runtime** | Efficient Redux selectors, memoization where needed |
| **Rendering** | React 19's automatic optimizations |

---

## Security Architecture

### Privacy-First Design

- **No Backend**: Zero server-side data collection
- **Local Storage Only**: User data never leaves device
- **No Analytics**: No third-party tracking or analytics
- **No Cookies**: No persistent tracking mechanisms
- **Open Source**: Transparent codebase for audit

### Data Flow Security

```
User Device
    ↓ (All processing local)
React Components
    ↓ (Local state management)
Redux Store
    ↓ (Browser storage)
localStorage
```

---

## Deployment Architecture

### GitHub Pages Deployment

```
Development (local)
    ↓
Vite Build
    ↓
dist/ directory
    ↓
gh-pages deploy
    ↓
GitHub Pages
    ↓
https://bitlogicforge.github.io/ClarityAge
```

### Deployment Configuration

- **Base URL**: `/ClarityAge/`
- **Build Output**: `dist/`
- **Deployment**: `npm run deploy`
- **Branch**: `gh-pages` branch
- **HTTPS**: Automatic via GitHub Pages

---

## Scalability Considerations

### Current Limitations

- **Single User**: No multi-user support
- **Local Storage Only**: 5-10MB browser limit
- **No Backend**: No centralized data or analytics

### Future Scaling Options

1. **Optional Backend**: User account system for cross-device sync
2. **Progressive Web App**: Enhanced offline capabilities
3. **CDN Deployment**: Static asset distribution
4. **Edge Functions**: Serverless features for advanced functionality

---

## Related Documentation

- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Technical implementation details
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development setup and guidelines
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment procedures
- **[PURPOSE.md](./PURPOSE.md)** - Project goals and philosophy

---

*This architecture document reflects the current state of ClarityAge. For planned architectural changes, see the features document and project issues.*
