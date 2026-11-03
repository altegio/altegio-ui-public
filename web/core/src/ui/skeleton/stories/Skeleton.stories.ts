import { html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreSkeletonProps,
  EAltCoreSkeletonShape,
  type IAltCoreSkeletonProps,
} from '~core/ui/skeleton/models/types'
import { AltCoreSkeletonTagName as tagName } from '~shared/constants'
import { getComponentContentTable, getComponentStateTable } from '~shared/.storybook/tables'
import { size as sizeArgType } from '~shared/.storybook/argTypes'
import { EAltSizes } from '~shared/types/global'

import '~core/ui/skeleton'

const { size, shape, width, height } = createCoreSkeletonProps()

/**
 * ## Core Skeleton
 * A placeholder that keeps the layout while content loads.
 *
 * - `size` sets a preset height: `small` 12px, `medium` 24px, `large` 32px. Without it, size the skeleton with `width`/`height` or CSS.
 * - Numeric `width` and `height` are pixels; strings are used as CSS lengths.
 * - The skeleton has `aria-hidden="true"`. Mark the loading region with `aria-busy="true"`.
 * - The wave animation stops when the user prefers reduced motion.
 */
const meta: Meta<IAltCoreSkeletonProps> = {
  title: '✅ Skeleton',
  id: 'skeleton',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: (args) => html`
    <alt-core-skeleton
      .size=${args.size}
      .shape=${args.shape}
      .width=${args.width}
      .height=${args.height}
    ></alt-core-skeleton>
  `,
  argTypes: {
    size: {
      ...sizeArgType([
        EAltSizes.SMALL,
        EAltSizes.MEDIUM,
        EAltSizes.LARGE,
      ]),
      description: 'Preset height',
      ...getComponentStateTable(size),
    },
    shape: {
      control: { type: 'inline-radio' },
      options: Object.values(EAltCoreSkeletonShape),
      description: '`circle` keeps a 1:1 ratio and rounds the corners fully',
      ...getComponentStateTable(shape),
    },
    width: {
      control: { type: 'text' },
      description: 'Width: a number of pixels or a CSS length',
      ...getComponentContentTable(width),
    },
    height: {
      control: { type: 'text' },
      description: 'Height: a number of pixels or a CSS length. Overrides `size`',
      ...getComponentContentTable(height),
    },
  },
  args: {
    size: EAltSizes.MEDIUM,
    shape,
    width: 240,
    height,
  },
}

export default meta
type Story = StoryObj<IAltCoreSkeletonProps>

export const Playground: Story = {}

export const ListPlaceholder: Story = {
  parameters: { docs: { description: { story: 'Skeletons composed into a list row placeholder inside a busy region.' } } },
  render: () => {
    const rows = repeat(
      [1, 2, 3],
      (row) => row,
      () => html`
        <div style="display: flex; gap: 12px; align-items: center;">
          <alt-core-skeleton shape="circle" size="large"></alt-core-skeleton>

          <div style="display: grid; flex: 1; gap: 8px;">
            <alt-core-skeleton size="small" width="60%"></alt-core-skeleton>

            <alt-core-skeleton size="small" width="40%"></alt-core-skeleton>
          </div>
        </div>
      `,
    )

    return html`
      <div role="region" aria-busy="true" aria-label="Loading clients" style="display: grid; gap: 16px; max-width: 360px;">
        ${rows}
      </div>
    `
  },
}
