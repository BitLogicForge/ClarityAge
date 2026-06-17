# ClarityAge - 40: Technical Implementation

**📚 [Documentation Hub](./README.md) | [← Back to Documentation](./README.md)**

---

## Implementation Overview

This document provides detailed technical implementation guidance for ClarityAge - 40, covering component implementation patterns, state management, internationalization, and key technical decisions.

---

## Component Implementation Patterns

### Type-Safe Props Pattern

All components use TypeScript interfaces for props with clear documentation:

```typescript
interface ComponentProps {
  /** Description of the prop */
  propName: string;
  /** Optional prop with default */
  optionalProp?: number;
  /** Callback function */
  onAction: (value: Type) => void;
}

export const Component: React.FC<ComponentProps> = ({
  propName,
  optionalProp = defaultValue,
  onAction
}) => {
  // Implementation
};
```

### Material-UI Component Usage

Components follow Material-UI patterns with consistent theming:

```typescript
import { Box, Typography, Button } from '@mui/material';

export const ExampleComponent: React.FC<Props> = () => {
  return (
    <Box sx={containerStyles}>
      <Typography variant="h5">Title</Typography>
      <Button variant="contained" color="primary">
        Action
      </Button>
    </Box>
  );
};
```

### Styling Conventions

**sx prop pattern** for simple styling:

```typescript
<Box sx={{
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  p: 2
}}>
```

**Styled components** for reusable styles:

```typescript
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing(2)};
`;
```

---

## State Management Implementation

### Redux Slice Pattern

State is managed using Redux Toolkit's slice pattern:

```typescript
// src/store/questionsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuestionsState {
  currentStep: number;
  answers: Record<string, string>;
  completed: boolean;
  isStarted: boolean;
}

const initialState: QuestionsState = {
  currentStep: 0,
  answers: {},
  completed: false,
  isStarted: false,
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep = Math.max(0, state.currentStep - 1);
    },
    setCompleted: (state) => {
      state.completed = true;
    },
    reset: () => initialState,
  },
});

export const { setAnswer, nextStep, prevStep, setCompleted, reset } = questionsSlice.actions;
export default questionsSlice.reducer;
```

### Typed Hooks

Use typed hooks for type-safe Redux access:

```typescript
// src/store/hooks.ts
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Persistence Configuration

State persistence configured for questions slice only:

```typescript
// src/store/store.ts
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'clarityage-root',
  storage,
  whitelist: ['questions'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
```

---

## Internationalization Implementation

### i18next Configuration

```typescript
// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    resources: {
      en: { translation: require('./locales/en.json') },
      pl: { translation: require('./locales/pl.json') },
    },
  });

export default i18n;
```

### Translation Usage Pattern

```typescript
import { useTranslation } from 'react-i18next';

export const Component: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Button>
      {t('common.next')}
    </Button>
  );
};
```

### Translation File Structure

```json
{
  "common": {
    "next": "Next",
    "previous": "Previous",
    "submit": "Submit",
    "restart": "Start Over"
  },
  "question": {
    "of": "of",
    "question": "Question"
  },
  "theme": {
    "light": "Light",
    "dark": "Dark"
  },
  "contact": {
    "title": "Contact Us",
    "email": "Email"
  }
}
```

---

## Key Component Implementations

### ThemeProvider

```typescript
// src/components/ThemeProvider.tsx
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#1976D2' },
      secondary: { main: '#7B1FA2' },
    },
  }), [mode]);

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
```

### Question Component

```typescript
// src/components/Question.tsx
import { Question as QuestionType } from '../types/all.types';

interface Props {
  question: QuestionType;
  onAnswer: (answer: string) => void;
  currentAnswer?: string;
}

export const Question: React.FC<Props> = ({ question, onAnswer, currentAnswer }) => {
  return (
    <Box sx={questionContainerStyles}>
      <QuoteBox quote={question.quote} author={question.author} />
      <Typography variant="h5">{question.text}</Typography>
      <RadioAnswers
        options={question.answers}
        value={currentAnswer}
        onChange={(answer) => onAnswer(answer)}
      />
    </Box>
  );
};
```

### ProgressBar Component

