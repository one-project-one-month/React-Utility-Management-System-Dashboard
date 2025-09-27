# Contributing Guidelines

Thank you for contributing to this project! Please follow the rules below to keep our codebase clean, consistent, and easy to maintain.

---

## 🚀 Branch Naming

- Use the following format for branch names:
**Examples:**
- `feature/add-authentication`
- `feature/update-user-profile`

---

## 📝 Git Commit Messages

We follow the **conventional commit** style for consistency:

- `feat:` → For new features  
- `fix:` → For bug fixes  
- `docs:` → For documentation changes  
- `refactor:` → For code refactoring without changing functionality    

**Examples:**

---

## 📂 File Naming Convention

- Component files should be **lowercase** and use **hyphens**:
**Examples:**
- `login-form.tsx`
- `user-profile-card.tsx`

---

## ⚡ Custom Hooks

- **Do not use `useQuery` (or similar) directly inside components.**  
- Always wrap it inside a **custom hook** for better abstraction and reusability.

**❌ Bad Example:**
```tsx
const MyComponent = () => {
const { data } = useQuery(["users"], fetchUsers);
...
}
```

**✅ Good Example:**
```tsx
const useFetchUsers = () => {
  return useQuery(["users"], fetchUsers);
  ...
}
```

## 🤝 Pull Requests

- Keep PRs small and focused on a single feature or fix.  
- Link related issues in the PR description.  
- Request at least one reviewer before merging.  

