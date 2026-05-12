# ClarityAge AI Coding Agent Instructions

## Project Summary & Philosophy

ClarityAge is a React 19 + TypeScript SPA for philosophical self-reflection, featuring a dynamic questionnaire, progress tracking, multilingual support, and a modern, accessible UI. All data is local—no backend.

**Elevator Pitch:**
A thoughtful interactive questionnaire exploring philosophical perspectives and personal values, helping users reflect on life approaches and meaning through curated questions and wisdom from notable thinkers.

**Target Audience:**
Thoughtful individuals seeking personal growth and self-reflection, especially those around age 40 or experiencing life transitions.

**Core Problems Solved:**

- Lack of structured tools for meaningful self-reflection
- Difficulty accessing philosophical wisdom in an engaging format
- Need for a multilingual, accessible platform
- Absence of interactive tools combining philosophy and introspection

## Project Overview

ClarityAge is a React 19 + TypeScript SPA for philosophical self-reflection, featuring a dynamic questionnaire, progress tracking, multilingual support, and a modern, accessible UI. All data is local—no backend.

## Architecture & Data Flow

## Design Principles & UI Guidelines

## Features & Priorities

## Developer Workflows & Good Practices

### Development Awareness & Workflow (see `src/docs/AI_GUIDELINES.md`)

- Review planning docs before starting work
- Align tasks with tracking docs (add/update as needed)
- Adhere to naming, structure, and architectural patterns
- Use project-specified environment/tooling
- Mark task completion and log blockers/discoveries

### Code Quality & Modularity

- Keep files focused (<500 lines); refactor as needed
- Organize by feature/responsibility/layer
- Use clear, consistent imports
- Avoid hardcoding sensitive info; use config files
- Mind performance; comment on trade-offs

### Testing & Reliability

- Create/update unit tests for all features
- Store tests in `tests/` mirroring app structure
- Cover expected, edge, and failure cases

### Security & Compliance

- Sanitize/validate all inputs
- Never commit secrets; use env/config
- Audit dependencies for vulnerabilities

### Style & Documentation

- Use TypeScript for all code
- Follow Prettier/ESLint configs
- Document public functions/classes
- Update README and docs for new features/changes
- Comment complex logic and explain reasoning

### Core Behavioral Rules

- Clarify ambiguity before proceeding
- Only use verified dependencies
- Confirm file paths/modules before referencing
- Preserve existing code unless refactoring/removal is explicit

### MVP Features

- Curated philosophical questionnaire
- Progress indicators (circular, animated)
- Multilingual support (EN, PL)
- Light/dark theme switching
- Responsive, modern UI
- Quote display with attribution
- Local state management and persistence
- Results summary and review
- Contact/feedback modal

### Future Features

- Save favorite questions/quotes
- Multiple question sets/themes
- Track answers over time
- Export responses
- Personalization and customization
- Community/social features
- Accessibility enhancements (audio, screen reader)
- Analytics and insights

See `src/docs/features.md` for full feature roadmap and priorities.

### Visual Personality & Philosophy

- Contemplative Minimalism: Clean, uncluttered interfaces for deep thought
- Purposeful Elegance: Every element facilitates reflection
- Accessible Wisdom: Intuitive design for all backgrounds
- Emotional Resonance: Visuals evoke contemplation and growth

### Color Palette & Typography

- Primary: #1976D2 (blue), #7B1FA2 (purple), #2E7D32 (green), #F57F17 (amber), #C62828 (red)
- Neutral: #FAFAFA/#121212 backgrounds, #212121/#FFFFFF text
- Font: Roboto (UI), Roboto Slab (quotes)

### Layout & Accessibility

- Responsive 12-column grid (MUI)
- Mobile-first, touch-friendly, progressive enhancement
- All text meets WCAG 2.1 AA contrast
- Keyboard navigation, ARIA labels, focus indicators

### Component Hierarchy

See `src/docs/design.md` for full hierarchy. Key components: ThemeProvider, Header, LanguageSwitcher, EnhancedProgressBar, QuestionCard, QuoteBox, RadioAnswers, ActionButtons, ResultsDisplay, NotificationProvider, QuestionList.

