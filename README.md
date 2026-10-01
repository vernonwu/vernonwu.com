# My personal website

Use Node.js 24 (`nvm use`) and pnpm 10.23.0, as pinned in `package.json`.
Run `pnpm install --frozen-lockfile` and `pnpm build` to build the site.
Vercel uses Corepack to select the pinned pnpm version.

The pnpm patch for `@astrojs/vercel@7.8.2` adds Node.js 24 to the Astro 4
adapter's runtime list; without it, the adapter emits Node.js 18 functions.
Remove the patch when upgrading to an adapter that supports Node.js 24.

![nozomi](/public/nozomi.jpg)
