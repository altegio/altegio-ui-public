import type { Meta, StoryObj } from '@storybook/angular'

import { YFieldWrapper } from '~ng/ui/fieldWrapper'
import yCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'

import '~core/ui/fieldAvatar'
import '~core/ui/fieldIcon'
import '~core/ui/fieldInput'

import { yChevronDown } from '~shared/icons'

import { omit } from 'radash'
import { action } from '@storybook/addon-actions'

/**
 * Angular-обертка над Core FieldWrapper
 */
const meta: Meta<YFieldWrapper> = {
  title: 'Inputs/Partials/🔍 FieldWrapper',
  id: 'fieldWrapper',
  parameters: { controls: { sort: 'alpha' } },
  component: YFieldWrapper,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const handlers = {
      onFocus: action('focus'),
      onBlur: action('blur'),
      onMouseEnter: action('mouse-enter'),
      onMouseLeave: action('mouse-leave'),
      onClick: action('click'),
      onClickOutside: action('click-outside'),
    }

    return {
      props: {
        ...args,
        ...handlers,
        yChevronDown,
      },
      template: `
        <YFieldWrapper
          [disabled]="disabled"
          [readonly]="readonly"
          [error]="error"
          [size]="size"
          [clickable]="clickable"
          (click)="onClick($event)"
          (click-outside)="onClickOutside($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          (mouse-enter)="onMouseEnter($event)"
          (mouse-leave)="onMouseLeave($event)"
        >
          @if (showFieldAvatar) {
            <y-core-field-avatar photo="https://i.pravatar.cc/100" initials="Altegio Clients"></y-core-field-avatar>
          }
          @if (showFieldInput) {
            <y-core-field-input value="Default value" [hideSpaceLeft]="showFieldAvatar" [hideSpaceRight]="showFieldIcon"></y-core-field-input>
          }
          @if (showFieldIcon) {
            <y-core-field-icon [icon]="yChevronDown"></y-core-field-icon>
          }
        </YFieldWrapper>`,
    }
  },
  argTypes: { ...omit(yCoreFieldWrapperStoryMeta.argTypes ?? {}, ['readonly']) },
  args: { ...omit(yCoreFieldWrapperStoryMeta.args ?? {}, ['readonly']) },
} satisfies Meta<YFieldWrapper>

export default meta
type Story = StoryObj<YFieldWrapper>

export const Playground: Story = { args: {} }
