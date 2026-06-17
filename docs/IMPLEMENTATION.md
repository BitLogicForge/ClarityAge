# CES-D Depression Screening: Technical Implementation

**📚 [Documentation Hub](./README.md) | [← Back to Documentation](./README.md)**

---

## Implementation Overview

This document provides detailed technical implementation guidance for CES-D Depression Screening, covering component implementation patterns, state management, internationalization, scoring algorithm, and key technical decisions.

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

---

## State Management Implementation

### Redux Slice Pattern

State is managed using Redux Toolkit's slice pattern with NO persistence:

```typescript
// src/store/cesdSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CESDState, CESDCategory } from '../types/all.types';

interface CESDState {
  answers: Record<number, number>;
  currentQuestion: number;
  completed: boolean;
  score: number | null;
  category: CESDCategory | null;
  started: boolean;
}

const initialState: CESDState = {
  answers: {},
  currentQuestion: 0,
  completed: false,
  score: null,
  category: null,
  started: false,
};

const cesdSlice = createSlice({
  name: 'cesd',
  initialState,
  reducers: {
    startAssessment: (state) => {
      state.started = true;
    },
    setAnswer: (state, action: PayloadAction<{ questionId: number; value: number }>) => {
      state.answers[action.payload.questionId] = action.payload.value;
    },
    calculateAndComplete: (state) => {
      // Score calculation
    },
    reset: () => initialState,
  },
});
```

### Privacy-First Architecture

**NO Redux Persist middleware** - This is intentional for privacy:

```typescript
// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cesdReducer from './cesdSlice';

export const store = configureStore({
  reducer: {
    cesd: cesdReducer,
  },
  // NO persist middleware - state exists only in memory
});
```

---

## Scoring Algorithm Implementation

### CES-D Scoring Logic

The CES-D scoring algorithm includes reverse-scoring for positively worded items:

```typescript
const calculateScoreAndCategory = (answers: Record<number, number>) => {
  let total = 0;
  const reverseScored = [4, 8, 12, 16];

  for (let i = 1; i <= 20; i++) {
    const value = answers[i] ?? 0;

    // Reverse scoring for positively worded items
    if (reverseScored.includes(i as 4 | 8 | 12 | 16)) {
      total += (3 - value);
    } else {
      total += value;
    }
  }

  const category = getCategoryFromScore(total);

  return { score: total, category };
};
```

### Category Determination

```typescript
export const getCategoryFromScore = (score: number): CESDCategory => {
  if (score < 16) return 'minimal';
  if (score <= 20) return 'mild';
  if (score <= 25) return 'moderate';
  return 'severe';
};
```

---

## Key Component Implementations

### DisclaimerScreen Component

```typescript
// src/components/DisclaimerScreen.tsx
export const DisclaimerScreen: React.FC<DisclaimerScreenProps> = ({ onAccept }) => {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Alert severity="warning">
        <Typography variant="h4">{t('cesd.disclaimer.title')}</Typography>
        <Typography variant="body1">{t('cesd.disclaimer.text')}</Typography>
      </Alert>
      <Button variant="contained" onClick={onAccept}>
        {t('cesd.disclaimer.agree')}
      </Button>
    </Box>
  );
};
```

### CESDQuestion Component

```typescript
// src/components/CESDQuestion.tsx
export const CESDQuestion: React.FC<CESDQuestionProps> = ({
  question,
  value,
  onChange,
  questionNumber
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6">{t(question.text)}</Typography>
      <RadioGroup value={value} onChange={(e) => onChange(parseInt(e.target.value))}>
        <FormControlLabel value={0} control={<Radio />} label={t('cesd.responses.r0')} />
        <FormControlLabel value={1} control={<Radio />} label={t('cesd.responses.r1')} />
        <FormControlLabel value={2} control={<Radio />} label={t('cesd.responses.r2')} />
        <FormControlLabel value={3} control={<Radio />} label={t('cesd.responses.r3')} />
      </RadioGroup>
    </Box>
  );
};
```

### CESDResults Component