```typescript
// src/components/ProgressBar.tsx
import { CircularProgress, Box, Typography } from '@mui/material';

interface Props {
  current: number;
  total: number;
  completed?: boolean;
}

export const ProgressBar: React.FC<Props> = ({ current, total, completed }) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <Box sx={progressContainerStyles}>
      <CircularProgress
        variant="determinate"
        value={progress}
        size={80}
        sx={{ color: completed ? 'success.main' : 'primary.main' }}
      />
      <Typography variant="caption">
        {current + 1} / {total}
      </Typography>
    </Box>
  );
};
```

---

## Type Definitions

### Core Types

```typescript
// src/types/all.types.ts

export interface Question {
  id: string;
  text: string;
  answers: string[];
  quote: string;
  author: string;
  category?: string;
}

export interface Answer {
  questionId: string;
  answer: string;
  timestamp?: number;
}

export interface AppState {
  questions: QuestionsState;
}

export interface QuestionsState {
  currentStep: number;
  answers: Record<string, string>;
  completed: boolean;
  isStarted: boolean;
}
```

---

## Question Configuration

### Question Structure

Questions are defined in `src/config/base.ts`:

```typescript
export const questions: Question[] = [
  {
    id: 'q1',
    text: 'Question text here',
    answers: [
      'Answer option 1',
      'Answer option 2',
      'Answer option 3',
      'Answer option 4'
    ],
    quote: 'Philosophical quote',
    author: 'Author name',
    category: 'life-purpose'
  },
  // ... more questions
];
```

### Adding New Questions

1. **Add question object** to `src/config/base.ts`
2. **Add translation keys** to `src/locales/en.json` and `pl.json`
3. **Test navigation** through new question
4. **Verify persistence** across page reloads

---

## Build and Development Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit"
  }
}
```

### Development Workflow

1. **Start development server**: `npm run dev`
2. **Make changes** to source files
3. **Hot reload** automatically refreshes
4. **Type check**: `npm run type-check`
5. **Lint**: `npm run lint`
6. **Format**: `npm run format`
7. **Test build**: `npm run build && npm run preview`

---

## Performance Optimization

### Code Splitting

Vite automatically handles code splitting. For manual splitting:

```typescript
// Lazy load a component
const HeavyComponent = lazy(() => import('./components/HeavyComponent'));

// Use with Suspense
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### Memoization

For expensive computations:

```typescript
import { useMemo } from 'react';

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(dependencies);
}, [dependencies]);
```

### Image Optimization

Use modern formats and provide fallbacks:

```typescript
<img
  srcSet="image.webp, image.jpg"
  type="image/webp"
  alt="Description"
/>
```

---

## Testing Considerations

### Unit Testing Pattern

```typescript
describe('questionsSlice', () => {
  it('should set answer correctly', () => {
    const initialState = { currentStep: 0, answers: {}, completed: false, isStarted: false };
    const action = setAnswer({ questionId: 'q1', answer: 'Option 1' });
    const newState = questionsSlice.reducer(initialState, action);
    expect(newState.answers['q1']).toBe('Option 1');
  });
});
```

### Integration Testing Pattern

```typescript
describe('Question Flow', () => {
  it('should navigate through questions', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Start'));
    // Test question navigation
  });
});
```

---

## Debugging Tools

### Redux DevTools

The store is configured to work with Redux DevTools browser extension.

### React DevTools

Use React DevTools to inspect component hierarchy and state.

### Console Logging

Strategic console logging for development (removed in production):

```typescript
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}
```

---

## Common Implementation Patterns

### Conditional Rendering

```typescript
{condition && <Component />}

{condition ? <ComponentA /> : <ComponentB />}

{condition && (
  <Box>
    <Component />
  </Box>
)}
```

### List Rendering

```typescript
{items.map((item, index) => (
  <Component
    key={item.id}
    item={item}
    index={index}
  />
))}
```

### Event Handling

```typescript
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  // Handle click
};

<Button onClick={handleClick}>
  Click Me
</Button>
```

---

## Related Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture overview
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development setup and workflow
- **[design.md](./design.md)** - Component design specifications
- **[AI_AGENT_GUIDE.md](./AI_AGENT_GUIDE.md)** - Guidelines for AI implementation

---

*This implementation guide is a living document. Update it when implementing new patterns or changing existing approaches.*
