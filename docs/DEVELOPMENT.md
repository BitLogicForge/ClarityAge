# CES-D Depression Screening: Development Guide

**📚 [Documentation Hub](./README.md) | [← Back to Documentation](./README.md)**

---

## Development Overview

This guide provides comprehensive information for contributing to CES-D Depression Screening, including development environment setup, coding standards, workflow procedures, and best practices.

---

## Prerequisites

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| **Node.js** | 18.x or higher | JavaScript runtime |
| **npm** | 9.x or higher | Package manager |
| **Git** | Latest | Version control |

### Optional Tools

| Tool | Purpose |
|------|---------|
| **VS Code** | Recommended IDE |
| **ESLint Plugin** | Inline linting |
| **Prettier Plugin** | Code formatting |

---

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/BitLogicForge/ClarityAge.git
cd ClarityAge
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Verify Installation

```bash
# Start development server
npm run dev

# Should see:
# VITE v7.x.x ready in xxx ms
# ➜ Local: http://localhost:5173/
```

### 4. Development Environment Check

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Format check
npm run format:check
```

---

## Development Workflow

### Daily Development

```bash
# 1. Start development server
npm run dev

# 2. Make changes to source files
# Hot reload automatically refreshes the browser

# 3. Run type checking
npm run typecheck

# 4. Fix any issues
npm run lint:fix

# 5. Test production build
npm run build && npm run preview
```

### Pre-Commit Workflow

```bash
# 1. Stage changes
git add .

# 2. Run quality checks
npm run typecheck
npm run lint:fix

# 3. Commit
git commit -m "feat: description of changes"
```

---

## Coding Standards

### TypeScript Conventions

#### Type Safety

```typescript
// ✅ Good - Explicit types
interface Props {
  title: string;
  onAction: (value: number) => void;
}

// ❌ Bad - Any types
const processData = (data: any) => {
  // Avoid 'any' when possible
};
```

#### Type-Only Imports

```typescript
// ✅ Good - Type-only imports
import type { TCESDQuestion } from '../types/all.types';
import type { CESDCategory } from '../types/all.types';

// ❌ Bad - Value import for types
import { TCESDQuestion } from '../types/all.types';
```

### React Best Practices

#### Hooks Usage

```typescript
// ✅ Good - Proper hook usage
const [state, setState] = useState<number>(0);
const dispatch = useAppDispatch();

// ❌ Bad - Hooks in wrong order
if (condition) {
  const [state, setState] = useState(0); // Never conditionally call hooks
}
```

#### Component Organization

```typescript
// Component structure:
// 1. Imports (including type-only)
// 2. Type definitions
// 3. Component definition
// 4. Helper functions
// 5. Export

import type { Props } from './types';
import { useTranslation } from 'react-i18next';

export const Component: React.FC<Props> = ({ value, onChange }) => {
  // Hooks first
  const { t } = useTranslation();

  // Helper functions
  const handleClick = () => {
    onChange(value);
  };

  // Render last
  return <div onClick={handleClick}>{t('text')}</div>;
};
```

### Styling Conventions

#### Material-UI sx Prop

```typescript
// ✅ Good - sx prop for component-specific styles
<Box sx={{
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  p: 2
}}>
```

#### Consistent Spacing

```typescript
// Use MUI spacing units
<Box sx={{ p: 2 }}>        // 16px padding
<Box sx={{ m: 3 }}>        // 24px margin
<Box sx={{ gap: 1 }}>      // 8px gap
```

---

## Project Structure

### Directory Organization

```
src/
├── components/          # Reusable UI components
├── config/              # CES-D question configuration
├── locales/             # Translation files
├── store/               # Redux state management (no persistence)
├── types/               # TypeScript types
├── App.tsx              # Root component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

### File Naming

- **Components**: PascalCase (`CESDQuestion.tsx`, `Header.tsx`)
- **Utilities**: camelCase (`formatDate.ts`, `apiHelpers.ts`)
- **Types**: camelCase with `.types` suffix (`all.types.ts`)
- **Config**: camelCase (`cesd.ts`)

---

## Commit Conventions

### Commit Message Format

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Usage | Example |
|------|-------|---------|
| `feat` | New feature | `feat: add crisis resources component` |
| `fix` | Bug fix | `fix: correct reverse-scoring calculation` |
| `docs` | Documentation | `docs: update deployment guide` |
| `style` | Code style | `style: format code with prettier` |
| `refactor` | Refactoring | `refactor: simplify state structure` |
| `test` | Test changes | `test: add scoring algorithm tests` |
| `chore` | Maintenance | `chore: update dependencies` |

---

## Testing Strategy

### Current Status

**Unit tests**: Not yet implemented
**Integration tests**: Not yet implemented
**E2E tests**: Not yet implemented

### Manual Testing Checklist

#### Functional Testing

- [ ] Disclaimer screen shows and accepts
- [ ] All 20 questions display correctly
- [ ] Response options work (0-3 scale)
- [ ] Navigation works (next/previous)
- [ ] Scoring calculates correctly
- [ ] Reverse-scoring works (items 4, 8, 12, 16)
- [ ] Results display correct category

#### Privacy Testing

- [ ] No data in localStorage after refresh
- [ ] No data in sessionStorage
- [ ] All state lost on browser refresh
- [ ] No tracking/analytics code

#### Safety Testing

- [ ] Severe scores show crisis resources
- [ ] Moderate scores show appropriate resources
- [ ] Disclaimers display prominently
- [ ] Crisis hotlines are accurate

#### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible

---

## Debugging

### Development Tools

- **React DevTools**: Inspect component hierarchy and state
- **Redux DevTools**: Monitor state changes
- **Console**: View errors and warnings

### Common Debugging Scenarios

#### State Not Updating

```typescript
// Add console logging
const dispatch = useAppDispatch();
const handleClick = () => {
  console.log('Before dispatch');
  dispatch(setAnswer({ questionId: 1, value: 2 }));
  console.log('After dispatch');
};
```

#### Translation Issues

```typescript
// Check i18n instance
console.log('Current language:', i18n.language);
console.log('Translation:', t('cesd.questions.q1'));
```

---

## Performance Guidelines

### Optimization Strategies

#### Component Memoization

```typescript
// Memoize expensive computations
const filteredItems = useMemo(() => {
  return items.filter(item => item.active);
}, [items]);
```

---

## Privacy Guidelines

### Critical Requirements

**NO Data Storage:**
- Never use localStorage for user data
- Never use sessionStorage for user data
- Never send data to external servers
- Never use cookies for tracking

**Implementation Check:**
```typescript
// ✅ Correct - In-memory only
const state = useAppSelector(state => state.cesd);

// ❌ WRONG - Storing data
localStorage.setItem('data', JSON.stringify(data));
```

---

## Troubleshooting

### Common Development Issues

#### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

#### Dependency Issues

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
# (Requires user permission for npm install)
```

#### Build Failures

```bash
# Clean build
rm -rf dist
npm run build
```

---

## Related Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture
- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Implementation details
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment procedures
- **[AI_AGENT_GUIDE.md](./AI_AGENT_GUIDE.md)** - AI development guidelines

---

## Resources

### External Documentation

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Material-UI Documentation](https://mui.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [i18next Documentation](https://www.i18next.com/)

---

*Happy coding! Remember: Privacy is our top priority. Never store user data.*
