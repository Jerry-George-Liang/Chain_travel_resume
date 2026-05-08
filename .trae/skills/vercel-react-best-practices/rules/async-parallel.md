---
title: Promise.all() for Independent Operations
impact: CRITICAL
impactDescription: 2-10× improvement
tags: async, parallelization, promises, waterfalls
---

## Promise.all() for Independent Operations

When async operations have no interdependencies, execute them concurrently using `Promise.all()`.

**Incorrect (sequential execution, 3 round trips):**

```typescript
const user = await fetchUser()
const posts = await fetchPosts()
const comments = await fetchComments()
```

**Correct (parallel execution, 1 round trip):**

```typescript
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments()
])
```

### When to Apply This Rule

- **Writing new React components or Next.js pages**
- **Implementing data fetching (client or server-side)**
- **Reviewing code for performance issues**
- **Refactoring existing React/Next.js code**

### Impact Metrics

- **Performance improvement**: 2-10× faster execution
- **Network requests**: Reduces multiple sequential requests to parallel execution
- **User experience**: Significantly faster initial page load and data fetching

### Common Patterns to Avoid

1. **Sequential API calls in useEffect:**

   ```tsx
   // ❌ Bad - Sequential calls
   useEffect(() => {
     const fetchData = async () => {
       const user = await fetchUser()
       const posts = await fetchPosts(user.id)
       const comments = await fetchComments(posts.map(p => p.id))
       setData({ user, posts, comments })
     }
     fetchData()
   }, [])
   
   // ✅ Good - Parallel where possible
   useEffect(() => {
     const fetchData = async () => {
       const [user, posts] = await Promise.all([fetchUser(), fetchPosts()])
       const comments = await Promise.all(
         posts.map(p => fetchComments(p.id))
       )
       setData({ user, posts, comments })
     }
     fetchData()
   }, [])
   ```

2. **Server Components with waterfalls:**

   ```tsx
   // ❌ Bad - Sequential data fetching
   export default async function Page() {
     const config = await getConfig()
     const user = await getUser(config.userId)
     const posts = await getPosts(user.id)
     return <PageComponent config={config} user={user} posts={posts} />
   }
   
   // ✅ Good - Parallel independent fetches
   export default async function Page() {
     const [config, initialPosts] = await Promise.all([
       getConfig(),
       getPosts() // If posts don't depend on config
     ])
     const user = await getUser(config.userId) // Only if depends on config
     return <PageComponent config={config} user={user} posts={initialPosts} />
   }
   ```

### Advanced Pattern: Dependency-Based Parallelization

For operations with partial dependencies, use manual promise chaining:

```typescript
// Start independent operations immediately
const userPromise = fetchUser()
const configPromise = fetchConfig()

// Chain dependent operation after first resolves
const postsPromise = userPromise.then(user => 
  fetchPosts(user.id)
)

// Wait for all to complete
const [user, config, posts] = await Promise.all([
  userPromise,
  configPromise,
  postsPromise
])
```

### Integration with React/Next.js

In Next.js Server Components, this pattern is especially valuable:

```tsx
// app/page.tsx
async function Header() {
  const navItems = await fetchNavItems()
  return <HeaderComponent items={navItems} />
}

async function MainContent() {
  const [articles, sidebarData] = await Promise.all([
    fetchArticles(),
    fetchSidebarData()
  ])
  return (
    <main>
      <ArticleList articles={articles} />
      <Sidebar data={sidebarData} />
    </main>
  )
}

export default function Page() {
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
    </>
  )
}
```

### Related Rules

- [Defer Await Until Needed](./rules/async-defer-await.md) - Move await into branches
- [Prevent Waterfall Chains in API Routes](./rules/async-api-routes.md) - Start promises early
- [Strategic Suspense Boundaries](./rules/async-suspense-boundaries.md) - Use Suspense for streaming

### Code Review Checklist

When reviewing code, check for:

- [ ] Are there sequential `await` calls that could be parallelized?
- [ ] Can independent API calls be wrapped in `Promise.all()`?
- [ ] Are Server Components structured to enable parallel data fetching?
- [ ] Is there unnecessary blocking of UI due to sequential async operations?

### Performance Monitoring

Monitor these metrics to identify opportunities:

1. **Network waterfall**: Check browser DevTools Network tab for sequential requests
2. **Time to First Byte (TTFB)**: Server-side parallelization reduces TTFB
3. **Time to Interactive (TTI)**: Client-side parallelization improves TTI
4. **React Profiler**: Look for wasted time in rendering due to late data availability
