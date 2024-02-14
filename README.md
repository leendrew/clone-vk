# VK Clone

~~[Deployed]()~~

## Stack

- Vue 3
- Nuxt 3
- NuxtUI
- TailwindCSS

## Installation

### dev

```bash
cp .env.example .env.local
pnpm i
pnpm dev
```

### prod

```bash
cp .env.example .env.production
pnpm i --frozen-lockfile
pnpm build && pnpm preview
```
