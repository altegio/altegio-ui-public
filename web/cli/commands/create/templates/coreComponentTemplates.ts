import { ComponentTemplates } from './componentTemplates'

export class CoreComponentTemplates extends ComponentTemplates {
  createTagNameTemplate() {
    return `export const AltCore${this.pascalComponentName}TagName = 'alt-core-${this.dash(this.pascalComponentName)}'\n`
  }

  createIndexTemplate() {
    return `export { AltCore${this.pascalComponentName} } from './${this.pascal(this.options.name)}.core'\n`
  }

  createComponentTemplate() {
    return `import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import {
  createCore${this.pascalComponentName}Props,
  type IAltCore${this.pascalComponentName}Props,
} from './models/types'
import {
  AltCore${this.pascalComponentName}TagName as tagName,
} from '~shared/constants'


import Alt${this.pascalComponentName}VarsCss from './css/${this.pascal(this.options.name)}.vars.css?inline'
import Alt${this.pascalComponentName}ScopedCss from './css/${this.pascal(this.options.name)}.scoped.css?inline'

const { externalProp, internalProp } = createCore${this.pascalComponentName}Props()

@customElement(tagName)
export class AltCore${this.pascalComponentName}
  extends LitElement
  implements IAltCore${this.pascalComponentName}Props {
  @property({ type: String, attribute: 'external-prop' }) externalProp: IAltCore${this.pascalComponentName}Props['externalProp'] = externalProp
  @property({ type: String, attribute: 'internal-prop' }) internalProp: IAltCore${this.pascalComponentName}Props['internalProp'] = internalProp

  private readonly baseClass = tagName

  static readonly styles = [
    css\`
      \${unsafeCSS(Alt${this.pascalComponentName}VarsCss)}
      \${unsafeCSS(Alt${this.pascalComponentName}ScopedCss)}
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
  type IAltCore${this.pascalComponentName}Props,
} from '../models/types'
import {
  AltCore${this.pascalComponentName}TagName as tagName,
} from '~shared/constants'
import '~${this.options.platform}/ui/${this.camelComponentName}'

const { externalProp, internalProp } = createCore${this.pascalComponentName}Props()

/**
 * ## ${this.pascal(this.options.platform)}${this.pascalComponentName}
 */
const meta: Meta<IAltCore${this.pascalComponentName}Props> = {
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
      <alt-core-${this.dash(this.pascalComponentName)}
        external-prop=\${ifDefined(externalProp)}
        internal-prop=\${ifDefined(internalProp)}
      >
        <p>
          externalProp: \${externalProp}
        </p>

        <p>
          internalProp: \${internalProp}
        </p>
      </alt-core-${this.dash(this.pascalComponentName)}>
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
} satisfies Meta<IAltCore${this.pascalComponentName}Props>

export default meta
type Story = StoryObj<IAltCore${this.pascalComponentName}Props>

export const Playground: Story = { args: {} }
`
  }

  createTypesTemplate() {
    return `import {
  createCore${this.pascalComponentName}ExternalProps,
  type IAltCore${this.pascalComponentName}ExternalProps,
} from './external'
import {
  createCore${this.pascalComponentName}InternalProps,
  type IAltCore${this.pascalComponentName}InternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCore${this.pascalComponentName}Props extends IAltCore${this.pascalComponentName}ExternalProps, IAltCore${this.pascalComponentName}InternalProps {}

export const createCore${this.pascalComponentName}Props = (): IAltCore${this.pascalComponentName}Props => ({
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

  --alt-core-${this.dash(this.pascalComponentName)}-display: block;
  --alt-core-${this.dash(this.pascalComponentName)}-color: var(--alt-core-color-text-primary);
}
`
  }

  createStyles() {
    return `$component: $AltCore${this.pascalComponentName}TagName;

.$(component) {
  display: var(--alt-core-${this.dash(this.pascalComponentName)}-display);
  font-family: var(--alt-core-font-family);
}
`
  }

  createExternals() {
    return `export interface IAltCore${this.pascalComponentName}ExternalProps {
  externalProp: string
}

export const createCore${this.pascalComponentName}ExternalProps = (): IAltCore${this.pascalComponentName}ExternalProps => ({ externalProp: '' })
`
  }

  createInternals() {
    return `export interface IAltCore${this.pascalComponentName}InternalProps {
  internalProp: string
}

export const createCore${this.pascalComponentName}InternalProps = (): IAltCore${this.pascalComponentName}InternalProps => ({ internalProp: '' })
`
  }

  createTestTemplate() {
    return `import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { AltCore${this.pascalComponentName}TagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import type { TSlotTestCase, TPropTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import {
  createCore${this.pascalComponentName}Props,
  type IAltCore${this.pascalComponentName}Props,
} from '~core/ui/${this.camelComponentName}/models/types'
import '~core/ui/${this.camelComponentName}'

const tagName = AltCore${this.pascalComponentName}TagName

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
const propExternalPropTestCases: TPropTestCase<IAltCore${this.pascalComponentName}Props, 'externalProp'>[] = [
  { prop: 'externalProp', case: 'with content', value: text },
  { prop: 'externalProp', case: 'without content', value: empty },
]
const propInternalPropTestCases: TPropTestCase<IAltCore${this.pascalComponentName}Props, 'internalProp'>[] = [
  { prop: 'internalProp', case: 'with content', value: text },
  { prop: 'internalProp', case: 'without content', value: empty },
]

describe(
  'Core/Alt${this.pascalComponentName}',
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
    host: '--alt-core-${this.dash(this.pascalComponentName)}-color',
    root: '--alt-core-color-text-primary',
  },
]

export const CSSVariablesHostToValueCases = [
  {
    host: '--alt-core-${this.dash(this.pascalComponentName)}-color',
    value: COLORS.text_primary.cssValue,
  },
]
`
  }

  createCSSTestTemplate() {
    return `import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot, getHostCSSVariableValue } from '~shared/tests/utils'

import { AltCore${this.pascalComponentName}TagName } from '~shared/constants'
import {
  createCore${this.pascalComponentName}Props,
} from '~core/ui/${this.camelComponentName}/models/types'
import '~core/ui/${this.camelComponentName}'
import {
  CSSVariablesHostToRootCases,
  CSSVariablesHostToValueCases,
} from '~core/ui/${this.camelComponentName}/tests/cases/css'

const tagName = AltCore${this.pascalComponentName}TagName

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  createCore${this.pascalComponentName}Props(),
)

describe(
  'Core/AltCore${this.pascalComponentName}/CSS',
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
