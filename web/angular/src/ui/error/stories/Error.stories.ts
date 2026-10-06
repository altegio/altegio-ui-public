import type { Meta, StoryObj } from '@storybook/angular'

import { YError } from '~ng/ui/error'
import yCoreErrorStoryMeta, { type IYCoreErrorStoryProps } from '~core/ui/error/stories/Error.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type IYCoreErrorStoryMeta = YError & IYCoreErrorStoryProps

/**
 * Angular-обертка над Core Error
 */
const meta: Meta<IYCoreErrorStoryMeta> = {
  title: '⚙️ Error',
  id: 'error',
  parameters: { controls: { sort: 'alpha' } },
  component: YError,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const displayErrors = args.isLongText
      ? args.showErrors.length > 1
        ? [
          LOREM_IPSUM,
          LOREM_IPSUM,
        ]
        : [LOREM_IPSUM]
      : args.errors ?? args.showErrors

    return {
      props: { ...args, displayErrors },
      template: `
        <YError [errors]="displayErrors" />
      `,
    }
  },
  argTypes: { ...yCoreErrorStoryMeta.argTypes },
  args: { ...yCoreErrorStoryMeta.args },
} satisfies Meta<IYCoreErrorStoryMeta>

export default meta
type Story = StoryObj<IYCoreErrorStoryMeta>

export const Playground: Story = { args: {} }
