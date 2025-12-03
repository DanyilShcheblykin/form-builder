# Form Builder

A Next.js application built with TypeScript and SCSS modules.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
form-builder/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   ├── globals.scss       # Global styles
│   └── page.module.scss   # Page-specific styles (SCSS module)
├── components/            # Reusable components
│   └── Button/
│       ├── Button.tsx     # Button component
│       └── Button.module.scss  # Button styles (SCSS module)
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript support
- ✅ SCSS Modules for component-scoped styles
- ✅ Modern, responsive design

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

