# Vercel React Best Practices

Comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel. Contains 70 rules across 8 categories, prioritized by impact to guide automated refactoring and code generation.

## When to Apply

Reference these guidelines when:

- Writing new React components or Next.js pages

- Implementing data fetching (client or server-side)

- Reviewing code for performance issues

- Refactoring existing React/Next.js code

- Optimizing bundle size or load times

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|---|---|---|---|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

## Quick Reference

### 1. Eliminating Waterfalls (CRITICAL)

- `async-cheap-condition-before-await` - Check cheap sync conditions before awaiting flags or remote values

- `async-defer-await` - Move await into branches where actually used

- `async-parallel` - Use Promise.all() for independent operations

- `async-dependencies` - Use better-all for partial dependencies

- `async-api-routes` - Start promises early, await late in API routes

- `async-suspense-boundaries` - Use Suspense to stream content

### 2. Bundle Size Optimization (CRITICAL)

- `bundle-barrel-imports` - Import directly, avoid barrel files

- `bundle-analyzable-paths` - Prefer statically analyzable import and file-system paths to avoid broad bundles and traces

- `bundle-dynamic-imports` - Use next/dynamic for heavy components

- `bundle-defer-third-party` - Load analytics/logging after hydration

- `bundle-conditional` - Load modules only when feature is activated

- `bundle-preload` - Preload on hover/focus for perceived speed

### 3. Server-Side Performance (HIGH)

- `server-auth-actions` - Authenticate server actions like API routes

- `server-cache-react` - Use React.cache() for per-request deduplication

- `server-cache-lru` - Use LRU cache for cross-request caching

- `server-dedup-props` - Avoid duplicate serialization in RSC props

- `server-hoist-static-io` - Hoist static I/O (fonts, logos) to module level

- `server-no-shared-module-state` - Avoid module-level mutable request state in RSC/SSR

- `server-serialization` - Minimize data passed to client components

- `server-parallel-fetching` - Restructure components to parallelize fetches

- `server-parallel-nested-fetching` - Chain nested fetches per item in Promise.all

- `server-after-nonblocking` - Use after() for non-blocking operations

### 4. Client-Side Data Fetching (MEDIUM-HIGH)

- `client-swr-dedup` - Use SWR for automatic request deduplication

- `client-event-listeners` - Deduplicate global event listeners

- `client-passive-event-listeners` - Use passive listeners for scroll

- `client-localstorage-schema` - Version and minimize localStorage data

### 5. Re-render Optimization (MEDIUM)

- `rerender-defer-reads` - Don't subscribe to state only used in callbacks

- `rerender-memo` - Extract expensive work into memoized components

- `rerender-memo-with-default-value` - Hoist default non-primitive props

- `rerender-dependencies` - Use primitive dependencies in effects

- `rerender-derived-state` - Subscribe to derived booleans, not raw values

- `rerender-derived-state-no-effect` - Derive state during render, not effects

- `rerender-functional-setstate` - Use functional setState for stable callbacks

- `rerender-lazy-state-init` - Pass function to useState for expensive values

- `rerender-simple-expression-in-memo` - Avoid memo for simple primitives

- `rerender-split-combined-hooks` - Split hooks with independent dependencies

- `rerender-move-effect-to-event` - Put interaction logic in event handlers

- `rerender-transitions` - Use startTransition for non-urgent updates

- `rerender-use-deferred-value` - Defer expensive renders to keep input responsive

- `rerender-use-ref-transient-values` - Use refs for transient frequent values

- `rerender-no-inline-components` - Don't define components inside components

### 6. Rendering Performance (MEDIUM)

- `rendering-animate-svg-wrapper` - Animate div wrapper, not SVG element

- `rendering-content-visibility` - Use content-visibility for long lists

- `rendering-hoist-jsx` - Extract static JSX outside components

- `rendering-svg-precision` - Reduce SVG coordinate precision

- `rendering-hydration-no-flicker` - Use inline script for client-only data

- `rendering-hydration-suppress-warning` - Suppress expected mismatches

- `rendering-activity` - Use Activity component for show/hide

- `rendering-conditional-render` - Use ternary, not && for conditionals

- `rendering-usetransition-loading` - Prefer useTransition for loading state

- `rendering-resource-hints` - Use React DOM resource hints for preloading

- `rendering-script-defer-async` - Use defer or async on script tags

### 7. JavaScript Performance (LOW-MEDIUM)

- `js-batch-dom-css` - Group CSS changes via classes or cssText

- `js-index-maps` - Build Map for repeated lookups

- `js-cache-property-access` - Cache object properties in loops

- `js-cache-function-results` - Cache function results in module-level Map

- `js-cache-storage` - Cache localStorage/sessionStorage reads

