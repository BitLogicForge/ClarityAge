# CES-D Depression Screening: System Architecture

**📚 [Documentation Hub](./README.md) | [← Back to Documentation](./README.md)**

---

## Architecture Overview

CES-D Depression Screening is a **single-page web application (SPA)** built with a modern React-based frontend architecture. The application uses a **frontend-only approach** with no backend server, relying on in-memory state management for complete user privacy.

### Architectural Style

- **Pattern**: Component-based React architecture
- **State Management**: Redux Toolkit without persistence
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
| **Vite** | 7.x | Build tool and dev server |

### State & Data Management

| Technology | Version | Purpose |
|------------|---------|---------|
| **Redux Toolkit** | Latest | In-memory state management only |
| **React-Redux** | Latest | React Redux bindings |

**Key Difference**: No Redux Persist - all state exists only in memory for privacy.

### UI & Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| **Material-UI (MUI)** | 9.x | Component library and theming |
| **Emotion** | Latest | CSS-in-JS styling engine |

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
| **TypeScript Compiler** | 5.x | Type checking and compilation |
| **gh-pages** | Latest | GitHub Pages deployment |

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
│   └── AWARENESS.md           # Development awareness
│
├── src/                       # Application source code
│   ├── components/            # React UI components
│   │   ├── AppContent.tsx         # Main application container
│   │   ├── Header.tsx             # Application header with navigation
│   │   ├── LanguageSwitcher.tsx   # Language selection dropdown
│   │   ├── NotificationProvider.tsx # Toast notifications
│   │   ├── ContactPopup.tsx       # Contact form modal
│   │   ├── DisclaimerScreen.tsx   # Disclaimer before assessment
│   │   ├── CESDQuestion.tsx       # Individual question display
│   │   ├── CESDResults.tsx        # Results presentation
│   │   ├── CrisisResources.tsx    # Crisis resources display
│   │   ├── SelfHelpResources.tsx  # Self-help resources
│   │   ├── ProgressIndicator.tsx  # Progress indicator
│   │   ├── NavigationButtons.tsx # Navigation controls
│   │   └── ThemeProvider.tsx      # Dark/light mode provider
│   │
│   ├── config/                # Configuration files
│   │   └── cesd.ts               # CES-D question definitions (20 questions)
│   │
│   ├── locales/               # Translation files
│   │   ├── en.json              # English translations
│   │   └── pl.json              # Polish translations
│   │
│   ├── store/                 # Redux store configuration
│   │   ├── cesdSlice.ts          # CES-D state management (no persistence)
│   │   ├── store.ts              # Store configuration
│   │   └── hooks.ts              # Redux hooks
│   │
│   ├── types/                 # TypeScript type definitions
│   │   └── all.types.ts          # All type definitions
│   │
│   ├── i18n.ts                # i18next configuration
│   ├── App.tsx                # Main App component
│   ├── main.tsx               # Application entry point
│   └── index.css             # Global styles
│
├── .github/                  # GitHub configuration
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
│           ├── DisclaimerScreen (Before assessment)
│           ├── Header (Navigation bar)
│           │   ├── Theme toggle (Light/Dark mode)
│           │   ├── Contact button
│           │   └── Language switcher
│           │
│           ├── ProgressIndicator (Progress through questions)
│           ├── CESDQuestion (Question display)
│           │   └── Radio buttons for 0-3 scale
│           ├── NavigationButtons (Next/Previous/Submit)
│           │
│           └── CESDResults (Completion view)
│               ├── Score display
│               ├── Category interpretation
│               ├── CrisisResources (if severe)
│               └── SelfHelpResources (if moderate/severe)
```

### Component Responsibilities

| Component | Responsibility | Props |
|-----------|----------------|-------|
| **App** | Application root | - |
| **ThemeProvider** | Theme context, MUI theme configuration | children |
| **NotificationProvider** | Toast notification context | children, position |
| **AppContent** | Main layout, flow orchestration | - |
| **DisclaimerScreen** | Disclaimer before assessment | onAccept |
| **Header** | Top navigation, branding, theme toggle | - |
| **LanguageSwitcher** | Language selection dropdown | - |
| **CESDQuestion** | Question content display | question, value, onChange, questionNumber |
| **ProgressIndicator** | Linear progress indicator | current, total |
| **NavigationButtons** | Navigation controls | currentQuestion, totalQuestions, hasAnswer, onPrevious, onNext, onSubmit |
| **CESDResults** | Results summary and resources | score, category, onRestart |
| **CrisisResources** | Crisis hotlines and emergency info | - |
| **SelfHelpResources** | Self-help strategies | - |

---

## State Management

### Redux Store Architecture

```typescript
// Store Configuration
store = {
  cesd: CESDState  // NO other slices
}

