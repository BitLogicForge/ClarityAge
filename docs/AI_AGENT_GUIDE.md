# ClarityAge - 40: AI Agent Development Guide

**📚 [Documentation Hub](./README.md) | [← Back to Documentation](./README.md)**

---

## AI Agent Quick Start

**⚠️ AI agents working on this project MUST start here.**

This guide provides specific instructions for AI agents (Claude, GitHub Copilot, etc.) to work effectively with the ClarityAge codebase.

---

## Project Context for AI Agents

### What is ClarityAge?

ClarityAge - 40 is a **single-page web application** that presents a philosophical questionnaire to help users reflect on their life perspectives, values, and approaches to meaning.

**Key Characteristics:**
- Frontend-only React application (no backend)
- TypeScript with strict type checking
- Redux Toolkit for state management with localStorage persistence
- Material-UI (MUI) for components and theming
- i18next for internationalization (English, Polish)
- Vite for build tooling
- GitHub Pages deployment

### Tech Stack Summary

```
Frontend: React 19 + TypeScript
State: Redux Toolkit + Redux Persist
UI: Material-UI v9 + Emotion
i18n: i18next + react-i18next
Build: Vite 5.x
Deployment: GitHub Pages (gh-pages)
```

---

## AI Agent Behavioral Rules

### 1. NEVER Assume Without Verification

```bash
# ❌ BAD: Assume file exists
"Edit the file at src/components/NewComponent.tsx"

# ✅ GOOD: Verify first
"Check if src/components/NewComponent.tsx exists. If not, create it..."
```

### 2. ALWAYS Verify File Paths

Before referencing any file, module, or path:
- Confirm it exists in the project structure
- Use the correct import paths
- Verify the file is in the expected location

```typescript
// ✅ GOOD: Check structure first
// src/components/Header.tsx - verified in ARCHITECTURE.md
import { Header } from '../components/Header';

// ❌ BAD: Assume location
import { Header } from './Header';  // May be wrong path
```

### 3. NEVER Invent Dependencies

Only use dependencies that are:
- Already in package.json
- Being explicitly added (with user confirmation)

```bash
# ✅ GOOD: Use existing dependencies
"We'll use @mui/material which is already installed"

# ❌ BAD: Invent new library
"Let's use the 'fancy-logger' library for this"
```

### 4. PRESERVE Existing Code

NEVER delete or modify existing code unless:
- Explicitly instructed to do so
- It's part of a documented refactoring task

```typescript
// ❌ BAD: Delete without asking
"Remove this old function and replace with..."

// ✅ GOOD: Preserve or confirm
"This function exists. Should I refactor it or create a new one?"
```

---

## Codebase Structure for AI Agents

### Critical Files Reference

| File Path | Purpose | AI Agent Notes |
|-----------|---------|----------------|
| `/src/App.tsx` | Root component | Main app entry, contains routing/logic |
| `/src/main.tsx` | Entry point | Bootstrap file, rarely needs changes |
| `/src/components/` | UI components | All React components live here |
| `/src/store/` | Redux state | State management, read before modifying state |
| `/src/config/base.ts` | Questions data | Source of truth for all questions |
| `/src/locales/` | Translations | en.json and pl.json for i18n |
| `/vite.config.ts` | Build config | Contains deployment-specific settings |
| `/tsconfig.json` | TypeScript config | Strict mode enabled, respect types |
| `/package.json` | Dependencies | Check before adding new dependencies |

### File Organization Pattern

```
src/
├── components/          # All React components
│   ├── ComponentName.tsx    # Component file
│   └── ComponentName.test.tsx  # Tests (when added)
├── config/              # Configuration and data
├── store/               # Redux state management
├── types/               # TypeScript types
└── locales/             # Translation files
```

---

## AI Agent Workflow

### Step 1: Context Review

Before starting ANY task:

```markdown
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand structure
2. Read [IMPLEMENTATION.md](./IMPLEMENTATION.md) for technical details
3. Read relevant section of [DEVELOPMENT.md](./DEVELOPMENT.md)
4. Check existing code patterns in the codebase
```

### Step 2: Task Verification

Confirm the task is:
- Well-defined and specific
- Within project scope
- Aligned with project goals
- Technically feasible

**Ask clarifying questions if uncertain.**

### Step 3: Implementation

Follow project conventions:
- TypeScript with explicit types
- React functional components with hooks
- Material-UI for UI components
- i18next for all user-facing text
- Redux for state management

### Step 4: Verification

After implementation:
- Check TypeScript compiles (`npm run type-check`)
- Verify ESLint passes (`npm run lint`)
- Test functionality manually if possible
- Document any changes made

---

## Coding Patterns for AI Agents

### Component Creation Pattern

```typescript
// ✅ CORRECT PATTERN
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ComponentNameProps {
  /** Prop description */
  value: string;
  /** Optional prop with default */
  optional?: boolean;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  value,
  optional = false
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="body1">
        {t('translation.key')}
      </Typography>
    </Box>
  );
};
```

### State Modification Pattern

