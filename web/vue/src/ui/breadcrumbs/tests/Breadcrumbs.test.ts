import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { AltCoreBreadcrumbsItemTagName, AltCoreBreadcrumbsTagName } from '~shared/constants'
import { AltBreadcrumbs } from '~vue/ui/breadcrumbs'
import { AltBreadcrumbsItem } from '~vue/ui/breadcrumbsItem'
import type { AltCoreBreadcrumbs } from '~core/ui/breadcrumbs'
import type { AltCoreBreadcrumbsItem } from '~core/ui/breadcrumbsItem'

describe(
  'Vue/AltBreadcrumbs',
  () => {
    it(
      'Should pass props and items to the core components',
      () => {
        const onClick = vi.fn()
        const wrapper = mount(AltBreadcrumbs, {
          props: { accessibleName: 'You are here' },
          slots: {
            default: () => [
              h(AltBreadcrumbsItem, { href: '#a', target: '_self', onClick }, () => 'A'),
              h(AltBreadcrumbsItem, { current: true }, () => 'B'),
            ],
          },
        })

        const breadcrumbs = wrapper.find(AltCoreBreadcrumbsTagName).element as AltCoreBreadcrumbs
        const items = wrapper.findAll(AltCoreBreadcrumbsItemTagName).map((item) => item.element as AltCoreBreadcrumbsItem)

        expect(breadcrumbs.accessibleName).toBe('You are here')
        expect(items.map((item) => [item.href, item.target, item.current])).toEqual([['#a', '_self', false], [undefined, undefined, true]])
        expect(items.map((item) => item.textContent.trim())).toEqual(['A', 'B'])

        items[0].click()
        expect(onClick).toHaveBeenCalledOnce()
      },
    )
  },
)
