import type { Meta, StoryObj } from '@storybook/angular'
import { action } from 'storybook/actions'

import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { EFrameworkName } from '~shared/.storybook/enums/frameworkName'

import {
  createButtonDropdownParameters,
  BUTTON_DROPDOWN_STORIES_CONFIG,
} from '~core/ui/buttonDropdown/stories/ButtonDropdown.stories.utils'
import altCoreButtonDropdownStoryMeta from '~core/ui/buttonDropdown/stories/ButtonDropdown.stories'
import { EAltCoreButtonDropdownIconTypes } from '~core/ui/buttonDropdown/models/types/internal'
import { EAltCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'

import type { ItemClickEvent, IAltNgButtonDropdownProps, VisibleEvent } from '~ng/ui/buttonDropdown/models/types'
import { AltButtonDropdown } from '~ng/ui/buttonDropdown'

const meta: Meta<IAltNgButtonDropdownProps> = {
  title: 'Buttons/🔍 ButtonDropdown',
  id: 'buttonDropdown',
  parameters: createButtonDropdownParameters(EFrameworkName.ANGULAR),
  component: AltButtonDropdown,
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
          <AltButtonDropdown
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
          </AltButtonDropdown>
        </div>
      `,
    }
  },
  argTypes: { ...altCoreButtonDropdownStoryMeta.argTypes },
  args: { ...altCoreButtonDropdownStoryMeta.args },
} satisfies Meta<IAltNgButtonDropdownProps>

export default meta
type Story = StoryObj<AltButtonDropdown>

export const Playground: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.Playground.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Playground.args,
}

export const Variants: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.args,
  render: (args) => ({
    props: { items: args.items, variants: Object.values(EAltCoreSimpleButtonVariant) },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <ng-container *ngFor="let variant of variants">
          <AltButtonDropdown
            [items]="items"
            [variant]="variant"
            [label]="variant"
          >
          </AltButtonDropdown>
        </ng-container>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.States.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.Variants.args,
  render: (args) => ({
    components: { AltButtonDropdown },
    props: { items: args.items },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltButtonDropdown [items]="items" label="Default"></AltButtonDropdown>

        <AltButtonDropdown [items]="items" label="Disabled" [disabled]="true"></AltButtonDropdown>
        
        <AltButtonDropdown [items]="items" label="Loading" [loading]="true"></AltButtonDropdown>

        <AltButtonDropdown [items]="items" label="Open" [isOpen]="true"></AltButtonDropdown>
      </div>
    `,
  }),
}

export const IconType: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.IconType.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.IconType.args,
  render: (args) => ({
    components: { AltButtonDropdown },
    props: { items: args.items, label: args.label, EAltCoreButtonDropdownIconTypes },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltButtonDropdown
          [items]="items"
          [label]="label"
          [iconType]="EAltCoreButtonDropdownIconTypes.LEFT"
        ></AltButtonDropdown>

        <AltButtonDropdown
          [items]="items"
          [label]="label"
          [iconType]="EAltCoreButtonDropdownIconTypes.RIGHT"
        ></AltButtonDropdown>
      </div>
    `,
  }),
}

export const FullWidth: Story = {
  parameters: BUTTON_DROPDOWN_STORIES_CONFIG.FullWidth.parameters,
  args: BUTTON_DROPDOWN_STORIES_CONFIG.FullWidth.args,
  render: (args) => ({
    components: { AltButtonDropdown },
    props: { items: args.items },
    template: `
      <div style="min-height: 100px;">
        <AltButtonDropdown
          label="Full-width button"
          [fullWidth]="true"
          [items]="items"
        ></AltButtonDropdown>
      </div>
    `,
  }),
}