```typescript
// ✅ CORRECT: Use Redux hooks
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setAnswer } from '../store/questionsSlice';

export const Component = () => {
  const dispatch = useAppDispatch();
  const answers = useAppSelector(state => state.questions.answers);

  const handleChange = (value: string) => {
    dispatch(setAnswer({ questionId: 'q1', answer: value }));
  };

  // ...
};
```

### Translation Pattern

```typescript
// ✅ CORRECT: All user text in translations
const { t } = useTranslation();

<Button>
  {t('common.next')}
</Button>

// ❌ WRONG: Hardcoded text
<Button>
  Next
</Button>
```

---

## Common AI Agent Mistakes to Avoid

### Mistake 1: Wrong Import Paths

```typescript
// ❌ WRONG
import { Component } from './Component';
// (Component might be in ../components/)

// ✅ CORRECT
import { Component } from '../components/Component';
```

### Mistake 2: Missing Type Definitions

```typescript
// ❌ WRONG
export const MyComponent = ({ data }) => {
  // What is data?
}

// ✅ CORRECT
interface Props {
  data: DataType;
}
export const MyComponent: React.FC<Props> = ({ data }) => {
  // Types are clear
}
```

### Mistake 3: Hardcoded User Text

```typescript
// ❌ WRONG
<h2>Question 1</h2>

// ✅ CORRECT
<h2>{t('question.title', { number: 1 })}</h2>
```

### Mistake 4: Ignoring Existing Patterns

```typescript
// ❌ WRONG: Create new pattern when existing one works
const [localState, setLocalState] = useState({});

// ✅ CORRECT: Use Redux for shared state
const state = useAppSelector(state => state.questions);
```

---

## AI Agent Response Guidelines

### When Task is Clear

1. Acknowledge understanding
2. Outline approach briefly
3. Implement following project patterns
4. Explain changes made

### When Task is Unclear

1. **STOP**
2. Ask specific clarifying questions
3. Wait for human response
4. Proceed only when clear

**Example Questions:**
- "Should this be a new component or modify an existing one?"
- "Which file should contain this functionality?"
- "Is this for English only or all languages?"

### When Blocked

1. Clearly state the blocker
2. Explain what information is needed
3. Stop work on that task
4. Wait for guidance

---

## Project-Specific AI Instructions

### Working with Questions

```typescript
// Questions are in src/config/base.ts
// To add a question:
{
  id: 'q41',  // Next sequential ID
  text: 'Question text',
  answers: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  quote: 'Philosophical quote',
  author: 'Author name'
}

// Don't forget translations!
// Add to src/locales/en.json and pl.json
```

### Working with State

```typescript
// State structure is in src/store/questionsSlice.ts
// Available actions:
// - setAnswer({ questionId, answer })
// - nextStep()
// - prevStep()
// - setCompleted()
// - reset()

// DO NOT create new state slices without explicit instruction
```

### Working with Themes

```typescript
// Theme is managed by ThemeProvider component
// Available modes: 'light' | 'dark'
// MUI theme is already configured

// To add theme customization:
// Edit src/components/ThemeProvider.tsx
// Follow MUI theme structure
```

---

## AI Agent Quality Checklist

Before considering a task complete:

- [ ] TypeScript compiles without errors
- [ ] All types are explicitly defined
- [ ] No console.log statements left in code
- [ ] All user-facing text uses translations
- [ ] Component follows existing patterns
- [ ] Import paths are correct
- [ ] File is in appropriate location
- [ ] Changes are documented if needed

---

## Emergency AI Agent Procedures

### If You Make a Mistake

1. **Immediately acknowledge** the error
2. **Explain what went wrong**
3. **Propose a fix**
4. **Wait for approval** before applying fix

### If Code Doesn't Work

1. **Don't guess** at the problem
2. **State the error** clearly
3. **Suggest debugging steps**
4. **Ask for guidance**

### If Task is Out of Scope

1. **Identify why** it's out of scope
2. **Explain the limitation**
3. **Suggest alternatives**
4. **Ask for clarification**

---

## AI Agent Communication Style

### DO

- Be specific and precise
- Use examples for clarity
- Acknowledge uncertainty
- Ask questions when needed
- Follow project conventions

### DON'T

- Assume context without verification
- Guess at file paths or structure
- Invent libraries or patterns
- Modify code without explicit instruction
- Be vague about changes made

---

## Related Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System structure (READ FIRST)
- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Technical patterns (READ SECOND)
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development workflow
- **[AWARENESS.md](./AWARENESS.md)** - General development awareness

---

## AI Agent Summary

**Your Role:** Assist with ClarityAge development following established patterns.

**Your Constraints:**
- Only use verified dependencies
- Only modify code when instructed
- Always verify before assuming
- Follow TypeScript + React + MUI patterns

**Your Workflow:**
1. Read relevant documentation
2. Verify task understanding
3. Ask clarifying questions if needed
4. Implement following patterns
5. Verify and document changes

**When in doubt:** ASK. Don't guess.

---

*This guide is specifically for AI agents. Human developers should use [DEVELOPMENT.md](./DEVELOPMENT.md).*
