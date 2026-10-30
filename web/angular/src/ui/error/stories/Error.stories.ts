import type { Meta, StoryObj } from '@storybook/angular'

import { AltError } from '~ng/ui/error'
import altCoreErrorStoryMeta, { type IAltCoreErrorStoryProps } from '~core/ui/error/stories/Error.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type IAltCoreErrorStoryMeta = AltError & IAltCoreErrorStoryProps

/**
 * Angular wrapper for Core Error
 */
const meta: Meta<IAltCoreErrorStoryMeta> = {
  title: '⚙️ Error',
  id: 'error',
  parameters: { controls: { sort: 'alpha' } },
  component: AltError,
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
        <AltError [errors]="displayErrors" />
      `,
    }
  },
  argTypes: { ...altCoreErrorStoryMeta.argTypes },
  args: { ...altCoreErrorStoryMeta.args },
} satisfies Meta<IAltCoreErrorStoryMeta>

export default meta
type Story = StoryObj<IAltCoreErrorStoryMeta>

export const Playground: Story = { args: {} }