// CESD State Structure
CESDState = {
  answers: Record<number, number>,  // questionId -> score (0-3)
  currentQuestion: number,          // Current question index (0-19)
  completed: boolean,               // Assessment completion status
  score: number | null,            // Calculated score
  category: CESDCategory | null,    // Severity category
  started: boolean                 // User accepted disclaimer
}
```

### State Persistence

**NO PERSISTENCE** - This is a key architectural decision for privacy:

- **No localStorage** - No state saved between sessions
- **No sessionStorage** - No session storage
- **No server persistence** - No backend to store data
- **In-memory only** - All state lost when browser closes or refreshes

### State Flow

1. **User accepts disclaimer** → Dispatch `startAssessment()`
2. **User answers question** → Dispatch `setAnswer({ questionId, value })`
3. **User navigates** → Dispatch `nextQuestion()` or `previousQuestion()`
4. **User submits** → Dispatch `calculateAndComplete()` which calculates score and sets category
5. **State lost** → All state lost on browser refresh or close

---

## Data Flow

### Question Answer Flow

```
User selects answer
    ↓
CESDQuestion component onChange
    ↓
Dispatch setAnswer(questionId, value)
    ↓
CESD slice reducer updates state
    ↓
Component re-renders with new state
    ↓
Next button enabled (if was disabled)
```

### Assessment Completion Flow

```
User clicks "Submit" on last question
    ↓
NavigationButtons onClick handler
    ↓
Validation: Is answer selected?
    ↓ (yes)
Dispatch calculateAndComplete()
    ↓
Score calculated with reverse-scoring
    ↓
Category determined (minimal/mild/moderate/severe)
    ↓
completed = true
    ↓
AppContent switches to CESDResults
    ↓
Results displayed with appropriate resources
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
  "app": { "title": "...", "description": "..." },
  "cesd": {
    "disclaimer": { "title": "...", "text": "...", "agree": "..." },
    "questions": { "q1": "...", "q2": "...", ... },
    "responses": { "r0": "...", "r1": "...", "r2": "...", "r3": "..." },
    "results": {
      "minimal": { "title": "...", "description": "...", ... },
      "mild": { ... },
      "moderate": { ... },
      "severe": { ... }
    },
    "resources": { "crisis": {...}, "professional": {...}, ... }
  }
}
```

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
    esModuleInterop: true,
    verbatimModuleSyntax: true       // Enforce type-only imports
  }
}
```

---

## Performance Considerations

### Code Splitting

- **Lazy Loading**: Non-critical components loaded on demand
- **Language Bundles**: Separate chunks per language
- **Route Splitting**: Not applicable (single page app)

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
- **No Storage**: User data never saved anywhere
- **No Analytics**: No third-party tracking or analytics
- **No Cookies**: No persistent tracking mechanisms
- **Open Source**: Transparent codebase for audit

### Data Flow Security

```
User Device
    ↓ (All processing local)
React Components
    ↓ (Local state management)
Redux Store (in-memory only)
    ↓ (No storage)
Session lost on refresh
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
- **No Backend**: No centralized data or analytics
- **Memory-Only**: All state lost on session end

### Future Scaling Options

1. **Optional Backend**: User account system for cross-device sync (with consent)
2. **Provider Portal**: Version for healthcare professionals
3. **Multiple Scales**: Additional validated screening tools
4. **Research Mode**: Anonymous, opt-in data collection for research

---

## Related Documentation

- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Technical implementation details
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development setup and guidelines
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment procedures
- **[PURPOSE.md](./PURPOSE.md)** - Project goals and philosophy

---

*This architecture document reflects the current state of CES-D Depression Screening. Key architectural principle: Privacy through in-memory-only state management.*
