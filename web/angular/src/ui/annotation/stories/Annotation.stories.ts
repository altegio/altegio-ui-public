import type { Meta, StoryObj } from '@storybook/angular'

import { AltAnnotation } from '~ng/ui/annotation'
import altCoreAnnotationStoryMeta, { type IAltCoreAnnotationStoryProps } from '~core/ui/annotation/stories/Annotation.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

/**
 * Angular wrapper for Core Annotation
 */
const meta: Meta<AltAnnotation & IAltCoreAnnotationStoryProps> = {
  title: '⚙️ Annotation',
  id: 'annotation',
  parameters: { controls: { sort: 'alpha' } },
  component: AltAnnotation,
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
      <AltNgAnnotation
        [text]="computedText"
        [disabled]="${String(args.disabled)}"
      >
        <div annotation-default>
          <span>
            {{ computedText }}
          </span>
        </div>
      </AltNgAnnotation>`,
  }),
  argTypes: { ...altCoreAnnotationStoryMeta.argTypes },
  args: { ...altCoreAnnotationStoryMeta.args },
} satisfies Meta<AltAnnotation & IAltCoreAnnotationStoryProps>

export default meta
type Story = StoryObj<AltAnnotation>

export const Playground: Story = { args: {} }
