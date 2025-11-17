# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a monorepo containing Firebase JavaScript SDK quickstart samples demonstrating various Firebase features. Each subdirectory is an independent sample application showcasing specific Firebase services.

## Project Structure

The repository uses **Lerna** for monorepo management with the following structure:

- **`auth/`** - Firebase Authentication examples (email/password, OAuth providers, phone auth, anonymous, custom auth)
  - Standalone HTML/TypeScript examples for each auth method
  - Chrome extension example in `chromextension/`
  - Each `.html` file is a self-contained demo

- **`database/`** - Firebase Realtime Database example (social blogging app)

- **`firestore/`** - Firestore example (FriendlyEats restaurant rating app)
  - Built with **Angular 16**
  - Includes Cloud Functions in `functions/` subdirectory
  - Contains emulator seed data in `app-data-seed/`

- **`dataconnect/`** - Firebase Data Connect example
  - Full-stack app in `app/` subdirectory
  - Schema and queries in `dataconnect/` subdirectory

- **`functions/`** - Cloud Functions example demonstrating callable functions

- **`storage/`** - Firebase Storage file upload/download example

- **`messaging/`** - Firebase Cloud Messaging notifications example

- **`remote-config/`** - Remote Config example

- **`ai/ai-react-app/`** - Firebase AI integration with React

## Common Development Commands

### Initial Setup

```bash
# Install root dependencies
npm install

# Bootstrap all sub-packages using Lerna
npm run bootstrap
```

### Testing and Linting

```bash
# Run linting across all JavaScript files (excludes node_modules, dataconnect-sdk, ai-react-app)
npm test
# OR
scripts/test.sh
```

### Working with Individual Samples

Most samples follow this pattern:

```bash
cd <sample-directory>  # e.g., cd auth

# Install dependencies
npm install

# Development with local emulators
npm run dev           # Starts Vite dev server on localhost:5173

# Production build
npm run build         # Builds using Vite

# Run with Firebase emulators
firebase emulators:start
```

### Firestore-Specific Commands

The Firestore sample has additional commands:

```bash
cd firestore

# Start development with emulators (auto-imports seed data)
npm start

# Build Cloud Functions before running
npm run pre-build     # Equivalent to: (cd functions && npm run build)

# Populate emulators with data
npm run populate-emulators

# Deploy to production
npm run production
```

### Functions-Specific Commands

```bash
cd functions

# Build backend functions
npm run build         # Runs: npm --prefix functions run build && cd public && vite build
```

### Data Connect Commands

```bash
cd dataconnect

# Install VS Code extension for Firebase DataConnect
# Use VS Code extension to start emulators and run .gql files
```

## Configuration Requirements

Each sample requires Firebase project configuration:

1. **Create Firebase project** at [Firebase Console](https://console.firebase.google.com)
2. **Copy Firebase config object** from "Add Firebase to your web app" dialog
3. **Paste into `config.ts`** in the relevant sample directory (e.g., `auth/config.ts`, `database/scripts/config.ts`)

Config file locations:
- `auth/config.ts`
- `database/scripts/config.ts`
- `storage/config.ts`
- `messaging/config.ts`
- `remote-config/config.ts`
- `functions/public/scripts/config.ts`

For Firestore, configuration is in `src/environments/`:
- `environment.default.ts` (for emulators)
- `environment.prod.ts` (for production)

## Code Style Requirements

The repository follows **Google JavaScript Style Guide** with these ESLint rules:

- **Indentation**: 2 spaces
- **Quotes**: Single quotes
- **Semicolons**: Required
- **Line breaks**: Unix (LF)
- **Curly braces**: Required for all control structures
- **`this` alias**: Use `that` consistently

ESLint configuration in `.eslintrc.json` applies to all JavaScript files.

## Firebase Emulator Usage

Most samples support Firebase Local Emulator Suite for local development:

```bash
# Start emulators (varies by sample)
firebase emulators:start

# With import/export of data
firebase emulators:start --import ./app-data-seed

# With UI
firebase emulators:start --ui
```

**Note**: Phone authentication requires ReCaptcha verification, which doesn't work with emulators. Phone auth samples skip emulator connection.

## Node and NPM Version Requirements

- **Node.js**: >=18.0.0 <=20.0.0
- **npm**: >=9.0.0 <10.0.0

## Architecture Notes

### Auth Sample
- Each authentication method is in a separate HTML file with corresponding TypeScript
- All examples share the same `config.ts` for Firebase initialization
- Chrome extension example demonstrates manifest v3 auth flow

### Firestore Sample (FriendlyEats)
- **Framework**: Angular 16 with Angular Material
- **State Management**: RxJS observables
- **Routing**: Angular Router
- **Components**: Modular structure in `src/app/`
  - `homepage/` - Restaurant listings and filtering
  - `restaurant-page/` - Individual restaurant details
  - `review-list/` - Display reviews
  - `submit-review-modal/` - Review submission
  - `filter-dialog/` - Filter restaurants
  - `sign-in-modal/` - Authentication
- **Cloud Functions**: TypeScript functions in `functions/src/`
  - Must run `npm run build` in `functions/` after modifying to compile TypeScript

### Data Connect Sample
- **Backend**: GraphQL schema and queries in `dataconnect/` directory
- **Frontend**: React app in `app/` directory
- Requires VS Code extension for development workflow
- Uses Cloud SQL for database (requires Blaze plan)

## CI/CD

GitHub Actions workflow (`.github/workflows/test.yml`):
- Runs on pull requests and pushes
- Tests on Node.js 18.x
- Executes: `npm ci` → `npm run bootstrap` → `npm test`

## TypeScript Configuration

Root `tsconfig.json` with ES2017 target, browser environment.
Individual samples may have their own TypeScript configurations.
