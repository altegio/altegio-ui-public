import type { Plugin } from 'vite'
import { dash } from 'radash'
import { BREAKPOINTS } from '../../../web/shared/constants/breakpoints'

import cssInjectPlugin from './cssInjectPlugin'

interface ICssBreakpointsInjectPluginOptions {
  outPath: string
  fileName: string
}

export const cssVariablesContent = (() => {
  return `:root{\n${Object.entries(BREAKPOINTS)
    .map(([
      key,
      value,
    ]) => `  --y-core-breakpoint-${dash(key)}: ${value}px;`)
    .join('\n')}\n}`
})()


const cssCustomMediaContent = (() => {
  return Object.entries(BREAKPOINTS)
    .map(([
      key,
      value,
    ]) => `@custom-media --y-breakpoint-${dash(key)} (max-width: ${value}px);`)
    .join('\n')
})()

/**
 * Опции для плагина cssBreakpointsInjectPlugin
 * @interface cssBreakpointsInjectPluginOptions
 * @property {string} [outPath='dist'] - Путь для сохранения CSS файла, относительно корня проекта, без слэша на конце
 * @property {string} [fileName='injected.css'] - Имя выходного CSS файла, относительно outPath
 */
export default function cssBreakpointsInjectPlugin(
  {
    outPath = 'dist',
    fileName = 'injected.css'
  }: ICssBreakpointsInjectPluginOptions
): Plugin {
  return cssInjectPlugin({outPath, cssContent: `${cssVariablesContent}\n\n${cssCustomMediaContent}`, fileName})
}