```typescript
// src/components/CESDResults.tsx
export const CESDResults: React.FC<CESDResultsProps> = ({ score, category, onRestart }) => {
  const { t } = useTranslation();

  return (
    <Box>
      {/* Score Display */}
      <Typography variant="h4">{t('cesd.results.scoreLabel')}: {score}/60</Typography>
      <Typography variant="h5">{t(`cesd.results.${category}.title`)}</Typography>

      {/* Category-specific information */}
      <Typography variant="body1">
        {t(`cesd.results.${category}.description`)}
      </Typography>

      {/* Disclaimer */}
      <Alert severity="warning">
        {t('cesd.disclaimer.notDiagnostic')}
      </Alert>

      {/* Crisis resources for severe */}
      {category === 'severe' && <CrisisResources />}

      {/* Self-help for moderate/severe */}
      {(category === 'moderate' || category === 'severe') && <SelfHelpResources />}

      {/* Action buttons */}
      <Button variant="outlined" onClick={onRestart}>
        {t('cesd.actions.retake')}
      </Button>
    </Box>
  );
};
```

---

## Type Definitions

### Core Types

```typescript
// src/types/all.types.ts

export interface TCESDQuestion {
  id: number;
  text: string;
  isReverseScored: boolean;
}

export interface CESDState {
  answers: Record<number, number>;
  currentQuestion: number;
  completed: boolean;
  score: number | null;
  category: CESDCategory | null;
  started: boolean;
}

export type CESDCategory = 'minimal' | 'mild' | 'moderate' | 'severe';
export type CESDResponse = 0 | 1 | 2 | 3;

// Constants
export const REVERSE_SCORED_ITEMS = [4, 8, 12, 16] as const;
export const CESDScoreRanges = {
  MINIMAL: { min: 0, max: 15 },
  MILD: { min: 16, max: 20 },
  MODERATE: { min: 21, max: 25 },
  SEVERE: { min: 26, max: 60 },
} as const;
```

---

## Question Configuration

### Question Structure

Questions are defined in `src/config/cesd.ts`:

```typescript
export const cesdQuestions: TCESDQuestion[] = [
  { id: 1, text: 'cesd.questions.q1', isReverseScored: false },
  { id: 2, text: 'cesd.questions.q2', isReverseScored: false },
  { id: 3, text: 'cesd.questions.q3', isReverseScored: false },
  { id: 4, text: 'cesd.questions.q4', isReverseScored: true },
  // ... all 20 questions
];
```

---

## Build and Development Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "typecheck": "tsc -b --noEmit"
  }
}
```

---

## Common Implementation Patterns

### Conditional Rendering Based on State

```typescript
if (!started) {
  return <DisclaimerScreen onAccept={handleAcceptDisclaimer} />;
}

if (completed && score !== null && category !== null) {
  return <CESDResults score={score} category={category} onRestart={handleRestart} />;
}

// Otherwise show questions
```

### Event Handling

```typescript
const handleAnswer = (value: number) => {
  dispatch(setAnswer({ questionId: currentQuestionData.id, value }));
};

const handleSubmit = () => {
  dispatch(calculateAndComplete());
};
```

---

## Testing Considerations

### Privacy Testing

```typescript
// Verify no data is stored
expect(localStorage.getItem('cesd-state')).toBeNull();
expect(sessionStorage.getItem('cesd-state')).toBeNull();
```

### Scoring Testing

```typescript
describe('CES-D Scoring', () => {
  it('should calculate score correctly', () => {
    const answers = { 1: 0, 2: 1, 3: 2, 4: 3 }; // Example
    const { score } = calculateScoreAndCategory(answers);
    // Verify calculation with reverse-scoring
  });
});
```

---

## Related Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture overview
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development setup and workflow
- **[design.md](./design.md)** - Component design specifications
- **[AI_AGENT_GUIDE.md](./AI_AGENT_GUIDE.md)** - Guidelines for AI implementation

---

*This implementation guide is a living document. Update it when implementing new patterns or changing existing approaches.*
