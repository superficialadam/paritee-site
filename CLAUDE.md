# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Paritee, a marketing network website with three prototype implementations. It's a Next.js 15 application built with TypeScript, showcasing different theme variations for a marketing agency network platform.

The site features a main landing page that links to three prototype versions (/v1, /v2, /v3), each representing a different visual theme while maintaining the same content structure and functionality.

## Architecture

### Core Structure
- **Next.js 15** with App Router architecture
- **TypeScript** for type safety
- **Tailwind CSS** for styling with custom CSS variables
- **shadcn/ui** component library integration (configured in components.json)
- **Framer Motion** for animations and transitions
- **GSAP** for advanced animations
- **Lucide React** for icons

### Directory Structure
- `src/app/` - Next.js App Router pages and layouts
  - `(prototypes)/` - Route group containing v1, v2, v3 prototype implementations
- `src/components/` - Reusable React components
  - `v2/` - V2-specific component variants
  - `v3/` - V3-specific component variants
- `src/data/` - TypeScript data files (services, agencies, cases, etc.)
- `src/lib/` - Utility functions and animations
- `public/images/` - Static image assets organized by section

### Component Patterns
- Components use TypeScript interfaces for props
- Framer Motion is used extensively for page transitions and animations
- Custom utility functions in `src/lib/utils.ts` for className merging (cn function)
- Components follow a consistent naming pattern and use Lucide React icons
- Each prototype version maintains its own component variants while sharing core data

### Data Management
Structured data is stored in TypeScript files in `src/data/`:
- `services.ts` - Service offerings with icons and descriptions
- `agencies.ts` - Partner agency information
- `cases.ts` - Case studies and portfolio items
- `news.ts` - News articles and updates
- `people.ts` - Team member profiles
- `sectors.ts` - Industry sectors served
- `geographies.ts` - Geographic coverage data

## Development Commands

- `npm run dev` - Start development server (use port 3001 if requested)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Development Notes

- Don't start the dev server automatically - user prefers manual control
- If asked to run the server, use port 3001: `npm run dev -- -p 3001`
- The project uses Tailwind CSS 4.x with CSS variables for theming
- Three prototype versions share components but have different styling approaches
- Images are organized in public/images/ by content section (hero, agencies, cases, etc.)