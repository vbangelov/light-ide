# Light IDE

A lightweight, modern IDE prototype built with [Vue 3](https://vuejs.org/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), [TailwindCSS](https://tailwindcss.com/), and [UI5 Web Components](https://sap.github.io/ui5-webcomponents/).

## Features

- **Vue 3 + Vite**: Fast, modern frontend stack.
- **TypeScript**: Type-safe codebase.
- **TailwindCSS**: Utility-first styling.
- **UI5 Web Components**: Enterprise-grade UI elements.
- **Dynamic Layouts**: Views and iframes loaded dynamically from configuration.
- **WebSocket RPC**: Real-time communication between IDE and embedded iframes.
- **Hot Reload**: Instant feedback during development.
- **Linting & Formatting**: ESLint and Prettier integration.
- **Unit Testing**: Powered by Vitest.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Install dependencies

```sh
npm install
```

### Start the development server (IDE + WebSocket backend)

```sh
npm run dev:ws
```

This will start both the Vite development server and the backend WebSocket server in parallel.

Open [http://localhost:10123](http://localhost:10123) in your browser.

### Build for production

```sh
npm run build
```

### Preview the production build

```sh
npm run preview
```

### Run tests

```sh
npm run test
```

### Lint and format code

```sh
npm run lint
npm run format:fix
```

### Clean build and coverage artifacts

```sh
npm run clean
```

### Run all checks (CI)

```sh
npm run ci
```

## Project Structure

```
src/
  assets/           # Static assets and HTML iframes
  components/       # Vue components (ViewManager, Header, etc.)
  router/           # Vue Router setup
  rpc/              # WebSocket RPC utilities
  types/            # TypeScript types
  views/            # Layout definitions for each IDE view
  main.ts           # App entry point
  style.css         # Global styles (TailwindCSS)
```

## Scripts

| Script            | Description                                   |
| ----------------- | --------------------------------------------- |
| `dev`             | Start Vite development server                 |
| `dev:ws`          | Start backend WebSocket server and dev server |
| `build`           | Build for production                          |
| `build-tsc`       | Type-check and build                          |
| `preview`         | Preview production build                      |
| `test`            | Run unit tests                                |
| `lint`            | Lint codebase                                 |
| `lint:fix`        | Lint and auto-fix                             |
| `lint:validate`   | Lint and fail on warnings                     |
| `format:fix`      | Format code with Prettier                     |
| `format:validate` | Check formatting with Prettier                |
| `clean`           | Remove build and coverage artifacts           |
| `ci`              | Run clean, format check, lint, and build      |

## Dependencies

- `vue`, `vue-router`
- `vite`
- `typescript`
- `tailwindcss`
- `@ui5/webcomponents`, `@ui5/webcomponents-fiori`, `@ui5/webcomponents-icons`
- `ws` (WebSocket server)
- `eslint`, `prettier`, `vitest`, `@vue/test-utils`, etc.

## License

This project is private and not licensed for redistribution.

---

**Happy coding!**
