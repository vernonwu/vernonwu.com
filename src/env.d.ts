/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly MAL_CLIENT_ID?: string;
  readonly MAL_USERNAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
