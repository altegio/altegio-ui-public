import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { prefix } from '../../../web/shared/utils/componentsConfig.ts'

export default defineConfig(
  {
    build: {
      rolldownOptions: {
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
