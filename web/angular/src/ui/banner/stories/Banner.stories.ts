import type { Meta, StoryObj } from '@storybook/angular'
import { AltBanner } from '~ng/ui/banner'
import { AltButton } from '~ng/ui/button'
import altCoreBannerStoryMeta, { type IAltCoreBannerStoryProps } from '~core/ui/banner/stories/Banner.stories'

type TNgBannerStoryMeta = AltBanner & Pick<IAltCoreBannerStoryProps, 'isActionsSlotExists'> & { onClose?: () => void }

/**
 * Angular wrapper for Core Banner.
 *
 * Projected content becomes the message; give action buttons `slot="actions"`.
 */
const meta: Meta<TNgBannerStoryMeta> = {
  title: '✅ Banner',
  id: 'banner',
  parameters: { controls: { sort: 'alpha' } },
  component: AltBanner,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    moduleMetadata: { imports: [AltButton] },
    props: { ...args },
    template: `
      <AltBanner
        [variant]="variant"
        [layout]="layout"
        [title]="title"
        [description]="description"
        [icon]="icon"
        [hideIcon]="hideIcon"
        [closable]="closable"
        [closeLabel]="closeLabel"
        (close)="onClose?.()"
      >
        @if (isActionsSlotExists) {
          <AltButton slot="actions" size="small" variant="primary" label="Primary action"></AltButton>
          
          <AltButton slot="actions" size="small" variant="outline" label="Secondary action"></AltButton>
        }
      </AltBanner>
    `,
  }),
  argTypes: altCoreBannerStoryMeta.argTypes,
  args: altCoreBannerStoryMeta.args,
}

export default meta
type Story = StoryObj<TNgBannerStoryMeta>

export const Playground: Story = { args: {} }
