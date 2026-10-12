import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { prefix } from '../../../web/shared/utils/componentsConfig'

export default defineConfig(
  {
    build: {
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => {
              return tag.startsWith(`${prefix}-`)
            }
          }
        }
      })
    ],
  }
)
