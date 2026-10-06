import type { Plugin } from 'vite'
import { dash } from 'radash'
import { BREAKPOINTS } from '../../../web/shared/constants/breakpoints'

import cssInjectPlugin from './cssInjectPlugin'

interface IScssBreakpointsPluginOptions {
  outPath: string
}

const buildBreakpointName = (key: string) => `$breakpoint-${dash(key)}`

const scssVariablesContent = (() => {
  return Object.entries(BREAKPOINTS)
    .map(([
      key,
      value,
    ]) => `${buildBreakpointName(key)}: ${value}px;`)
    .join('\n')
})()

const scssMixinsContent = (() => {
  return Object.keys(BREAKPOINTS)
    .map((key) => `@mixin breakpoint-${dash(key)}() {@media (max-width: ${buildBreakpointName(key)}) { @content; }}`)
    .join('\n')
    .concat(`\n
@mixin breakpoint-width-between($widthMin, $widthMax) {
  @media (min-width: $widthMin) and (max-width: $widthMax) {
    @content;
  }
}

@mixin breakpoint-width-greater($width) {
  @media (min-width: calc(#{$width} + 1px)) {
    @content;
  }
}

@mixin breakpoint-width-greater-or-equal($width) {
  @media (min-width: $width) {
    @content;
  }
}

@mixin breakpoint-width-smaller($width) {
  @media (max-width: calc(#{$width} - 1px)) {
    @content;
  }
}

@mixin breakpoint-width-smaller-or-equal($width) {
  @media (max-width: $width) {
    @content;
  }
}`)
})()

/**
 * Опции для плагина scssBreakpointsPlugin
 * @interface IScssBreakpointsPluginOptions
 * @property {string} [outPath='dist'] - Путь для сохранения CSS файла, относительно корня проекта, без слэша на конце
 */
export default function scssBreakpointsPlugin(
  {
    outPath = 'dist',
  }: IScssBreakpointsPluginOptions
): Plugin {
  return cssInjectPlugin({outPath, cssContent: `${scssVariablesContent}\n\n${scssMixinsContent}`, fileName: 'breakpoints.scss'})
}
