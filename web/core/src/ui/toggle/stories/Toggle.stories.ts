import { html, nothing } from 'lit'
import { fn } from '@storybook/test'
import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/toggle'

import {
  type IYCoreToggleExternalProps,
  type TYCoreToggleEvents,
} from '../models/types'
import yCoreSimpleToggleStoryMeta from '~core/ui/simpleToggle/stories/SimpleToggle.stories'
import { YCoreToggleTagName as tagName } from '~shared/constants'

import { omit } from 'radash'
import yCoreLabelStoryMeta, { type IYCoreLabelStorySlots } from '~core/ui/label/stories/Label.stories'
import yCoreAnnotationStoryMeta from '~core/ui/annotation/stories/Annotation.stories'
import type { ITextStoryProps } from '~shared/.storybook/argTypes'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { internalPropsKeys as simpleToggleInternalPropsKeys } from '~core/ui/simpleToggle/models/types'
import { internalPropsKeys as labelInternalPropsKeys } from '~core/ui/label/models/types'

export interface IYCoreToggleStoryProps extends IYCoreToggleExternalProps, ITextStoryProps {}
export interface IYCoreToggleStoryEvents extends TYCoreToggleEvents {}
export interface IYCoreToggleStorySlots extends IYCoreLabelStorySlots {}

type TYCoreToggleStoryMeta = IYCoreToggleStoryProps & IYCoreToggleStoryEvents & IYCoreToggleStorySlots

const yCoreLabelStoryMetaOmitKeys = [
  'text',
  'tooltipText',
  'debounce',
  'tooltipPlacement',
  ...labelInternalPropsKeys,
] as const

const meta: Meta<TYCoreToggleStoryMeta> = {
  title: '✅ Toggle',
  id: 'toggle',
  parameters: { controls: { expanded: true, sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    labelText,
    labelTooltipText,
    annotationText,
    disabled,
    alignment,
    isLongText,
    labelOverflowDebounce,
    size,
    tooltipContentSlot,
  }) => {
    const [
      args,
      updateArgs,
    ] = useArgs<TYCoreToggleStoryMeta>()

    const { checked } = args
    const onChange = () => {
      updateArgs({ ...args, checked: !checked })
    }

    return html`
      <y-core-toggle
        .checked=${checked}
        .labelText=${isLongText ? LOREM_IPSUM : labelText}
        .labelTooltipText=${labelTooltipText}
        .annotationText=${annotationText}
        .alignment=${alignment}
        .labelOverflowDebounce=${labelOverflowDebounce}
        .size=${size}
        .disabled=${disabled}
        @checked=${onChange}
      >
        ${annotationText
          ? html`<div slot="annotation">${isLongText ? LOREM_IPSUM : annotationText}</div>`
          : nothing
        }

        <span slot="tooltip-content">${tooltipContentSlot}</span> 
      </y-core-toggle>
    `
  },
  argTypes: {
    ...omit(
      yCoreLabelStoryMeta.argTypes ?? {},
      [...yCoreLabelStoryMetaOmitKeys],
    ),
    labelText: yCoreLabelStoryMeta.argTypes?.text ?? {},
    labelTooltipText: yCoreLabelStoryMeta.argTypes?.tooltipText ?? {},
    labelOverflowDebounce: yCoreLabelStoryMeta.argTypes?.debounce ?? {},

    ...omit(
      yCoreAnnotationStoryMeta.argTypes ?? {},
      ['text'],
    ),

    annotationText: yCoreAnnotationStoryMeta.argTypes?.text ?? {},
    ...omit(
      yCoreSimpleToggleStoryMeta.argTypes ?? {},
      [...simpleToggleInternalPropsKeys],
    ),
  },
  args: {
    ...omit(
      yCoreSimpleToggleStoryMeta.args ?? {},
      [...simpleToggleInternalPropsKeys],
    ),

    ...omit(
      yCoreLabelStoryMeta.args ?? {},
      [...yCoreLabelStoryMetaOmitKeys],
    ),

    labelText: 'Текст лейбла',
    labelTooltipText: 'Текст тултипа',
    labelOverflowDebounce: yCoreLabelStoryMeta.args?.debounce,
    ...omit(
      yCoreAnnotationStoryMeta.args ?? {},
      ['text'],
    ),
    annotationText: 'Текст аннотации',

    onChecked: fn(),
    isLongText: false,
  },
} satisfies Meta<TYCoreToggleStoryMeta>

export default meta
type Story = StoryObj<TYCoreToggleStoryMeta>

export const Playground: Story = {}
