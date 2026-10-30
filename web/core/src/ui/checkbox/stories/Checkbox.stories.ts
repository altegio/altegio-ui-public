import { html, nothing } from 'lit'
import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from 'storybook/preview-api'
import { omit } from 'radash'

import { type IAltCoreCheckboxExternalProps } from '~core/ui/checkbox/models/types'
import altCoreSimpleCheckboxStoryMeta from '~core/ui/simpleCheckbox/stories/SimpleCheckbox.stories'
import { type TAltCoreCheckboxEvents } from '~core/ui/checkbox/models/types'
import { AltCoreCheckboxTagName as tagName } from '~shared/constants'

import type { IAltCoreLabelStoryProps, IAltCoreLabelStorySlots } from '~core/ui/label/stories/Label.stories'
import altCoreLabelStoryMeta from '~core/ui/label/stories/Label.stories'
import type { IAltCoreAnnotationStoryProps } from '~core/ui/annotation/stories/Annotation.stories'
import altCoreAnnotationStoryMeta from '~core/ui/annotation/stories/Annotation.stories'
import altCoreErrorStoryMeta, { type IAltCoreErrorStoryProps } from '~core/ui/error/stories/Error.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import type { IAltCoreSimpleCheckboxExternalProps } from '~core/ui/simpleCheckbox/models/types'
import { internalPropsKeys } from '~core/ui/simpleCheckbox/models/types'
import { internalPropsKeys as labelInternalPropsKeys } from '~core/ui/label/models/types'

import '~core/ui/checkbox'

export interface IAltCoreCheckboxStoryProps extends
  IAltCoreSimpleCheckboxExternalProps,
  IAltCoreLabelStoryProps,
  IAltCoreAnnotationStoryProps,
  IAltCoreCheckboxExternalProps,
  IAltCoreErrorStoryProps {}

export interface IAltCoreCheckboxStoryEvents extends TAltCoreCheckboxEvents {}
export interface IAltCoreCheckboxStorySlots extends IAltCoreLabelStorySlots {}

export type TAltCoreCheckboxStoryMeta = IAltCoreCheckboxStoryProps & IAltCoreCheckboxStoryEvents & IAltCoreCheckboxStorySlots

const altCoreLabelStoryMetaOmitKeys = [
  'text',
  'tooltipText',
  'debounce',
  'tooltipPlacement',
  ...labelInternalPropsKeys,
] as const

/**
 * ## Core Checkbox
 * Checkbox with a label and supporting text
 *
 */
const meta: Meta<TAltCoreCheckboxStoryMeta> = {
  title: '✅ Checkbox',
  id: 'checkbox',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    size,
    disabled,
    labelText,
    labelTooltipText,
    annotationText,
    alignment,
    isLongText,
    errors,
    labelOverflowDebounce,
    showErrors,
    required,
    labelTooltipPlacement,
    tooltipContentSlot,
  }) => {
    const [
      args,
      updateArgs,
    ] = useArgs<TAltCoreCheckboxStoryMeta>()

    const { checked, indeterminate } = args
    const onChecked = () => {
      updateArgs({ ...args, checked: !checked })
    }

    return html`
      <alt-core-checkbox
        .size=${size}
        .labelText=${isLongText ? LOREM_IPSUM : labelText}
        .labelTooltipText=${isLongText ? LOREM_IPSUM : labelTooltipText}
        .alignment=${alignment}
        .labelOverflowDebounce=${labelOverflowDebounce}
        .errors=${errors ?? showErrors}
        .checked=${checked}
        .indeterminate=${indeterminate}
        .disabled=${disabled}
        .required=${required}
        .labelTooltipPlacement=${labelTooltipPlacement}
        @checked=${onChecked}
      >
        ${annotationText
          ? html`<div slot="annotation">${isLongText ? LOREM_IPSUM : annotationText}</div>`
          : nothing
        }

        <span slot="tooltip-content">${tooltipContentSlot}</span> 
      </alt-core-checkbox>
    `
  },
  argTypes: {
    ...omit(
      altCoreSimpleCheckboxStoryMeta.argTypes ?? {},
      ['error', ...internalPropsKeys],
    ),

    ...omit(
      altCoreLabelStoryMeta.argTypes ?? {},
      [...altCoreLabelStoryMetaOmitKeys],
    ),
    labelText: altCoreLabelStoryMeta.argTypes?.text ?? {},
    labelTooltipText: altCoreLabelStoryMeta.argTypes?.tooltipText ?? {},
    labelOverflowDebounce: altCoreLabelStoryMeta.argTypes?.debounce ?? {},
    labelTooltipPlacement: altCoreLabelStoryMeta.argTypes?.tooltipPlacement ?? {},

    ...omit(
      altCoreAnnotationStoryMeta.argTypes ?? {},
      ['text'],
    ),
    annotationText: altCoreAnnotationStoryMeta.argTypes?.text ?? {},

    ...altCoreErrorStoryMeta.argTypes ?? {},
  },
  args: {
    ...omit(
      altCoreSimpleCheckboxStoryMeta.args ?? {},
      ['error', ...internalPropsKeys],
    ),

    ...omit(
      altCoreLabelStoryMeta.args ?? {},
      [...altCoreLabelStoryMetaOmitKeys],
    ),
    labelText: 'Label text',
    labelTooltipText: 'Tooltip text',
    labelOverflowDebounce: altCoreLabelStoryMeta.args?.debounce,
    labelTooltipPlacement: altCoreLabelStoryMeta.args?.tooltipPlacement,

    ...omit(
      altCoreAnnotationStoryMeta.args ?? {},
      ['text'],
    ),
    annotationText: 'Annotation text',

    isLongText: altCoreLabelStoryMeta.args?.isLongText,
    showErrors: altCoreErrorStoryMeta.args?.showErrors,
    onChecked: fn(),
  },
} satisfies Meta<TAltCoreCheckboxStoryMeta>

export default meta
type Story = StoryObj<TAltCoreCheckboxStoryMeta>

export const Playground: Story = {}
