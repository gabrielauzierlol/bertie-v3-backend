import swc from 'unplugin-swc'
import { configDefaults, defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    exclude: [
      ...configDefaults.exclude,
      '**/data/**',
      'src/domain/notebook/**',
    ],
    setupFiles: ['./test/setup-e2e.ts'],
    testTimeout: 1000000,
    hookTimeout: 1000000,
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
