# FinVision AI Architecture

## Overview
FinVision AI is a frontend-only Next.js 15 application using React 19 and Tailwind CSS v4.
It uses a highly specialized App Router structure to separate marketing, auth, and dashboard concerns.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **UI Component Library**: shadcn/ui (v4, @base-ui/react)
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Animations**: Framer Motion (micro-interactions) + GSAP (scroll) + React Three Fiber (3D)
- **State Management**: React `useState`/`useMemo` + local mock JSON (`db.json`)
- **Data Visualization**: Recharts

## Folder Structure
- `src/app/`: Next.js App Router (pages & layouts)
  - `(auth)/`: Authentication and onboarding flows
  - `dashboard/`: The main authenticated workspace
- `src/components/`: Reusable UI elements
  - `ui/`: shadcn primitives
  - `layout/`: Global layout components (Sidebar, Header, CommandPalette)
  - `dashboard/`: Specific widgets (NetWorthChart, AIInsightCard)
- `src/data/`: Mock data generators and JSON store

## Data Flow
Because this is a frontend-only competition app, data is provided by `src/data/mock/db.json` which contains 5 years of generated financial history, 500+ transactions, goals, and AI insights. The components import this directly and use `useMemo` to shape the data for Recharts or tables.
