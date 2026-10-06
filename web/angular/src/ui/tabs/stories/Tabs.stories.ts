import type { Meta, StoryObj } from '@storybook/angular'

import yCoreTabsStoryMeta, { type TYCoreTabsStoryMeta } from '~core/ui/tabs/stories/Tabs.stories.ts'

import type { IYNgTabsProps } from '~ng/ui/tabs'
import { YTabs } from '~ng/ui/tabs'
import { YTab } from '~ng/ui/tab'

type TYNgTabsMeta = YTabs & IYNgTabsProps & TYCoreTabsStoryMeta

/**
 * Angular-обертка над Tabs
 */
const meta: Meta<TYNgTabsMeta> = {
  title: '⚙️ Tabs',
  id: 'tabs',
  parameters: { controls: { sort: 'alpha' } },
  component: YTabs,
  tags: [
    'angular',
    'autodocs',
  ],
  // TODO при изменении value через controls происходит перерисовка всего
  //  компонента и плавная анимация не работает PFW-1520
  render: (args) => {
    const valueRef = { current: args.value }

    const clickTabHandler = (newIdx: number) => {
      valueRef.current = newIdx
    }

    return {
      moduleMetadata: { imports: [YTab] },
      props: {
        ...args,
        valueRef,
        clickTabHandler,
      },
      template: `
        <YTabs
          [tabs]="tabs"
          [(value)]="valueRef.current"
        >
          @if (showDefaultSlot) {
            <ng-template #tabsDefault>
              <YTab
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
              ></YTab>
            </ng-template>
          }
        </YTabs>`,
    }
  },
  argTypes: { ...yCoreTabsStoryMeta.argTypes },
  args: { ...yCoreTabsStoryMeta.args, value: 0 },
} satisfies Meta<TYNgTabsMeta>

export default meta
type Story = StoryObj<TYNgTabsMeta>

export const Playground: Story = { args: {} }