- `js-combine-iterations` - Combine multiple filter/map into one loop

- `js-length-check-first` - Check array length before expensive comparison

- `js-early-exit` - Return early from functions

- `js-hoist-regexp` - Hoist RegExp creation outside loops

- `js-min-max-loop` - Use loop for min/max instead of sort

- `js-set-map-lookups` - Use Set/Map for O(1) lookups

- `js-tosorted-immutable` - Use toSorted() for immutability

- `js-flatmap-filter` - Use flatMap to map and filter in one pass

- `js-request-idle-callback` - Defer non-critical work to browser idle time

### 8. Advanced Patterns (LOW)

- `advanced-effect-event-deps` - Don't put `useEffectEvent` results in effect deps

- `advanced-event-handler-refs` - Store event handlers in refs

- `advanced-init-once` - Initialize app once per app load

- `advanced-use-latest` - useLatest for stable callback refs

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/async-parallel.md
rules/bundle-barrel-imports.md
```

Each rule file contains:

- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references

## Auto-Invocation Triggers

This skill should be **automatically invoked** by Trae when detecting any of the following scenarios:

### 🎯 Automatic Detection Patterns

**When Trae encounters these situations, immediately apply relevant rules:**

1. **Writing/Modifying React Components:**
   - Creating new components → Check [Don't Define Components Inside Components](./rules/rerender-no-inline-components.md)
   - Using `useState` + `useEffect` for derived state → Check [Calculate Derived State During Rendering](./rules/rerender-derived-state-no-effect.md)
   - Passing callbacks as props → Check [Use Functional setState Updates](./rules/rerender-functional-setstate.md)

2. **Data Fetching Operations:**
   - Multiple sequential `await` calls → Apply [Promise.all() for Independent Operations](./rules/async-parallel.md)
   - Importing from libraries like `lucide-react`, `@mui/material`, `react-icons` → Apply [Avoid Barrel File Imports](./rules/bundle-barrel-imports.md)
   - Using `useEffect` for data fetching → Check [Use SWR for Automatic Deduplication](./rules/client-swr-dedup.md)

3. **Performance Issues Detected:**
   - Slow initial load times → Review [Bundle Size Optimization](#2-bundle-size-optimization) rules
   - UI feels unresponsive during updates → Apply [Use Transitions for Non-Urgent Updates](./rules/rerender-transitions.md)
   - Input lag during search/filtering → Use [useDeferredValue](./rules/rerender-use-deferred-value.md)

4. **Code Review Scenarios:**
   - Seeing `useMemo` wrapping simple expressions → Flag [Do not wrap simple expressions in useMemo](./rules/rerender-simple-expression-in-memo.md)
   - Components defined inside other components → Alert on [No Inline Components](./rules/rerender-no-inline-components.md)
   - `.sort()` called on props/state arrays → Suggest [Use toSorted() Instead of sort()](./rules/js-tosorted-immutable.md)

5. **Server-Side Code (Next.js):**
   - Server Actions without auth checks → Enforce [Authenticate Server Actions](./rules/server-auth-actions.md)
   - Sequential fetches in Server Components → Restructure for [Parallel Data Fetching](./rules/server-parallel-fetching.md)
   - Large data passed to client components → Apply [Minimize Serialization at RSC Boundaries](./rules/server-serialization.md)

### 🔍 Priority-Based Application Order

When multiple rules apply, follow this priority order:

1. **CRITICAL** (Fix first):
   - Waterfall elimination (`async-*`)
   - Bundle size optimization (`bundle-*`)

2. **HIGH**:
   - Server-side performance (`server-*`)
   - Component anti-patterns (`rerender-no-inline-components`)

3. **MEDIUM-HIGH**:
   - Client data fetching (`client-*`)
   - Re-render optimization (`rerender-*`)

4. **MEDIUM**:
   - Rendering performance (`rendering-*`)
   - JavaScript optimization (`js-*`)

5. **LOW**:
   - Advanced patterns (`advanced-*`)

### 📋 Integration with Coding Principles

When applying these rules, **always follow** the coding principles from [.trae/rules/coding-principles.md](../../rules/coding-principles.md):

- **Prefer adding new methods/functions** over modifying existing logic
- **Minimize changes** - use smallest possible diff
- **Only modify when necessary** (bug fixes or unavoidable business logic changes)
- **Document reasons** when modifications are required

### 🚀 Quick Reference Commands

For common tasks, use these command templates:

```bash
# Analyze component for performance issues
"Review this component against vercel-react-best-practices rules"

# Optimize data fetching pattern
"Apply async-parallel rule to this data fetching code"

# Fix bundle import issues
"Check and fix barrel file imports in this file"

# Audit server components
"Review this server component for server-side performance issues"
```

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
