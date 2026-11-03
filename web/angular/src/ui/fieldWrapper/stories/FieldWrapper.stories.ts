import type { Meta, StoryObj } from '@storybook/angular'

import { AltFieldWrapper } from '~ng/ui/fieldWrapper'
import altCoreFieldWrapperStoryMeta from '~core/ui/fieldWrapper/stories/FieldWrapper.stories'

import '~core/ui/fieldAvatar'
import '~core/ui/fieldIcon'
import '~core/ui/fieldInput'

import { altChevronDown } from '~shared/icons'

import { omit } from 'radash'
import { action } from 'storybook/actions'

/**
 * Angular wrapper for Core FieldWrapper
 */
const meta: Meta<AltFieldWrapper> = {
  title: 'Inputs/Partials/🔍 FieldWrapper',
  id: 'fieldWrapper',
  parameters: { controls: { sort: 'alpha' } },
  component: AltFieldWrapper,
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
        altChevronDown,
      },
      template: `
        <AltFieldWrapper
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
            <alt-core-field-avatar photo="https://i.pravatar.cc/100" initials="Altegio Clients"></alt-core-field-avatar>
          }
          @if (showFieldInput) {
            <alt-core-field-input value="Default value" [hideSpaceLeft]="showFieldAvatar" [hideSpaceRight]="showFieldIcon"></alt-core-field-input>
          }
          @if (showFieldIcon) {
            <alt-core-field-icon [icon]="altChevronDown"></alt-core-field-icon>
          }
        </AltFieldWrapper>`,
    }
  },
  argTypes: { ...omit(altCoreFieldWrapperStoryMeta.argTypes ?? {}, ['readonly']) },
  args: { ...omit(altCoreFieldWrapperStoryMeta.args ?? {}, ['readonly']) },
} satisfies Meta<AltFieldWrapper>

export default meta
type Story = StoryObj<AltFieldWrapper>

export const Playground: Story = { args: {} }
