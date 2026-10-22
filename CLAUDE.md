# CLAUDE.md

Guidance for Claude Code when working in this repository. Replace the placeholders below with details from your project.

## Project overview

- **What it is:** <one or two sentences describing the app or library>
- **Main stack:** <e.g. React 18, TypeScript, Vite, Node 20>
- **Entry point:** <e.g. `src/main.tsx`>

## Commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`
- Run tests: `npm test`
- Lint: `npm run lint`

Run lint and tests before reporting a task as done.

## Code layout

- `src/components/` - reusable UI components
- `src/features/` - feature modules, each with its own components, hooks, and tests
- `src/lib/` - shared utilities with no UI dependencies
- `tests/` - integration tests

## Coding conventions

- Use TypeScript; avoid `any`. Prefer explicit types on exported functions.
- Use function components and hooks. Do not add class components.
- Name components in PascalCase and files after the component they export.
- Match the surrounding code's style, naming, and comment density.
- Keep comments short and explain *why*, not *what*.
- Do not add a new dependency without saying why in the final summary.

## Testing

- Add or update tests for any behavior change.
- Prefer testing user-visible behavior over implementation details.
- Do not delete or skip failing tests to get a green run; report the failure instead.

## Git and pull requests

- Work on a feature branch; do not commit directly to `main`.
- Write commit messages in the imperative mood, e.g. `Add date picker validation`.
- Keep commits focused; one logical change per commit.

## Things to avoid

- Do not edit generated files in `dist/` or `build/`.
- Do not commit `.env` files or secrets. Use `.env.example` for documenting variables.
- Do not change the public API of `src/lib/` without flagging it in the summary.

## Notes for Claude

- Ask before making large refactors that touch more than one feature module.
- When unsure about a requirement, state the assumption you made in the final message.
