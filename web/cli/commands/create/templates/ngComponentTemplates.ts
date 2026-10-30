import { ComponentTemplates } from './componentTemplates'

export class NgComponentTemplates extends ComponentTemplates {
  createIndexTemplate() {
    return `export { Alt${this.pascalComponentName} } from './${this.pascal(this.options.name)}.component'\n`
  }

  createComponentTemplate() {
    return `import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/${this.camelComponentName}'
import {
  createNg${this.pascalComponentName}Props,
  type IAltNg${this.pascalComponentName}Props,
} from './models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { externalProp, internalProp } = createNg${this.pascalComponentName}Props()

@Component({
  selector: 'Alt${this.pascalComponentName}',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <alt-core-${this.dash(this.pascalComponentName)}
      [externalProp]="externalProp"
      [internalProp]="internalProp"
    >
      <ng-content />
    </alt-core-${this.dash(this.pascalComponentName)}>
  \`,
})

export class Alt${this.pascalComponentName} implements IAltNg${this.pascalComponentName}Props {
  @Input() @DefaultValue(externalProp) externalProp: IAltNg${this.pascalComponentName}Props['externalProp'] = externalProp
  @Input() @DefaultValue(internalProp) internalProp: IAltNg${this.pascalComponentName}Props['internalProp'] = internalProp
}
`
  }

  createStoriesTemplate() {
    return `import type { Meta, StoryObj } from '@storybook/angular'

import { Alt${this.pascalComponentName} } from '../${this.pascal(this.options.name)}.component'
import alt${this.pascalComponentName}StoryMeta from '~core/ui/${this.camelComponentName}/stories/${this.pascal(this.options.name)}.stories'

/**
 * Angular wrapper for ${this.pascalComponentName}
 */
const meta: Meta<Alt${this.pascalComponentName}> = {
  title: '${this.pascalComponentName}',
  id: '${this.options.name.replace('core', 'ng')}',
  parameters: { controls: { sort: 'alpha' } },
  component: Alt${this.pascalComponentName},
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: \`
      <Alt${this.pascalComponentName}
        [externalProp]="externalProp"
        [internalProp]="internalProp"
      >
        <p>
          externalProp: {{externalProp}}
        </p>
        
        <p>
          internalProp: {{internalProp}}
        </p>
      </Alt${this.pascalComponentName}>\`,
  }),
  argTypes: { ...alt${this.pascalComponentName}StoryMeta.argTypes },
  args: { ...alt${this.pascalComponentName}StoryMeta.args },
} satisfies Meta<Alt${this.pascalComponentName}>

export default meta
type Story = StoryObj<Alt${this.pascalComponentName}>

export const Playground: Story = { args: {} }
`
  }

  createTypesTemplate() {
    return `import {
  createCore${this.pascalComponentName}Props,
  type IAltCore${this.pascalComponentName}Props,
} from '~core/ui/${this.camelComponentName}/models/types'

export interface IAltNg${this.pascalComponentName}Props extends IAltCore${this.pascalComponentName}Props {}

export const createNg${this.pascalComponentName}Props = (): IAltNg${this.pascalComponentName}Props => createCore${this.pascalComponentName}Props()
`
  }

  createReExportTemplate() {
    return `export { Alt${this.pascalComponentName} } from './${this.camelComponentName}'\n`
  }

  createTestTemplate() {
    return `import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCore${this.pascalComponentName}TagName } from '~shared/constants'
import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import { Alt${this.pascalComponentName} } from '~ng/ui/${this.camelComponentName}/${this.pascal(this.options.name)}.component'
import {
  createNg${this.pascalComponentName}Props,
  type IAltNg${this.pascalComponentName}Props,
} from '~ng/ui/${this.camelComponentName}/models/types'

const tagName = AltCore${this.pascalComponentName}TagName

interface ICreateComponentArgs {
  slots?: {
    default?: string
  }
  props?: Partial<IAltNg${this.pascalComponentName}Props>
}
const createComponent = async({ slots, props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [Alt${this.pascalComponentName}] }).compileComponents()

  @Component({
    template: \`<Alt${this.pascalComponentName} [externalProp]="externalProp" [internalProp]="internalProp">\${slots?.default}</Alt${this.pascalComponentName}>\`,
    imports: [Alt${this.pascalComponentName}],
    standalone: true,
  })
  class TestComponent {
    externalProp = props?.externalProp
    internalProp = props?.internalProp
  }
  return TestComponent
}

const { externalProp: defaultExternalProp, internalProp: defaultInternalProp } = createNg${this.pascalComponentName}Props()

// Unit test cases:
const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'default', case: 'with content', content: text },
  { slot: 'default', case: 'without content', content: empty },
]
const propExternalPropTestCases: TPropTestCase<IAltNg${this.pascalComponentName}Props, 'externalProp'>[] = [
  { prop: 'externalProp', case: 'with content', value: text },
  { prop: 'externalProp', case: 'without content', value: empty },
  { prop: 'externalProp', case: 'without a value', value: defaultExternalProp },
]
const propInternalPropTestCases: TPropTestCase<IAltNg${this.pascalComponentName}Props, 'internalProp'>[] = [
  { prop: 'internalProp', case: 'with content', value: text },
  { prop: 'internalProp', case: 'without content', value: empty },
  { prop: 'internalProp', case: 'without a value', value: defaultInternalProp },
]

describe(
  'Angular/Alt${this.pascalComponentName}',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of slotDefaultTestCases) {
              it(
                \`Slot "\${testCase.slot}" should render \${testCase.case}\`,
                async() => {
                  const component = await createComponent({
                    slots: { [testCase.slot]: testCase.content },
                    props: {},
                  })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  expect((fixture.nativeElement as HTMLElement).textContent).toBe(testCase.content)
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
                async() => {
                  const component = await createComponent({
                    slots: {},
                    props: { [testCase.prop]: testCase.value },
                  })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
                  expect(coreElement?.[testCase.prop]).toBe(testCase.expected)
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
