import type { Meta, StoryObj } from '@storybook/angular'
import { action } from '@storybook/addon-actions'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { EFrameworkName } from '~shared/.storybook/enums/frameworkName'

import {
  createButtonDropdownParameters,
  BUTTON_DROPDOWN_STORIES_CONFIG,
} from '~core/ui/buttonDropdown/stories/ButtonDropdown.stories.utils'
import yCoreButtonDropdownStoryMeta from '~core/ui/buttonDropdown/stories/ButtonDropdown.stories'
import { EYCoreButtonDropdownIconTypes } from '~core/ui/buttonDropdown/models/types/internal'
import { EYCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'

import type { ItemClickEvent, IYNgButtonDropdownProps, VisibleEvent } from '~ng/ui/buttonDropdown/models/types'
import { YButtonDropdown } from '~ng/ui/buttonDropdown'

const meta: Meta<IYNgButtonDropdownProps> = {
  title: 'Buttons/🔍 ButtonDropdown',
  id: 'buttonDropdown',
  parameters: createButtonDropdownParameters(EFrameworkName.ANGULAR),
  component: YButtonDropdown,
  tags: ['angular', 'autodocs'],
  render: (args) => {
    const handlers = {
      onItemClick: (event: ItemClickEvent) => {
        action('itemClick')(event)
      },
      onChangeVisible: (event: VisibleEvent) => {
        action('changeVisible')(event)
      },
    }

    return {
      props: {
        ...args,
        ...handlers,
        LOREM_IPSUM,
      },
      template: `
      <div style="padding: 50px 50px 350px; margin: 20px; border: 1px dashed black; border-radius: 8px; overflow: auto">
          <YButtonDropdown
            [label]="isLongText ? LOREM_IPSUM : label"
            [variant]="variant"
            [size]="size"
            [disabled]="disabled"
            [loading]="loading"
            [fullWidth]="fullWidth"
            [isOpen]="isOpen"
            [autoClose]="autoClose"
            [items]="items"
            [iconType]="iconType"
            [alignment]="alignment"
            (item-click)="onItemClick($event)"
            (change-visible)="onChangeVisible($event)"
          >
            @if (showActivatorSlot) {
              <div activator>
                ActivatorSlot
              </div>
            }

            @if (showContentSlot) {
              <div content>
                ContentSlot
              </div>
            }
          </YButtonDropdown>
        </div>
      `,
    }
  },
  argTypes: { ...yCoreButtonDropdownStoryMeta.argTypes },
  args: { ...yCoreButtonDropdownStoryMeta.args },
} satisfies Meta<IYNgButtonDropdownProps>

export default meta
type Story = StoryObj<YButtonDropdown>

export const Playground: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.Playground.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Playground.args,
}

export const Variants: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.args,
  render: (args) => ({
    props: { items: args.items, variants: Object.values(EYCoreSimpleButtonVariant) },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <ng-container *ngFor="let variant of variants">
          <YButtonDropdown
            [items]="items"
            [variant]="variant"
            [label]="variant"
          >
          </YButtonDropdown>
        </ng-container>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.States.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.args,
  render: (args) => ({
    components: { YButtonDropdown },
    props: { items: args.items },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YButtonDropdown [items]="items" label="Default"></YButtonDropdown>

        <YButtonDropdown [items]="items" label="Disabled" [disabled]="true"></YButtonDropdown>
        
        <YButtonDropdown [items]="items" label="Loading" [loading]="true"></YButtonDropdown>

        <YButtonDropdown [items]="items" label="Open" [isOpen]="true"></YButtonDropdown>
      </div>
    `,
  }),
}

export const IconType: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.IconType.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.IconType.args,
  render: (args) => ({
    components: { YButtonDropdown },
    props: { items: args.items, label: args.label, EYCoreButtonDropdownIconTypes },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YButtonDropdown
          [items]="items"
          [label]="label"
          [iconType]="EYCoreButtonDropdownIconTypes.LEFT"
        ></YButtonDropdown>

        <YButtonDropdown
          [items]="items"
          [label]="label"
          [iconType]="EYCoreButtonDropdownIconTypes.RIGHT"
        ></YButtonDropdown>
      </div>
    `,
  }),
}

export const FullWidth: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.FullWidth.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.FullWidth.args,
  render: (args) => ({
    components: { YButtonDropdown },
    props: { items: args.items },
    template: `
      <div style="min-height: 100px;">
        <YButtonDropdown
          label="Full-width button"
          [fullWidth]="true"
          [items]="items"
        ></YButtonDropdown>
      </div>
    `,
  }),
}
