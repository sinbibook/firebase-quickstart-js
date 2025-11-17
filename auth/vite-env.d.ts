/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_EMULATOR: string;
  readonly VITE_EMULATOR_HOST: string;
  readonly VITE_EMULATOR_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
