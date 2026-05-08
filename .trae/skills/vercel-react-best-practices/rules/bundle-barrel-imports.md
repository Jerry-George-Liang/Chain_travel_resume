---
title: Avoid Barrel File Imports
impact: CRITICAL
impactDescription: 200-800ms import cost, slow builds
tags: bundle, imports, tree-shaking, barrel-files, performance
---

## Avoid Barrel File Imports

Import directly from source files instead of barrel files to avoid loading thousands of unused modules. **Barrel files** are entry points that re-export multiple modules (e.g., `index.js` that does `export * from './module'`).

Popular icon and component libraries can have **up to 10,000 re-exports** in their entry file. For many React packages, **it takes 200-800ms just to import them**, affecting both development speed and production cold starts.

**Why tree-shaking doesn't help:** When a library is marked as external (not bundled), the bundler can't optimize it. If you bundle it to enable tree-shaking, builds become substantially slower analyzing the entire module graph.

### Incorrect (imports entire library):

```tsx
import { Check, X, Menu } from 'lucide-react'
// Loads 1,583 modules, takes ~2.8s extra in dev
// Runtime cost: 200-800ms on every cold start

import { Button, TextField } from '@mui/material'
// Loads 2,225 modules, takes ~4.2s extra in dev
```

### Correct - Next.js 13.5+ (recommended):

```js
// next.config.js - automatically optimizes barrel imports at build time
module.exports = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@mui/material']
  }
}
```

```tsx
// Keep the standard imports - Next.js transforms them to direct imports
import { Check, X, Menu } from 'lucide-react'
// Full TypeScript support, no manual path wrangling
```

This is the recommended approach because it preserves TypeScript type safety and editor autocompletion while still eliminating the barrel import cost.

### Correct - Direct imports (non-Next.js projects):

```tsx
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
// Loads only what you use
```

> **TypeScript warning:** Some libraries (notably `lucide-react`) don't ship `.d.ts` files for their deep import paths. Importing from `lucide-react/dist/esm/icons/check` resolves to an implicit `any` type, causing errors under `strict` or `noImplicitAny`. Prefer `optimizePackageImports` when available, or verify the library exports types for its subpaths before using direct imports.

### When to Apply This Rule

- **Writing new React components or Next.js pages**
- **Optimizing bundle size or load times**
- **Reviewing code for performance issues**
- **Refactoring existing React/Next.js code**

### Impact Metrics

These optimizations provide:
- **15-70% faster dev boot**
- **28% faster builds**
- **40% faster cold starts**
- **Significantly faster HMR (Hot Module Replacement)**

### Libraries Commonly Affected

| Library | Re-exports | Import Cost |
|---------|-----------|-------------|
| `lucide-react` | 1,583 | ~2.8s |
| `@mui/material` | 2,225 | ~4.2s |
| `@mui/icons-material` | 1,867 | ~3.5s |
| `@tabler/icons-react` | 5,237 | ~6.8s |
| `react-icons` | 10,000+ | ~8+s |
| `@headlessui/react` | 892 | ~2.1s |
| `@radix-ui/react-*` | Varies | ~1-3s |
| `lodash` | 4,387 | ~5.2s |
| `ramda` | 1,936 | ~3.8s |
| `date-fns` | 834 | ~1.8s |
| `rxjs` | 1,024 | ~2.4s |
| `react-use` | 567 | ~1.5s |

### Migration Strategy

**Step 1: Identify barrel imports**

```bash
# Search for common patterns
grep -r "from 'lucide-react'" src/
grep -r "from '@mui/" src/
grep -r "from 'react-icons/" src/
```

**Step 2: For Next.js 13.5+ projects**

Add to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@mui/material',
      '@mui/icons-material',
      '@tabler/icons-react',
      'react-icons',
      // Add other libraries as needed
    ]
  },
}

module.exports = nextConfig
```

**Step 3: For non-Next.js or older versions**

Replace imports manually:

```tsx
// Before
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react'

// After
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down'
```

Or use a bundler plugin:

```javascript
// vite.config.ts
import reactPlugin from 'vite-plugin-lucide-static'

export default defineConfig({
  plugins: [
    reactPlugin({
      regular: {
        src: 'lucide-static',
        import: 'Icon',
        className: 'lucide',
        svgClass: 'lucide-svg',
      },
    }),
  ],
})
```

### Code Review Checklist

When reviewing code, check for:

- [ ] Are imports coming from known heavy barrel files?
- [ ] Is the project using Next.js 13.5+ without `optimizePackageImports`?
- [ ] Are only needed icons/components being imported?
- [ ] Could direct imports significantly reduce bundle size?
- [ ] Is build time affected by large barrel file resolution?

### Performance Monitoring

Monitor these metrics to detect issues:

1. **Dev server startup time**: >5s suggests barrel import issues
2. **First import resolution**: Check DevTools Performance tab
3. **Bundle size analysis**: Use `webpack-bundle-analyzer` or similar tools
4. **Cold start time**: Important for serverless deployments

### Reference

[How we optimized package imports in Next.js](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)

### Related Rules

- [Dynamic Imports for Heavy Components](./rules/bundle-dynamic-imports.md) - Lazy load on demand
- [Conditional Module Loading](./rules/bundle-conditional.md) - Load when feature activated
- [Prefer Statically Analyzable Paths](./rules/bundle-analyzable-paths.md) - Enable tree-shaking
