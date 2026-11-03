import type { Meta, StoryObj } from '@storybook/angular'

import type { IAltNgTabProps } from '~ng/ui/tab'
import { AltTab } from '~ng/ui/tab'
import { AltIcon } from '~ng/ui/icon'
import { AltTag } from '~ng/ui/tag'
import altCoreTabStoryMeta from '~core/ui/tab/stories/Tab.stories.ts'
import { EAltCoreTagVariant } from '~core/ui/tag/models/types'
import { EAltSizes } from '~shared/types/global.ts'
import { altAi } from '~shared/icons'

/**
 * Angular wrapper for Core Tab
 */
const meta: Meta<IAltNgTabProps> = {
  title: '⚙️ Tab',
  id: 'tab',
  parameters: { controls: { sort: 'alpha' } },
  component: AltTab,
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    moduleMetadata: { imports: [AltIcon, AltTag] },
    props: { ...args, altAi, EAltCoreTagVariant, EAltSizes },
    template: `
      <AltTab
        [tagVariant]="tagVariant"
        [counterValue]="counterValue"
        [leftIcon]="leftIcon"
        [leftIconSize]="leftIconSize"
        [text]="text"
        [active]="active"
        [disabled]="disabled"
        [isTagVisible]="isTagVisible"
        [tagText]="tagText"
        [isCounterVisible]="isCounterVisible"
        [locator]="locator"
        [locatorTag]="locatorTag"
        [locatorCounter]="locatorCounter"
      >
        @if (showBeforeSlot) {
          <ng-template #tabBefore>
            <AltIcon [icon]="altAi" size="16px"></AltIcon>
          </ng-template>
        }
  
        @if (showAfterSlot) {
          <ng-template #tabAfter>
            <AltTag [variant]="EAltCoreTagVariant.ACCENT" [size]="EAltSizes.SMALL">Slot tag</AltTag>
          </ng-template>
        }
      </AltTab>
    `,
  }),
  argTypes: { ...altCoreTabStoryMeta.argTypes },
  args: { ...altCoreTabStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
