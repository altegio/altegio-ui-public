import type { Meta, StoryObj } from '@storybook/vue3'
import { AltBanner } from '~vue/ui/banner'
import { AltButton } from '~vue/ui/button'
import type { IAltVueBannerProps } from '~vue/ui/banner/models/types'
import altCoreBannerStoryMeta, { type IAltCoreBannerStoryProps } from '~core/ui/banner/stories/Banner.stories'

type TVueBannerStoryMeta = IAltVueBannerProps & Pick<IAltCoreBannerStoryProps, 'isActionsSlotExists'> & { onClose?: () => void }

/**
 * Vue wrapper for Core Banner.
 *
 * Put action buttons into the `actions` slot and handle `@close` to hide a closable banner.
 */
const meta: Meta<TVueBannerStoryMeta> = {
  title: '✅ Banner',
  id: 'banner',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltBanner, AltButton },
    setup() {
      return { args }
    },
    template: `
      <AltBanner v-bind="args" @close="args.onClose">
        <template v-if="args.isActionsSlotExists" #actions>
          <AltButton size="small" variant="primary" label="Primary action" />
          
          <AltButton size="small" variant="outline" label="Secondary action" />
        </template>
      </AltBanner>
    `,
  }),
  argTypes: altCoreBannerStoryMeta.argTypes,
  args: altCoreBannerStoryMeta.args,
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const RichContent: Story = {
  render: () => ({
    components: { AltBanner },
    template: `
      <AltBanner variant="warning" title="Check the tax settings">
        The VAT rate changed on 1 January. <a href="#settings">Open the settings</a> to update your price lists.
      </AltBanner>
    `,
  }),
}