**Main entry:** `src/App.tsx` wraps ThemeProvider, NotificationProvider, Header, ProgressBar, QuestionList, ResultsDisplay.
**Questions:** Defined in `src/config/base.ts`, localized in `src/locales/*.json` (e.g., `new_q.json`). Quotes are displayed with each question, sourced from config/locales, with attribution.
**State:** Redux Toolkit slices in `src/store/` (`questionsSlice.ts`, `store.ts`). Answers, progress, and UI state are global; form/animation states are local. All data is persisted locally (Redux + localStorage).
**UI:** Material-UI (MUI) components, custom theming via Emotion in `ThemeProvider.tsx`. Design follows principles of contemplative minimalism, purposeful elegance, and accessible wisdom. See Design section below.
**Internationalization:** i18next config in `src/i18n.ts`, translations in `src/locales/`. Auto-detect browser language; add new languages by updating locales and config.
**Animations:** Framer Motion for progress and transitions. Use smooth, purposeful micro-interactions and transitions for progress, navigation, and feedback.

## Developer Workflows

- **Start dev server:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint` or `npm run lint:fix`
- **Format:** `npm run format`
- **Deploy:** `npm run deploy` (GitHub Pages)
- **Tests:** Place in `tests/` using Jest + Testing Library; see `src/docs/implementation.md` for structure and examples.

## Key Patterns & Conventions

- **Component structure:** All UI logic in `src/components/`. Use functional components and React hooks. Keep components focused and reusable.
- **State access:** Use `useAppSelector`/`useAppDispatch` from `store/hooks.ts` for Redux state. Avoid direct use of `useSelector`/`useDispatch`.
- **Questionnaire logic:** Questions are rendered from config/locales; answers stored in Redux. Use translation keys for all text.
- **Progress:** Use `EnhancedProgressBar.tsx` for circular progress with Framer Motion animation.
- **Theme/Language:** Switchers in `Header.tsx` and `LanguageSwitcher.tsx`. Theme is managed globally via Redux and Emotion.
- **Persistence:** All data is local (Redux + localStorage). No backend calls.
- **Translations:** Add new languages by updating `src/locales/` and `i18n.ts`. Use translation keys, not hardcoded text.
- **Customizations:**
  - Questions: `src/config/base.ts`
  - Translations: `src/locales/`
  - Theme: `ThemeProvider.tsx`

## Integration Points

- **Material-UI:** All UI components use MUI. Extend with Emotion for custom theming.
- **i18next:** Use translation keys from locale files for all user-facing text.
- **Framer Motion:** Use for animated progress and transitions. See `EnhancedProgressBar.tsx` for best practice.

## Good Practices

- **Type Safety:** Use TypeScript interfaces/types for all props, Redux state, and config objects. See `src/config/base.ts` and `store/questionsSlice.ts` for examples.
- **Separation of Concerns:** Keep business logic in Redux slices and hooks, not in UI components.
- **Accessibility:** Use semantic HTML and MUI accessibility props. Ensure keyboard navigation and screen reader support for all interactive elements.
- **Testing:** Place unit and integration tests in `tests/`. Use Testing Library for UI, and mock Redux state as needed. See `src/docs/implementation.md` for test structure.
- **Linting/Formatting:** Run `npm run lint` and `npm run format` before commits. Use Prettier and ESLint configs as defined in the repo.
- **Error Handling:** Handle all user input and state transitions gracefully. Use Redux state for error flags and display user-friendly messages via NotificationProvider.
- **Performance:** Use React.memo and useMemo for expensive calculations. Lazy-load large components (e.g., ResultsDisplay) with React.lazy.
- **Documentation:** Update `src/docs/implementation.md` and this file as the codebase evolves. Document new patterns and architectural changes.

## Example: Adding a Question

1. Add question to `src/config/base.ts` and update `src/locales/en.json`/`pl.json`.
2. Ensure Redux slice (`questionsSlice.ts`) supports new question structure.
3. UI auto-renders new questions via `QuestionList.tsx`.
4. Add tests for new question logic in `tests/components/QuestionList.test.tsx`.

## References

- See `src/docs/implementation.md` for architecture, state, and testing details.
- See `README.md` for setup and customization.

---

_Keep instructions concise, actionable, and project-specific. Update this file as the codebase evolves._

## Success Metrics

- Questionnaire completion rate >70%
- User returns to review results >30%
- App loads <3s across devices
- Low bounce rate on initial question <20%

## References & Further Reading

- See `src/docs/base.md` for project concept and goals
- See `src/docs/design.md` for design system and UI guidelines
- See `src/docs/features.md` for feature roadmap and priorities
- See `src/docs/AI_GUIDELINES.md` for development workflow and behavioral rules
- See `src/docs/implementation.md` for architecture, state, and testing details
- See `README.md` for setup and customization
