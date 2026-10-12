import type { Meta, StoryObj } from '@storybook/vue3'

import { YColorIcon } from '~vue/ui/colorIcon'
import { type IYVueColorIconProps } from '~vue/ui/colorIcon/models/types'
import yCoreColorIconStoryMeta from '~core/ui/colorIcon/stories/ColorIcon.stories'
import { EYCoreColorIconVariant, EYCoreColorIconSize } from '~core/ui/colorIcon/models/types'

import {
  createVueColorIconParameters,
  COLOR_ICON_STORIES_CONFIG,
  defaultIcon,
} from './ColorIcon.stories.utils'

type TVueColorIconStoryMeta = IYVueColorIconProps

const meta: Meta<TVueColorIconStoryMeta> = {
  title: 'Icons/⚠️ ColorIcon',
  id: 'colorIcon',
  parameters: createVueColorIconParameters(),
  tags: [
    'vue',
    'autodocs',
  ],
  component: YColorIcon,
  argTypes: { ...yCoreColorIconStoryMeta.argTypes },
  args: { ...yCoreColorIconStoryMeta.args },
}

export default meta

type Story = StoryObj<TVueColorIconStoryMeta>

export const Playground: Story = { parameters: COLOR_ICON_STORIES_CONFIG.Playground.parameters }

export const Variants: Story = {
  parameters: COLOR_ICON_STORIES_CONFIG.Variants.parameters,
  render: () => ({
    components: { YColorIcon },
    setup() {
      return {
        defaultIcon,
        variants: EYCoreColorIconVariant,
      }
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <YColorIcon
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
    components: { YColorIcon },
    setup() {
      return {
        defaultIcon,
        sizes: EYCoreColorIconSize,
      }
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <YColorIcon
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
    components: { YColorIcon },
    setup() {
      return { defaultIcon }
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <YColorIcon disabled="true" :icon="defaultIcon" />
        
        <YColorIcon variant="false" :icon="defaultIcon" />
      </div>
    `,
  }),
}
