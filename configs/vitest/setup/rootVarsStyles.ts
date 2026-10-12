import { beforeAll } from 'vitest'
import { cssContent } from '../../../tokens'

beforeAll(() => {
  const styleElement = document.createElement('style')
  styleElement.textContent = cssContent
  document.head.appendChild(styleElement)
})
