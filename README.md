# 🏐 Volley App

A map-based app for finding and organizing volleyball games/courts, with user accounts.

![Volley App screenshot](docs/screenshot.png)

## Features

- 🗺️ **Interactive map** — Google Maps view (`@react-google-maps/api`) with volleyball-icon markers pulled from Firestore
- 🔐 **Authentication** — email/password auth with login, sign-up, and protected routes (`Auth/`, `ProtectedRoute`)
- 👤 **User profiles** — a `/praktisk` profile page for account details
- 🔥 **Firebase-backed** — Firestore for data and Firebase Storage for assets
- 📱 **PWA-ready** — ships with Workbox service worker packages for offline/installable support

## Installation

```bash
git clone <this repo>
cd volley-app
npm install
```

You'll need Firebase project credentials configured in `src/firebase.js` (or via environment variables) for Auth, Firestore, and Storage to work.

## Usage

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000). `/` is the home feed (requires login), `/map` shows nearby games/courts, `/login` and `/signup` handle auth.

## Built with

- [React](https://reactjs.org/) 18 (Create React App)
- React Router
- Firebase (Auth, Firestore, Storage)
- Google Maps JavaScript API

## Status

🔧 Was broken — `npm install` failed with an ERESOLVE conflict because the unused, dead dependency `react-google-maps@9.4.5` (only peer-compatible with React 15/16) clashed with `react@18`; the app actually uses the modern `@react-google-maps/api` instead, so `react-google-maps` was removed from `package.json`. Also hit a known CRA5/ESLint 8.57 incompatibility (`eslint-plugin-jest` crashes with "Cannot read properties of undefined (reading 'Any')"); worked around with `DISABLE_ESLINT_PLUGIN=true npm run build`. With those in place, `npm install && DISABLE_ESLINT_PLUGIN=true npm run build` verified working as of 2026-09-03 (no Firebase credentials needed for a build). Functional prototype — core map, auth, and data flows are wired up, but there's no test coverage beyond the CRA defaults and no CI/deployment config checked in.
