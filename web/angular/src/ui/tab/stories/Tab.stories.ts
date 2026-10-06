import type { Meta, StoryObj } from '@storybook/angular'

import type { IYNgTabProps } from '~ng/ui/tab'
import { YTab } from '~ng/ui/tab'
import { YIcon } from '~ng/ui/icon'
import { YTag } from '~ng/ui/tag'
import yCoreTabStoryMeta from '~core/ui/tab/stories/Tab.stories.ts'
import { EYCoreTagVariant } from '~core/ui/tag/models/types'
import { EYSizes } from '~shared/types/global.ts'
import { yAi } from '~shared/icons'

/**
 * Angular-обертка над Core Tab
 */
const meta: Meta<IYNgTabProps> = {
  title: '⚙️ Tab',
  id: 'tab',
  parameters: { controls: { sort: 'alpha' } },
  component: YTab,
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    moduleMetadata: { imports: [YIcon, YTag] },
    props: { ...args, yAi, EYCoreTagVariant, EYSizes },
    template: `
      <YTab
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
            <YIcon [icon]="yAi" size="16px"></YIcon>
          </ng-template>
        }
  
        @if (showAfterSlot) {
          <ng-template #tabAfter>
            <YTag [variant]="EYCoreTagVariant.ACCENT" [size]="EYSizes.SMALL">Slot tag</YTag>
          </ng-template>
        }
      </YTab>
    `,
  }),
  argTypes: { ...yCoreTabStoryMeta.argTypes },
  args: { ...yCoreTabStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
