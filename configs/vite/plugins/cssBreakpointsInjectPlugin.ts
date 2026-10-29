import type { Plugin } from 'vite'
import { dash } from 'radash'
import { BREAKPOINTS } from '../../../web/shared/constants/breakpoints.ts'

import cssInjectPlugin from './cssInjectPlugin.ts'

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
 * Options for cssBreakpointsInjectPlugin
 * @interface cssBreakpointsInjectPluginOptions
 * @property {string} [outPath='dist'] - Output directory for the CSS file, relative to the project root, without a trailing slash
 * @property {string} [fileName='injected.css'] - Output CSS file name, relative to outPath
 */
export default function cssBreakpointsInjectPlugin(
  {
    outPath = 'dist',
    fileName = 'injected.css'
  }: ICssBreakpointsInjectPluginOptions
): Plugin {
  return cssInjectPlugin({outPath, cssContent: `${cssVariablesContent}\n\n${cssCustomMediaContent}`, fileName})
}
