# ClarityAge - 40: Development Guide

**📚 [Documentation Hub](./README.md) | [← Back to Documentation](./README.md)**

---

## Development Overview

This guide provides comprehensive information for contributing to ClarityAge - 40, including development environment setup, coding standards, workflow procedures, and best practices.

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
| **GitLens** | Git history visualization |

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

This installs all production and development dependencies.

### 3. Verify Installation

```bash
# Start development server
npm run dev

# Should see:
# VITE v5.x.x ready in xxx ms
# ➜ Local: http://localhost:5173/
# ➜ Network: http://0.0.0.0:5173/
```

### 4. Development Environment Check

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format check
npm run format
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
npm run type-check

# 4. Fix any issues
npm run format

# 5. Test production build
npm run build && npm run preview
```

### Pre-Commit Workflow

```bash
# 1. Stage changes
git add .

# 2. Run quality checks
npm run type-check
npm run lint

# 3. Format code
npm run format

# 4. Commit
git commit -m "feat: description of changes"
```

### Feature Development

```bash
# 1. Create feature branch
git checkout -b feature/your-feature-name

# 2. Develop feature
npm run dev

# 3. Test thoroughly
npm run build && npm run preview

# 4. Commit changes
git add .
git commit -m "feat: add feature description"

# 5. Push to GitHub
git push origin feature/your-feature-name

# 6. Create pull request
# (via GitHub web interface)
```

---

## Coding Standards

### TypeScript Conventions

#### Type Safety

```typescript
// ✅ Good - Explicit types
interface UserProps {
  name: string;
  age: number;
  onUpdate: (user: User) => void;
}

// ❌ Bad - Any types
const processData = (data: any) => {
  // Avoid 'any' when possible
};
```

#### Component Definition

```typescript
// ✅ Good - Functional component with types
interface ComponentProps {
  title: string;
  items: string[];
}

