import type { Meta, StoryObj } from '@storybook/angular'

import altCoreTabsStoryMeta, { type TAltCoreTabsStoryMeta } from '~core/ui/tabs/stories/Tabs.stories.ts'

import type { IAltNgTabsProps } from '~ng/ui/tabs'
import { AltTabs } from '~ng/ui/tabs'
import { AltTab } from '~ng/ui/tab'

type TAltNgTabsMeta = AltTabs & IAltNgTabsProps & TAltCoreTabsStoryMeta

/**
 * Angular wrapper for Tabs
 */
const meta: Meta<TAltNgTabsMeta> = {
  title: '⚙️ Tabs',
  id: 'tabs',
  parameters: { controls: { sort: 'alpha' } },
  component: AltTabs,
  tags: [
    'angular',
    'autodocs',
  ],
  // TODO: Changing the value through controls re-renders the whole
  //  component, so the transition animation does not play
  render: (args) => {
    const valueRef = { current: args.value }

    const clickTabHandler = (newIdx: number) => {
      valueRef.current = newIdx
    }

    return {
      moduleMetadata: { imports: [AltTab] },
      props: {
        ...args,
        valueRef,
        clickTabHandler,
      },
      template: `
        <AltTabs
          [tabs]="tabs"
          [(value)]="valueRef.current"
        >
          @if (showDefaultSlot) {
            <ng-template #tabsDefault>
              <AltTab
                *ngFor="let tab of tabs.slice(0, 3); let i = index"
                [tagVariant]="tab.agVariant"
                [counterValue]="tab.counterValue"
                [leftIcon]="tab.leftIcon"
                [leftIconSize]="tab.leftIconSize"
                [text]="tab.text"
                [active]="i === valueRef.current"
                [disabled]="tab.disabled"
                [isTagVisible]="tab.isTagVisible"
                [tagText]="tab.tagText"
                [isCounterVisible]="tab.isCounterVisible"
                (click)="clickTabHandler(i)"
              ></AltTab>
            </ng-template>
          }
        </AltTabs>`,
    }
  },
  argTypes: { ...altCoreTabsStoryMeta.argTypes },
  args: { ...altCoreTabsStoryMeta.args, value: 0 },
} satisfies Meta<TAltNgTabsMeta>

export default meta
type Story = StoryObj<TAltNgTabsMeta>

export const Playground: Story = { args: {} }

