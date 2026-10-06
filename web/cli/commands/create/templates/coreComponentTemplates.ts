import { ComponentTemplates } from './componentTemplates'

export class CoreComponentTemplates extends ComponentTemplates {
  createTagNameTemplate() {
    return `export const YCore${this.pascalComponentName}TagName = 'y-core-${this.dash(this.pascalComponentName)}'\n`
  }

  createIndexTemplate() {
    return `export { YCore${this.pascalComponentName} } from './${this.pascal(this.options.name)}.core'\n`
  }

  createComponentTemplate() {
    return `import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import {
  createCore${this.pascalComponentName}Props,
  type IYCore${this.pascalComponentName}Props,
} from './models/types'
import {
  YCore${this.pascalComponentName}TagName as tagName,
} from '~shared/constants'


import Y${this.pascalComponentName}VarsCss from './css/${this.pascal(this.options.name)}.vars.css?inline'
import Y${this.pascalComponentName}ScopedCss from './css/${this.pascal(this.options.name)}.scoped.css?inline'

const { externalProp, internalProp } = createCore${this.pascalComponentName}Props()

@customElement(tagName)
export class YCore${this.pascalComponentName}
  extends LitElement
  implements IYCore${this.pascalComponentName}Props {
  @property({ type: String, attribute: 'external-prop' }) externalProp: IYCore${this.pascalComponentName}Props['externalProp'] = externalProp
  @property({ type: String, attribute: 'internal-prop' }) internalProp: IYCore${this.pascalComponentName}Props['internalProp'] = internalProp

  private readonly baseClass = tagName

  static readonly styles = [
    css\`
      \${unsafeCSS(Y${this.pascalComponentName}VarsCss)}
      \${unsafeCSS(Y${this.pascalComponentName}ScopedCss)}
    \`,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
  }

  protected render() {
    return html\`
      <div class=\${classMap(this.computedClasses)}>
        <slot>
        </slot>
      </div>
    \`
  }
}
`
  }

  createStoriesTemplate() {
    return `import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCore${this.pascalComponentName}Props,
  type IYCore${this.pascalComponentName}Props,
} from '../models/types'
import {
  YCore${this.pascalComponentName}TagName as tagName,
} from '~shared/constants'
import '~${this.options.platform}/ui/${this.camelComponentName}'

const { externalProp, internalProp } = createCore${this.pascalComponentName}Props()

/**
 * ## ${this.pascal(this.options.platform)}${this.pascalComponentName}
 */
const meta: Meta<IYCore${this.pascalComponentName}Props> = {
  title: '${this.pascalComponentName}',
  id: '${this.options.name}',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    externalProp,
    internalProp,
  }) => {
    return html\`
      <y-core-${this.dash(this.pascalComponentName)}
        external-prop=\${ifDefined(externalProp)}
        internal-prop=\${ifDefined(internalProp)}
      >
        <p>
          externalProp: \${externalProp}
        </p>

        <p>
          internalProp: \${internalProp}
        </p>
      </y-core-${this.dash(this.pascalComponentName)}>
    \`
  },
  argTypes: {
    externalProp: {
      type: 'string',
      description: 'External property',
    },
    internalProp: {
      type: 'string',
      description: 'Internal property',
    },
  },
  args: {
    externalProp: externalProp,
    internalProp: internalProp,
  },
} satisfies Meta<IYCore${this.pascalComponentName}Props>

export default meta
type Story = StoryObj<IYCore${this.pascalComponentName}Props>

export const Playground: Story = { args: {} }
`
  }

  createTypesTemplate() {
    return `import {
  createCore${this.pascalComponentName}ExternalProps,
  type IYCore${this.pascalComponentName}ExternalProps,
} from './external'
import {
  createCore${this.pascalComponentName}InternalProps,
  type IYCore${this.pascalComponentName}InternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IYCore${this.pascalComponentName}Props extends IYCore${this.pascalComponentName}ExternalProps, IYCore${this.pascalComponentName}InternalProps {}

export const createCore${this.pascalComponentName}Props = (): IYCore${this.pascalComponentName}Props => ({
  ...createCore${this.pascalComponentName}ExternalProps(),
  ...createCore${this.pascalComponentName}InternalProps(),
})
`
  }

  createReExportTemplate() {
    return `export * from './${this.camelComponentName}'\n`
  }

  createCssVariables() {
    return `:host {
  /* General */

  --y-core-${this.dash(this.pascalComponentName)}-display: block;
  --y-core-${this.dash(this.pascalComponentName)}-color: var(--y-core-color-text-primary);
}
`
  }

