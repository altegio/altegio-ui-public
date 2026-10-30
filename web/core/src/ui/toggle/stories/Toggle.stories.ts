import { html, nothing } from 'lit'
import { fn } from 'storybook/test'
import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/toggle'

import {
  type IAltCoreToggleExternalProps,
  type TAltCoreToggleEvents,
} from '../models/types'
import altCoreSimpleToggleStoryMeta from '~core/ui/simpleToggle/stories/SimpleToggle.stories'
import { AltCoreToggleTagName as tagName } from '~shared/constants'

import { omit } from 'radash'
import altCoreLabelStoryMeta, { type IAltCoreLabelStorySlots } from '~core/ui/label/stories/Label.stories'
import altCoreAnnotationStoryMeta from '~core/ui/annotation/stories/Annotation.stories'
import type { ITextStoryProps } from '~shared/.storybook/argTypes'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { internalPropsKeys as simpleToggleInternalPropsKeys } from '~core/ui/simpleToggle/models/types'
import { internalPropsKeys as labelInternalPropsKeys } from '~core/ui/label/models/types'

export interface IAltCoreToggleStoryProps extends IAltCoreToggleExternalProps, ITextStoryProps {}
export interface IAltCoreToggleStoryEvents extends TAltCoreToggleEvents {}
export interface IAltCoreToggleStorySlots extends IAltCoreLabelStorySlots {}

type TAltCoreToggleStoryMeta = IAltCoreToggleStoryProps & IAltCoreToggleStoryEvents & IAltCoreToggleStorySlots

const altCoreLabelStoryMetaOmitKeys = [
  'text',
  'tooltipText',
  'debounce',
  'tooltipPlacement',
  ...labelInternalPropsKeys,
] as const

const meta: Meta<TAltCoreToggleStoryMeta> = {
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
    ] = useArgs<TAltCoreToggleStoryMeta>()

    const { checked } = args
    const onChange = () => {
      updateArgs({ ...args, checked: !checked })
    }

    return html`
      <alt-core-toggle
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
      </alt-core-toggle>
    `
  },
  argTypes: {
    ...omit(
      altCoreLabelStoryMeta.argTypes ?? {},
      [...altCoreLabelStoryMetaOmitKeys],
    ),
    labelText: altCoreLabelStoryMeta.argTypes?.text ?? {},
    labelTooltipText: altCoreLabelStoryMeta.argTypes?.tooltipText ?? {},
    labelOverflowDebounce: altCoreLabelStoryMeta.argTypes?.debounce ?? {},

    ...omit(
      altCoreAnnotationStoryMeta.argTypes ?? {},
      ['text'],
    ),

    annotationText: altCoreAnnotationStoryMeta.argTypes?.text ?? {},
    ...omit(
      altCoreSimpleToggleStoryMeta.argTypes ?? {},
      [...simpleToggleInternalPropsKeys],
    ),
  },
  args: {
    ...omit(
      altCoreSimpleToggleStoryMeta.args ?? {},
      [...simpleToggleInternalPropsKeys],
    ),

    ...omit(
      altCoreLabelStoryMeta.args ?? {},
      [...altCoreLabelStoryMetaOmitKeys],
    ),

    labelText: 'Label text',
    labelTooltipText: 'Tooltip text',
    labelOverflowDebounce: altCoreLabelStoryMeta.args?.debounce,
    ...omit(
      altCoreAnnotationStoryMeta.args ?? {},
      ['text'],
    ),
    annotationText: 'Annotation text',

    onChecked: fn(),
    isLongText: false,
  },
} satisfies Meta<TAltCoreToggleStoryMeta>

export default meta
type Story = StoryObj<TAltCoreToggleStoryMeta>

export const Playground: Story = {}
