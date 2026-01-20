# Agent Guidelines for YaNet Blog

This document provides coding standards and commands for AI agents working on the YaNet blog codebase.

## Project Overview

YaNet is a personal blog built with VuePress 2.x and vuepress-theme-plume. The blog content is primarily in Chinese and focuses on technology tutorials, networking, and NAS systems.

- **Stack**: VuePress 2.0 (RC), Vue 3.5, TypeScript 5.9, Vite bundler
- **Theme**: vuepress-theme-plume 1.0.0-rc.184
- **Package Manager**: pnpm 10.26.0
- **Build Tool**: Vite
- **Deployment**: Vercel (hostname: https://yanet.vip)

## Build, Dev, and Test Commands

### Development Server
```bash
pnpm docs:dev
```
Starts the VuePress dev server with hot reload at http://localhost:8080

### Production Build
```bash
pnpm docs:build
```
Builds the static site to `docs/.vuepress/dist/`

### Testing
```bash
pnpm test
```
**Note**: Currently returns error - no test suite configured yet.

### Package Management
```bash
pnpm install           # Install all dependencies
pnpm add <package>     # Add a new dependency
pnpm add -D <package>  # Add a dev dependency
```

## Project Structure

```
yanet-blog/
├── docs/                          # Content and config root
│   ├── .vuepress/                 # VuePress configuration
│   │   ├── config.ts              # Main VuePress config
│   │   ├── plume.config.ts        # Theme configuration
│   │   ├── client.ts              # Client-side config
│   │   ├── styles/                # Custom styles (SCSS)
│   │   ├── public/                # Static assets
│   │   └── dist/                  # Build output (gitignored)
│   ├── blog/                      # Blog post markdown files
│   └── README.md                  # Homepage content
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── .editorconfig                  # Editor formatting rules
```

## Code Style Guidelines

### TypeScript/JavaScript

**Module System**: ES Modules (ESM)
- Use `import` and `export` syntax
- Module resolution: `nodenext`
- Target: `esnext`

**Imports**:
```typescript
// External dependencies first
import axios from 'axios'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

// VuePress/Vue imports
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

// Type imports
import { ThemeOptions } from 'vuepress-theme-plume'

// Local imports last
import { getPlumeConfig } from './plume.config.js'
```

**Formatting**:
- **Indentation**: 2 spaces (never tabs)
- **Line Length**: Maximum 80 characters
- **Quotes**: Single quotes for strings
- **Semicolons**: Use semicolons
- **Line Endings**: LF (Unix-style)
- **Final Newline**: Always insert

**Naming Conventions**:
- Files: kebab-case or camelCase (e.g., `plume.config.ts`, `client.ts`)
- Functions: camelCase (e.g., `getPlumeConfig`, `getGithubProfile`)
- Constants: UPPER_SNAKE_CASE for environment variables
- Types/Interfaces: PascalCase (e.g., `ThemeOptions`)

**Types**:
- Use TypeScript for all `.ts` files
- Prefer `interface` for object shapes
- Use `type` for unions, intersections, or primitives
- Use `satisfies` for type checking while preserving literal types:
  ```typescript
  return {
    logo: '/logo@0.1x.png',
    // ...
  } satisfies ThemeOptions
  ```

**Async/Await**:
- Prefer `async/await` over `.then()` chains
- Use `await` at the top level (supported in ESM)
- Example:
  ```typescript
  const profile = await getGithubProfile()
  const data = await axios.get(url).then((res) => res.data)
  ```

### Vue Components

**Component Registration**:
```typescript
// In client.ts
export default defineClientConfig({
  enhance({ app }) {
    app.component('ComponentName', Component)
  },
})
```

**Composition API**:
- Use Vue 3 Composition API with `<script setup>` syntax
- Import `h` from 'vue' for render functions

**Styles**:
- Use SCSS for styling (sass-embedded is configured)
- Import global styles in client.ts: `import './styles/index.scss'`

### Markdown Content

**Frontmatter**:
Every blog post must include:
```yaml
---
tags:
  - Tag1
  - Tag2
title: Article Title
copyright:
  creation: original
  author:
    name: YaNet
createTime: 2026/01/06 22:09:35
permalink: /blog/unique-id/
---
```

**Links**:
- Use internal links with permalinks: `[text](/blog/permalink-id/)`
- External links: Include full URL

**Images**:
- Store in CDN or public folder
- Use descriptive alt text (currently images often have empty alt)

**Language**:
- Primary language: Chinese (zh-CN)
- Keep consistent tone and style

## Error Handling

**Async Operations**:
- Use try-catch blocks for error handling
- Log errors appropriately
- Provide fallback values when possible

**API Calls**:
```typescript
try {
  const response = await axios.get(url)
  return response.data
} catch (error) {
  console.error('Error fetching data:', error)
  throw error
}
```

## Configuration Files

### Important Config Files
- **config.ts**: Main VuePress configuration (site title, description, theme)
- **plume.config.ts**: Theme-specific settings (profile, plugins, social links)
- **client.ts**: Client-side enhancements (component registration, layouts)
- **tsconfig.json**: TypeScript compiler options
- **.editorconfig**: Code formatting rules

### Environment Variables
- `NODE_ENV`: Controls git plugin (only enabled in production)
- All environment vars follow UPPER_SNAKE_CASE

## Git Workflow

**Commit Messages**:
- Use Chinese for commit messages (project convention)
- Common patterns: `修改配置`, `init`, `新增文章`
- Be descriptive but concise

**Ignored Files** (`.gitignore`):
- `node_modules/`
- `docs/.vuepress/.cache/`
- `docs/.vuepress/.temp/`
- `docs/.vuepress/dist/`
- `docs/.obsidian/`
- `.idea/`

## Best Practices

1. **Theme Integration**: Use vuepress-theme-plume features (RepoCard, PageContextMenu)
2. **Performance**: Images and API calls happen at build time (e.g., GitHub profile fetch)
3. **SEO**: Configure SEO plugin with author info and sitemap
4. **Analytics**: Google Analytics configured (ID: G-WYQRCV8PZC)
5. **Comments**: Giscus integration for blog comments
6. **File System**: Write assets to `docs/.vuepress/public/` at build time

## Common Tasks

### Adding a New Blog Post
1. Create `.md` file in `docs/blog/<category>/`
2. Add complete frontmatter (see Markdown section)
3. Write content in Chinese
4. Use internal links with permalinks
5. Test with `pnpm docs:dev`

### Modifying Theme Config
1. Edit `docs/.vuepress/plume.config.ts`
2. Maintain type safety with `ThemeOptions`
3. Restart dev server to see changes

### Adding Custom Components
1. Create component file
2. Register in `docs/.vuepress/client.ts`
3. Use in markdown or layouts

## Dependencies

**Core**:
- vuepress: 2.0.0-rc.26
- vue: ^3.5.26
- vuepress-theme-plume: 1.0.0-rc.184

**Runtime**:
- axios: ^1.13.2

**Dev**:
- typescript: ^5.9.3
- @types/node: ^25.0.3
- sass-embedded: ^1.97.2

When adding dependencies, use `pnpm add` and ensure compatibility with the VuePress 2.x ecosystem.
