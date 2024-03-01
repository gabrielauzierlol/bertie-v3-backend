import swc from 'unplugin-swc'
import { configDefaults, defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    exclude: [...configDefaults.exclude, '**/data/**'],
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
})