export const MyComponent: React.FC<ComponentProps> = ({ title, items }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {items.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
};

// ❌ Bad - Missing types
export const MyComponent = ({ title, items }) => {
  // Missing type definitions
};
```

### React Best Practices

#### Hooks Usage

```typescript
// ✅ Good - Proper hook usage
const [state, setState] = useState<string>('');
const dispatch = useAppDispatch();
const { t } = useTranslation();

// ❌ Bad - Hooks in wrong order
if (condition) {
  const [state, setState] = useState(''); // Never conditionally call hooks
}
```

#### Component Organization

```typescript
// Component structure:
// 1. Imports
// 2. Type definitions
// 3. Component definition
// 4. Helper functions
// 5. Export

import { useState } from 'react';
import { Box } from '@mui/material';

interface Props {
  value: string;
}

export const Component: React.FC<Props> = ({ value }) => {
  // Hooks first
  const [localState, setLocalState] = useState('');

  // Helper functions
  const handleClick = () => {
    setLocalState(value);
  };

  // Render last
  return (
    <Box onClick={handleClick}>
      {localState}
    </Box>
  );
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

// ❌ Bad - Inline styles
<Box style={{ display: 'flex', gap: '16px' }}>
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
├── config/              # Configuration files
├── locales/             # Translation files
├── store/               # Redux state management
├── types/               # TypeScript types
├── docs/                # Documentation
├── App.tsx              # Root component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

### File Naming

- **Components**: PascalCase (`Question.tsx`, `Header.tsx`)
- **Utilities**: camelCase (`formatDate.ts`, `apiHelpers.ts`)
- **Types**: camelCase with `.types` suffix (`all.types.ts`)
- **Constants**: camelCase (`constants.ts`, `base.ts`)

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
| `feat` | New feature | `feat: add question export` |
| `fix` | Bug fix | `fix: correct translation keys` |
| `docs` | Documentation | `docs: update deployment guide` |
| `style` | Code style | `style: format code with prettier` |
| `refactor` | Refactoring | `refactor: simplify component structure` |
| `test` | Test changes | `test: add unit tests for slice` |
| `chore` | Maintenance | `chore: update dependencies` |

### Examples

```bash
# Feature
git commit -m "feat: add question bookmarking functionality"

# Bug fix
git commit -m "fix: prevent progress reset on page reload"

# Documentation
git commit -m "docs: add AI agent guidelines"

# Refactoring
git commit -m "refactor: extract common button styles"
```

---

## Testing Strategy

### Current Status

**Unit tests**: Not yet implemented
**Integration tests**: Not yet implemented
**E2E tests**: Not yet implemented

### Manual Testing Checklist

When making changes:

1. **Visual Inspection**
   - [ ] Check all screen sizes (mobile, tablet, desktop)
   - [ ] Test both light and dark themes
   - [ ] Verify all translations

2. **Functional Testing**
   - [ ] Complete full questionnaire flow
   - [ ] Test answer persistence across reloads
   - [ ] Verify navigation (next, previous)
   - [ ] Test language switching

3. **Browser Testing**
   - [ ] Chrome/Edge
   - [ ] Firefox
   - [ ] Safari (if available)
   - [ ] Mobile browsers

---

## Debugging

### Development Tools

#### Browser DevTools

- **React DevTools**: Inspect component hierarchy and state
- **Redux DevTools**: Monitor state changes and actions
- **Console**: View errors and warnings

#### VS Code Debugging

1. Install "Debugger for Chrome" extension
2. Configure launch.json:
```json
{
  "type": "chrome",
  "request": "launch",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}/src"
}
```

### Common Debugging Scenarios

#### State Not Updating

```typescript
// Add console logging
const dispatch = useAppDispatch();
const handleClick = () => {
  console.log('Before dispatch');
  dispatch(setAnswer({ questionId: 'q1', answer: 'Option 1' }));
  console.log('After dispatch');
};

// Check Redux DevTools
// Verify reducer logic
```

#### Translation Not Working

```typescript
// Check i18n instance
console.log('Current language:', i18n.language);

// Verify translation key exists
console.log('Translation:', t('common.next'));

// Check locale file loading
```

#### Styling Issues

```typescript
// Use sx prop debugging
<Box sx={{
  border: '1px solid red',  // Visual debugging
  p: 2
}}>

// Check applied styles in browser DevTools
```

---

## Performance Guidelines

### Optimization Strategies

#### Component Optimization

```typescript
// Memoize expensive computations
const filteredItems = useMemo(() => {
  return items.filter(item => item.active);
}, [items]);

// Memoize callbacks
const handleClick = useCallback(() => {
  onItemClick(item);
}, [item, onItemClick]);
```

#### Bundle Optimization

```bash
# Analyze bundle size
npm run build

# Check output for bundle sizes
# dist/assets/index-xxx.js   XX kB
```

### Performance Targets

- **First Load**: < 3 seconds
- **Interaction**: < 100ms response
- **Animations**: 60 FPS
- **Bundle Size**: < 500 KB (total)

---

## Localization Development

### Adding New Translations

1. **Update locale files**

```json
// src/locales/en.json
{
  "newKey": "English text",
  "newSection": {
    "key": "Value"
  }
}

// src/locales/pl.json
{
  "newKey": "Polish text",
  "newSection": {
    "key": "Wartość"
  }
}
```

2. **Use in component**

```typescript
const { t } = useTranslation();
<h2>{t('newSection.key')}</h2>
```

3. **Test both languages**

```typescript
// Switch language and verify
// Check for missing translations
```

### Adding New Languages

1. **Create locale file**
```bash
# src/locales/fr.json
```

2. **Configure i18next**
```typescript
// src/i18n.ts
resources: {
  en: { translation: require('./locales/en.json') },
  pl: { translation: require('./locales/pl.json') },
  fr: { translation: require('./locales/fr.json') },
}
```

3. **Add language switcher option**
```typescript
// src/components/LanguageSwitcher.tsx
const languages = [
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polski' },
  { code: 'fr', name: 'Français' },
];
```

---

## Code Review Guidelines

### Review Checklist

When reviewing pull requests:

- [ ] Code follows TypeScript conventions
- [ ] Components are properly typed
- [ ] No console.logs in production code
- [ ] Translations added for all supported languages
- [ ] Responsive design maintained
- [ ] No accessibility regressions
- [ ] Performance considerations addressed
- [ ] Documentation updated if needed

### Providing Feedback

```markdown
## Code Review Feedback

### Issues
- [ ] Issue description

### Suggestions
- [ ] Suggestion for improvement

### Questions
- [ ] Clarification needed
```

---

## Troubleshooting

### Common Development Issues

#### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

#### Dependency Issues

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run type-check
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

### Community

- **GitHub Issues**: [Project Issues](https://github.com/BitLogicForge/ClarityAge/issues)
- **Discussions**: [GitHub Discussions](https://github.com/BitLogicForge/ClarityAge/discussions)

---

*Happy coding! Remember to test thoroughly and document your changes.*
