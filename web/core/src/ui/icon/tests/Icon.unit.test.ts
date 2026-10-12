import { describe, expect, it } from 'vitest'

import { yRocket } from '~shared/icons'
import { YCoreIconTagName } from '~shared/constants'
import { createComponent } from '~shared/tests/core'
import { getWCShadowRoot } from '~shared/tests/utils'
import {
  createCoreIconExternalProps,
} from '~core/ui/icon/models/types'
import '~core/ui/icon'

const { size: defaultSize } = createCoreIconExternalProps()

const tagName = YCoreIconTagName

describe(
  'Core/YCoreIcon/Unit',
  () => {
    describe(
      'Props',
      () => {
        it(
          'Должен выдать ошибку если нет иконки',
          async() => {
            const testFunction = async() => {
              const component = createComponent(tagName)

              document.body.appendChild(component)

              await component.updateComplete

              document.body.removeChild(component)
            }

            await expect(testFunction).rejects.toThrow()
          },
        )

        it(
          'Должен установить иконку, которая передана в свойство icon',
          async() => {
            const component = createComponent(
              tagName,
              { props: { icon: yRocket } },
            )

            document.body.appendChild(component)

            await component.updateComplete

            const svg = getWCShadowRoot(component).querySelector('svg')

            expect(svg).toBeDefined()

            document.body.removeChild(component)
          },
        )

        it(
          'Должен установить размер, который передан в свойство size',
          async() => {
            const size = '100px'
            const component = createComponent(
              tagName,
              { props: { size, icon: yRocket } },
            )

            document.body.appendChild(component)

            await component.updateComplete

            const svg = getWCShadowRoot(component).querySelector('svg')
            const styles = svg && window.getComputedStyle(svg)

            expect(styles?.width).toBe(size)
            expect(styles?.height).toBe(size)

            document.body.removeChild(component)
          },
        )

        it(
          'Должен установить размер по умолчанию, если нет свойства size',
          async() => {
            const component = createComponent(
              tagName,
              { props: { icon: yRocket } },
            )

            document.body.appendChild(component)

            await component.updateComplete

            const svg = getWCShadowRoot(component).querySelector('svg')
            const styles = svg && window.getComputedStyle(svg)

            expect(styles?.width).toBe(defaultSize)
            expect(styles?.height).toBe(defaultSize)

            document.body.removeChild(component)
          },
        )
      },
    )
  },
)
