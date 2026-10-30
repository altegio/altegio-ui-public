import type { Meta, StoryObj } from '@storybook/vue3'

import { AltColorIcon } from '~vue/ui/colorIcon'
import { type IAltVueColorIconProps } from '~vue/ui/colorIcon/models/types'
import altCoreColorIconStoryMeta from '~core/ui/colorIcon/stories/ColorIcon.stories'
import { EAltCoreColorIconVariant, EAltCoreColorIconSize } from '~core/ui/colorIcon/models/types'

import {
  createVueColorIconParameters,
  COLOR_ICON_STORIES_CONFIG,
  defaultIcon,
} from './ColorIcon.stories.utils'

type TVueColorIconStoryMeta = IAltVueColorIconProps

const meta: Meta<TVueColorIconStoryMeta> = {
  title: 'Icons/⚠️ ColorIcon',
  id: 'colorIcon',
  parameters: createVueColorIconParameters(),
  tags: [
    'vue',
    'autodocs',
  ],
  component: AltColorIcon,
  argTypes: { ...altCoreColorIconStoryMeta.argTypes },
  args: { ...altCoreColorIconStoryMeta.args },
}

export default meta

type Story = StoryObj<TVueColorIconStoryMeta>

export const Playground: Story = { parameters: COLOR_ICON_STORIES_CONFIG.Playground.parameters }

export const Variants: Story = {
  parameters: COLOR_ICON_STORIES_CONFIG.Variants.parameters,
  render: () => ({
    components: { AltColorIcon },
    setup() {
      return {
        defaultIcon,
        variants: EAltCoreColorIconVariant,
      }
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <AltColorIcon
          v-for="variant in variants"
          :key="variant"
          :variant="variant"
          :icon="defaultIcon"
        />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: COLOR_ICON_STORIES_CONFIG.Sizes.parameters,
  render: () => ({
    components: { AltColorIcon },
    setup() {
      return {
        defaultIcon,
        sizes: EAltCoreColorIconSize,
      }
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <AltColorIcon
          v-for="size in sizes"
          :key="size"
          :size="size"
          :icon="defaultIcon"
        />
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: COLOR_ICON_STORIES_CONFIG.States.parameters,
  render: () => ({
    components: { AltColorIcon },
    setup() {
      return { defaultIcon }
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <AltColorIcon disabled="true" :icon="defaultIcon" />
        
        <AltColorIcon variant="false" :icon="defaultIcon" />
      </div>
    `,
  }),
}