  createStyles() {
    return `$component: $YCore${this.pascalComponentName}TagName;

.$(component) {
  display: var(--y-core-${this.dash(this.pascalComponentName)}-display);
  font-family: var(--y-core-font-family);
}
`
  }

  createExternals() {
    return `export interface IYCore${this.pascalComponentName}ExternalProps {
  externalProp: string
}

export const createCore${this.pascalComponentName}ExternalProps = (): IYCore${this.pascalComponentName}ExternalProps => ({ externalProp: '' })
`
  }

  createInternals() {
    return `export interface IYCore${this.pascalComponentName}InternalProps {
  internalProp: string
}

export const createCore${this.pascalComponentName}InternalProps = (): IYCore${this.pascalComponentName}InternalProps => ({ internalProp: '' })
`
  }

  createTestTemplate() {
    return `import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { YCore${this.pascalComponentName}TagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import type { TSlotTestCase, TPropTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import {
  createCore${this.pascalComponentName}Props,
  type IYCore${this.pascalComponentName}Props,
} from '~core/ui/${this.camelComponentName}/models/types'
import '~core/ui/${this.camelComponentName}'

const tagName = YCore${this.pascalComponentName}TagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCore${this.pascalComponentName}Props(),
)

// Unit test cases:
const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'default', case: 'with content', content: text },
  { slot: 'default', case: 'without content', content: empty },
]
const propExternalPropTestCases: TPropTestCase<IYCore${this.pascalComponentName}Props, 'externalProp'>[] = [
  { prop: 'externalProp', case: 'with content', value: text },
  { prop: 'externalProp', case: 'without content', value: empty },
]
const propInternalPropTestCases: TPropTestCase<IYCore${this.pascalComponentName}Props, 'internalProp'>[] = [
  { prop: 'internalProp', case: 'with content', value: text },
  { prop: 'internalProp', case: 'without content', value: empty },
]

describe(
  'Core/Y${this.pascalComponentName}',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    afterEach(async() => {
      await resetComponent()
    })

    afterAll(() => {
      removeComponent()
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
                async() => {
                  await updateComponent({ slots: { [testCase.slot]: testCase.content } })

                  expect(component.textContent).toBe(testCase.content)
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
                \`Prop "\${testCase.prop}": \${testCase.case}\`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })

                  expect(component[testCase.prop]).toBe(testCase.value)
                },
              )
            }
          },
        )
        describe(
          'Events',
          () => {
            it(
              'Events tests',
              () => {
                expect(true).toBe(true)
              },
            )
          },
        )
      },
    )

    describe(
      'CSS',
      () => {
        it(
          'CSS tests',
          () => {
            expect(true).toBe(true)
          },
        )
      },
    )
  },
)
`
  }

  createCSSTestCasesTemplate() {
    return `import { COLORS } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  {
    host: '--y-core-${this.dash(this.pascalComponentName)}-color',
    root: '--y-core-color-text-primary',
  },
]

export const CSSVariablesHostToValueCases = [
  {
    host: '--y-core-${this.dash(this.pascalComponentName)}-color',
    value: COLORS.text_primary.cssValue,
  },
]
`
  }

  createCSSTestTemplate() {
    return `import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot, getHostCSSVariableValue } from '~shared/tests/utils'

import { YCore${this.pascalComponentName}TagName } from '~shared/constants'
import {
  createCore${this.pascalComponentName}Props,
} from '~core/ui/${this.camelComponentName}/models/types'
import '~core/ui/${this.camelComponentName}'
import {
  CSSVariablesHostToRootCases,
  CSSVariablesHostToValueCases,
} from '~core/ui/${this.camelComponentName}/tests/cases/css'

const tagName = YCore${this.pascalComponentName}TagName

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  createCore${this.pascalComponentName}Props(),
)

describe(
  'Core/YCore${this.pascalComponentName}/CSS',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    for (const { host, root } of CSSVariablesHostToRootCases) {
      it(
        \`Host CSS variable \${host} should reference the :root CSS variable \${root}\`,
        () => {
          const shadowRoot = getWCShadowRoot(component)

          const hostCSSVariableValue = getHostCSSVariableValue(
            shadowRoot.adoptedStyleSheets,
            host,
          )

          expect(hostCSSVariableValue).toBe(\`var(\${root})\`)
        },
      )
    }

    for (const { host, value } of CSSVariablesHostToValueCases) {
      it(
        \`Computed host CSS variable \${host} should resolve to the token value: \${value}\`,
        () => {
          const shadowRoot = getWCShadowRoot(component)

          const varValue = getComputedStyle(shadowRoot.host).getPropertyValue(host)

          expect(varValue).toBe(value)
        },
      )
    }
  },
)    
`
  }
}
