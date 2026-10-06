import type { Meta, StoryObj } from '@storybook/angular'

import { YAnnotation } from '~ng/ui/annotation'
import yCoreAnnotationStoryMeta, { type IYCoreAnnotationStoryProps } from '~core/ui/annotation/stories/Annotation.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

/**
 * Angular-обертка над Core Annotation
 */
const meta: Meta<YAnnotation & IYCoreAnnotationStoryProps> = {
  title: '⚙️ Annotation',
  id: 'annotation',
  parameters: { controls: { sort: 'alpha' } },
  component: YAnnotation,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: {
      ...args,
      computedText: args.isLongText ? LOREM_IPSUM : args.text,
    },
    template: `
      <YNgAnnotation
        [text]="computedText"
        [disabled]="${String(args.disabled)}"
      >
        <div annotation-default>
          <span>
            {{ computedText }}
          </span>
        </div>
      </YNgAnnotation>`,
  }),
  argTypes: { ...yCoreAnnotationStoryMeta.argTypes },
  args: { ...yCoreAnnotationStoryMeta.args },
} satisfies Meta<YAnnotation & IYCoreAnnotationStoryProps>

export default meta
type Story = StoryObj<YAnnotation>

export const Playground: Story = { args: {} }
