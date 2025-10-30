import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Some plugins are ESM-only and can cause "ESM file cannot be loaded by require"
// when Vite tries to bundle the config. Dynamically import ESM plugins so
// they are loaded at runtime instead of being required during the config bundling.
export default async () => {
  const react = (await import('@vitejs/plugin-react')).default;
  // compute __dirname in ESM
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = resolve(__filename, '..');

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [react()],
      resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: 'dist',
    },
  });
};