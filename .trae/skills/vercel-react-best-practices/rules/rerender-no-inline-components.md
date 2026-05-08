---
title: Don't Define Components Inside Components
impact: HIGH
impactDescription: Prevents remount on every render, destroys state and DOM
tags: rerender, performance, anti-pattern, components, state
---

## Don't Define Components Inside Components

Defining a component inside another component creates a new component type on every render. React sees a different component each time and fully remounts it, destroying all state and DOM.

A common reason developers do this is to access parent variables without passing props. Always pass props instead.

### Incorrect (remounts on every render):

```tsx
function UserProfile({ user, theme }) {
  // Defined inside to access `theme` - BAD
  const Avatar = () => (
    <img
      src={user.avatarUrl}
      className={theme === 'dark' ? 'avatar-dark' : 'avatar-light'}
    />
  )

  // Defined inside to access `user` - BAD
  const Stats = () => (
    <div>
      <span>{user.followers} followers</span>
      <span>{user.posts} posts</span>
    </div>
  )

  return (
    <div>
      <Avatar />
      <Stats />
    </div>
  )
}
```

Every time `UserProfile` renders, `Avatar` and `Stats` are new component types. React unmounts the old instances and mounts new ones, losing any internal state, running effects again, and recreating DOM nodes.

### Correct (pass props instead):

```tsx
function Avatar({ src, theme }: { src: string; theme: string }) {
  return (
    <img
      src={src}
      className={theme === 'dark' ? 'avatar-dark' : 'avatar-light'}
    />
  )
}

function Stats({ followers, posts }: { followers: number; posts: number }) {
  return (
    <div>
      <span>{followers} followers</span>
      <span>{posts} posts</span>
    </div>
  )
}

function UserProfile({ user, theme }) {
  return (
    <div>
      <Avatar src={user.avatarUrl} theme={theme} />
      <Stats followers={user.followers} posts={user.posts} />
    </div>
  )
}
```

### Symptoms of This Bug

If you see these symptoms, you likely have nested component definitions:

- **Input fields lose focus on every keystroke**
- **Animations restart unexpectedly**
- **`useEffect` cleanup/setup runs on every parent render**
- **Scroll position resets inside the component**
- **State resets unexpectedly**
- **Performance is extremely poor**

### Why This Happens

React uses component identity to determine:

1. **Whether to reuse or recreate state**: New component type = new state
2. **When to run effects**: Unmount old effects, mount new ones
3. **DOM reconciliation**: Destroy old DOM, create new DOM

When you define a component inside another:

```tsx
function Parent() {
  // Render 1: Avatar is function #12345
  const Avatar = () => <img />
  
  // Render 2: Avatar is function #67890 (NEW!)
  const Avatar = () => <img />
  
  // React sees different types → remounts everything
}
```

### Common Anti-Patterns to Avoid

#### 1. Accessing parent props directly

```tsx
// ❌ BAD
function List({ items }) {
  const ListItem = ({ index }) => (
    <li style={{ color: items[index].color }}>
      {items[index].name}
    </li>
  )
  
  return items.map((_, i) => <ListItem key={i} index={i} />)
}

// ✅ GOOD
function ListItem({ item }: { item: Item }) {
  return (
    <li style={{ color: item.color }}>{item.name}</li>
  )
}

function List({ items }: { items: Item[] }) {
  return items.map(item => <ListItem key={item.id} item={item} />)
}
```

#### 2. Using parent callbacks without prop drilling

```tsx
// ❌ BAD
function Form({ onSubmit }) {
  const SubmitButton = () => (
    <button onClick={onSubmit}>Submit</button>
  )
  
  return <SubmitButton />
}

// ✅ GOOD
interface SubmitButtonProps {
  onClick: () => void
}

function SubmitButton({ onClick }: SubmitButtonProps) {
  return <button onClick={onClick}>Submit</button>
}

function Form({ onSubmit }: { onSubmit: () => void }) {
  return <SubmitButton onClick={onSubmit} />
}
```

#### 3. Conditional component definitions

```tsx
// ❌ BAD
function Dashboard({ isAdmin }) {
  const AdminPanel = () => <div>Admin Controls</div>
  const UserPanel = () => <div>User View</div>
  
  return isAdmin ? <AdminPanel /> : <UserPanel />
}

// ✅ GOOD
function AdminPanel() {
  return <div>Admin Controls</div>
}

function UserPanel() {
  return <div>User View</div>
}

function Dashboard({ isAdmin }: { isAdmin: boolean }) {
  return isAdmin ? <AdminPanel /> : <UserPanel />
}
```

### When to Apply This Rule

- **Writing new React components or Next.js pages**
- **Reviewing code for performance issues**
- **Debugging unexpected state loss or effect re-runs**
- **Fixing input focus or scroll position bugs**

### Debugging Tips

If you suspect this issue:

1. **Check for inline component definitions:**

   ```bash
   grep -r "function.*(" src/ | grep -E "^\s*(const|let|var)\s+\w+\s*=\s*\("
   ```

2. **Use React DevTools:**

   - Open React DevTools
   - Select the problematic component
   - Check if it shows as "remounting" on every parent update
   - Look for components that lose state unexpectedly

3. **Add console.log to effects:**

   ```tsx
   useEffect(() => {
     console.log('Component mounted or remounted')
     return () => console.log('Component will unmount')
   }, [])
   ```
   
   If this logs frequently, you likely have nested definitions.

### Performance Impact

This anti-pattern causes:

- **Unnecessary DOM creation/destruction**: Expensive browser operations
- **Lost state**: All internal state resets on every render
- **Effect re-running**: Cleanup + setup on every parent render
- **Memory leaks**: Potential if cleanup is incomplete
- **Layout thrashing**: Browser must recalculate layout repeatedly

### Code Review Checklist

When reviewing code, check for:

- [ ] Are there function components defined inside other components?
- [ ] Do child components have stable identities across renders?
- [ ] Are props passed explicitly rather than accessed via closure?
- [ ] Do effects run more often than expected?
- [ ] Does input focus or scroll position reset unexpectedly?

### Related Rules

- [Extract to Memoized Components](./rules/rerender-memo.md) - Memoize expensive subtrees
- [Use useRef for Transient Values](./rules/rerender-use-ref-transient-values.md) - Stable references
- [Narrow Effect Dependencies](./rules/rerender-dependencies.md) - Minimize effect re-runs

### Reference

[React Docs: Reusing Logic](https://react.dev/learn/reusing-logic-with-custom-hooks)
