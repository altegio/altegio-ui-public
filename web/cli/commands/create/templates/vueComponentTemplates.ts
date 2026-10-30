
import { ComponentTemplates } from './componentTemplates'

export class VueComponentTemplates extends ComponentTemplates {
  createIndexTemplate() {
    return `export { default as Alt${this.pascalComponentName} } from './${this.pascal(this.options.name)}.vue'\n`
  }

  createComponentTemplate() {
    return `<template>
  <alt-core-${this.dash(this.pascalComponentName)} v-bind="props">
    <slot />
  </alt-core-${this.dash(this.pascalComponentName)}>
</template>

<script setup lang="ts">
  import '~core/ui/${this.camelComponentName}'
  import {
    createVue${this.pascalComponentName}Props,
    type IAltVue${this.pascalComponentName}Props,
  } from './models/types'
  import type { IAltCore${this.pascalComponentName}Props } from '~core/ui/${this.camelComponentName}/models/types'

  defineOptions({ name: 'Alt${this.pascalComponentName}' })

  defineSlots<{
    default: () => unknown
  }>()

  const props = withDefaults(
    defineProps<IAltVue${this.pascalComponentName}Props>(),
    createVue${this.pascalComponentName}Props(),
  ) satisfies IAltCore${this.pascalComponentName}Props
</script>
`
  }

  createStoriesTemplate() {
    return `import type { Meta, StoryObj } from '@storybook/vue3'

import Alt${this.pascalComponentName} from '../${this.pascal(this.options.name)}.vue'
import alt${this.pascalComponentName}StoryMeta from '~core/ui/${this.camelComponentName}/stories/${this.pascal(this.options.name)}.stories'

/**
 * Vue wrapper for ${this.pascalComponentName}
 */
const meta: Meta<typeof Alt${this.pascalComponentName}> = {
  title: '${this.pascalComponentName}',
  id: '${this.options.name.replace('core', 'vue')}',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { Alt${this.pascalComponentName} },
    setup() {
      return { args }
    },
    template: \`
      <Alt${this.pascalComponentName} v-bind="args">
        <p>
          externalProp: \${args.externalProp}
        </p>

        <p>
          internalProp: \${args.internalProp}
        </p>
      </Alt${this.pascalComponentName}>
    \`,
  }),
  argTypes: { ...alt${this.pascalComponentName}StoryMeta.argTypes },
  args: { ...alt${this.pascalComponentName}StoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
`
  }

  createTypesTemplate() {
    return `import {
  createCore${this.pascalComponentName}Props,
  type IAltCore${this.pascalComponentName}Props,
} from '~core/ui/${this.camelComponentName}/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVue${this.pascalComponentName}Props {
  externalProp?: IAltCore${this.pascalComponentName}Props['externalProp']
  internalProp?: IAltCore${this.pascalComponentName}Props['internalProp']
}

export const createVue${this.pascalComponentName}Props = (): TDefinedVueProps<IAltVue${this.pascalComponentName}Props> => {
  const { externalProp, internalProp } = createCore${this.pascalComponentName}Props()
  return {
    externalProp,
    internalProp,
  }
}
`
  }

  createReExportTemplate() {
    return `export * from './${this.camel(this.options.name)}'\n`
  }

  createTestTemplate() {
    return `import { describe, expect, it, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCore${this.pascalComponentName}TagName } from '~shared/constants'
import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

import Alt${this.pascalComponentName} from '~vue/ui/${this.camelComponentName}/${this.pascal(this.options.name)}.vue'
import {
  createVue${this.pascalComponentName}Props,
  type IAltVue${this.pascalComponentName}Props,
} from '~vue/ui/${this.camelComponentName}/models/types'
import { AltCore${this.pascalComponentName} } from '~core/ui/${this.camelComponentName}'

const tagName = AltCore${this.pascalComponentName}TagName

const { externalProp: defaultExternalProp, internalProp: defaultInternalProp } = createVue${this.pascalComponentName}Props()

// Unit test cases:
const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'default', case: 'with content', content: text },
  { slot: 'default', case: 'without content', content: empty },
]
const propExternalPropTestCases: TPropTestCase<IAltVue${this.pascalComponentName}Props, 'externalProp'>[] = [
  { prop: 'externalProp', case: 'with content', value: text },
  { prop: 'externalProp', case: 'without content', value: empty },
  { prop: 'externalProp', case: 'without a value', value: defaultExternalProp },
]
const propInternalPropTestCases: TPropTestCase<IAltVue${this.pascalComponentName}Props, 'internalProp'>[] = [
  { prop: 'internalProp', case: 'with content', value: text },
  { prop: 'internalProp', case: 'without content', value: empty },
  { prop: 'internalProp', case: 'without a value', value: defaultInternalProp },
]

describe(
  'Vue/Alt${this.pascalComponentName}',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCore${this.pascalComponentName},
        )
      }
    })

    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of slotDefaultTestCases) {
              it(
                \`Slot "\${testCase.slot}" should render \${testCase.case}\`,
                () => {
                  const wrapper = mount(
                    Alt${this.pascalComponentName},
                    { slots: { default: testCase.content } },
                  )

                  expect(wrapper.text()).toBe(testCase.content)
                },
              )
            }
          },
        )

        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propExternalPropTestCases,
              ...propInternalPropTestCases,
            ]) {
              it(
                \`Prop "\${testCase.prop}" should update property \${testCase.prop} on the core component\`,
                () => {
                  const wrapper = mount(
                    Alt${this.pascalComponentName},
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreElement = wrapper.find(tagName).element as AltCore${this.pascalComponentName}

                  expect(coreElement[testCase.prop]).toBe(testCase.expected)
                },
              )
            }
          },
        )
      },
    )
  },
)
`
  }
}
