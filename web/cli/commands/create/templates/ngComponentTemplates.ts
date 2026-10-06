import { ComponentTemplates } from './componentTemplates'

export class NgComponentTemplates extends ComponentTemplates {
  createIndexTemplate() {
    return `export { Y${this.pascalComponentName} } from './${this.pascal(this.options.name)}.component'\n`
  }

  createComponentTemplate() {
    return `import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'

import '~core/ui/${this.camelComponentName}'
import {
  createNg${this.pascalComponentName}Props,
  type IYNg${this.pascalComponentName}Props,
} from './models/types'
import { DefaultValue } from '~ng/utils/default-value.decorator'

const { externalProp, internalProp } = createNg${this.pascalComponentName}Props()

@Component({
  selector: 'Y${this.pascalComponentName}',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <y-core-${this.dash(this.pascalComponentName)}
      [externalProp]="externalProp"
      [internalProp]="internalProp"
    >
      <ng-content />
    </y-core-${this.dash(this.pascalComponentName)}>
  \`,
})

export class Y${this.pascalComponentName} implements IYNg${this.pascalComponentName}Props {
  @Input() @DefaultValue(externalProp) externalProp: IYNg${this.pascalComponentName}Props['externalProp'] = externalProp
  @Input() @DefaultValue(internalProp) internalProp: IYNg${this.pascalComponentName}Props['internalProp'] = internalProp
}
`
  }

  createStoriesTemplate() {
    return `import type { Meta, StoryObj } from '@storybook/angular'

import { Y${this.pascalComponentName} } from '../${this.pascal(this.options.name)}.component'
import y${this.pascalComponentName}StoryMeta from '~core/ui/${this.camelComponentName}/stories/${this.pascal(this.options.name)}.stories'

/**
 * Angular-обертка над ${this.pascalComponentName}
 */
const meta: Meta<Y${this.pascalComponentName}> = {
  title: '${this.pascalComponentName}',
  id: '${this.options.name.replace('core', 'ng')}',
  parameters: { controls: { sort: 'alpha' } },
  component: Y${this.pascalComponentName},
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: \`
      <Y${this.pascalComponentName}
        [externalProp]="externalProp"
        [internalProp]="internalProp"
      >
        <p>
          externalProp: {{externalProp}}
        </p>
        
        <p>
          internalProp: {{internalProp}}
        </p>
      </Y${this.pascalComponentName}>\`,
  }),
  argTypes: { ...y${this.pascalComponentName}StoryMeta.argTypes },
  args: { ...y${this.pascalComponentName}StoryMeta.args },
} satisfies Meta<Y${this.pascalComponentName}>

export default meta
type Story = StoryObj<Y${this.pascalComponentName}>

export const Playground: Story = { args: {} }
`
  }

  createTypesTemplate() {
    return `import {
  createCore${this.pascalComponentName}Props,
  type IYCore${this.pascalComponentName}Props,
} from '~core/ui/${this.camelComponentName}/models/types'

export interface IYNg${this.pascalComponentName}Props extends IYCore${this.pascalComponentName}Props {}

export const createNg${this.pascalComponentName}Props = (): IYNg${this.pascalComponentName}Props => createCore${this.pascalComponentName}Props()
`
  }

  createReExportTemplate() {
    return `export { Y${this.pascalComponentName} } from './${this.camelComponentName}'\n`
  }

  createTestTemplate() {
    return `import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCore${this.pascalComponentName}TagName } from '~shared/constants'
import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import { Y${this.pascalComponentName} } from '~ng/ui/${this.camelComponentName}/${this.pascal(this.options.name)}.component'
import {
  createNg${this.pascalComponentName}Props,
  type IYNg${this.pascalComponentName}Props,
} from '~ng/ui/${this.camelComponentName}/models/types'

const tagName = YCore${this.pascalComponentName}TagName

interface ICreateComponentArgs {
  slots?: {
    default?: string
  }
  props?: Partial<IYNg${this.pascalComponentName}Props>
}
const createComponent = async({ slots, props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [Y${this.pascalComponentName}] }).compileComponents()

  @Component({
    template: \`<Y${this.pascalComponentName} [externalProp]="externalProp" [internalProp]="internalProp">\${slots?.default}</Y${this.pascalComponentName}>\`,
    imports: [Y${this.pascalComponentName}],
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
  { slot: 'default', case: 'с контентом', content: text },
  { slot: 'default', case: 'без контента', content: empty },
]
const propExternalPropTestCases: TPropTestCase<IYNg${this.pascalComponentName}Props, 'externalProp'>[] = [
  { prop: 'externalProp', case: 'с контентом', value: text },
  { prop: 'externalProp', case: 'без контента', value: empty },
  { prop: 'externalProp', case: 'без значения', value: defaultExternalProp },
]
const propInternalPropTestCases: TPropTestCase<IYNg${this.pascalComponentName}Props, 'internalProp'>[] = [
  { prop: 'internalProp', case: 'с контентом', value: text },
  { prop: 'internalProp', case: 'без контента', value: empty },
  { prop: 'internalProp', case: 'без значения', value: defaultInternalProp },
]

describe(
  'Angular/Y${this.pascalComponentName}',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of slotDefaultTestCases) {
              it(
                \`Slot "\${testCase.slot}" должен быть \${testCase.case}\`,
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
                \`Prop "\${testCase.prop}" должен изменить свойство \${testCase.prop} у core компонента\`,
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
