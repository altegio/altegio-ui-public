import { html, nothing } from 'lit'
import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from 'storybook/preview-api'
import { omit } from 'radash'

import {
  type TAltCoreRadioButtonEvents,
  type IAltCoreRadioButtonExternalProps,
} from '~core/ui/radioButton/models/types'
import altCoreSimpleRadioButtonStoryMeta from '~core/ui/simpleRadioButton/stories/SimpleRadioButton.stories'
import { AltCoreRadioButtonTagName as tagName } from '~shared/constants'

import altCoreLabelStoryMeta, { type IAltCoreLabelStoryProps, type IAltCoreLabelStorySlots } from '~core/ui/label/stories/Label.stories'
import altCoreAnnotationStoryMeta, { type IAltCoreAnnotationStoryProps } from '~core/ui/annotation/stories/Annotation.stories'
import altCoreErrorStoryMeta, { type IAltCoreErrorStoryProps } from '~core/ui/error/stories/Error.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import type { IAltCoreSimpleRadioButtonExternalProps } from '~core/ui/simpleRadioButton/models/types'
import { internalPropsKeys as simpleRadioButtonInternalPropsKeys } from '~core/ui/simpleRadioButton/models/types'
import { internalPropsKeys as labelInternalPropsKeys } from '~core/ui/label/models/types'

import '~core/ui/radioButton'

export interface IAltCoreRadioButtonStoryProps extends
  IAltCoreSimpleRadioButtonExternalProps,
  IAltCoreLabelStoryProps,
  IAltCoreAnnotationStoryProps,
  IAltCoreRadioButtonExternalProps,
  IAltCoreErrorStoryProps {}

export interface IAltCoreRadioButtonStoryEvents extends TAltCoreRadioButtonEvents {}
export interface IAltCoreRadioButtonStorySlots extends IAltCoreLabelStorySlots {}

type TAltCoreRadioButtonStoryMeta = IAltCoreRadioButtonStoryProps & TAltCoreRadioButtonEvents & IAltCoreRadioButtonStorySlots

const altCoreLabelStoryMetaOmitKeys = [
  'text',
  'tooltipText',
  'debounce',
  'tooltipPlacement',
  ...labelInternalPropsKeys,
] as const

/**
 * ## Core RadioButton
 * Radio button with a label and supporting text
 *
 */
const meta: Meta<TAltCoreRadioButtonStoryMeta> = {
  title: '✅ RadioButton',
  id: 'radioButton',
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
    tooltipContentSlot,
  }) => {
    const [
      args,
      updateArgs,
    ] = useArgs<TAltCoreRadioButtonStoryMeta>()

    const { checked } = args
    const onChecked = () => {
      updateArgs({ ...args, checked: !checked })
    }

    return html`
      <alt-core-radio-button
        .size=${size}
        .labelText=${isLongText ? LOREM_IPSUM : labelText}
        .labelTooltipText=${isLongText ? LOREM_IPSUM : labelTooltipText}
        .alignment=${alignment}
        .labelOverflowDebounce=${labelOverflowDebounce}
        .errors=${errors ?? showErrors}
        .checked=${checked}
        .disabled=${disabled}
        .required=${required}
        @checked=${onChecked}
      >
        ${annotationText
          ? html`<div slot="annotation">${isLongText ? LOREM_IPSUM : annotationText}</div>`
          : nothing
        }

        <span slot="tooltip-content">${tooltipContentSlot}</span> 
      </alt-core-radio-button>
    `
  },
  argTypes: {
    ...omit(
      altCoreSimpleRadioButtonStoryMeta.argTypes ?? {},
      ['error', ...simpleRadioButtonInternalPropsKeys],
    ),

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

    ...altCoreErrorStoryMeta.argTypes ?? {},
  },
  args: {
    ...omit(
      altCoreSimpleRadioButtonStoryMeta.args ?? {},
      ['error', ...simpleRadioButtonInternalPropsKeys],
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

    isLongText: altCoreLabelStoryMeta.args?.isLongText,
    showErrors: altCoreErrorStoryMeta.args?.showErrors,
    onChecked: fn(),
  },
} satisfies Meta<TAltCoreRadioButtonStoryMeta>

export default meta
type Story = StoryObj<TAltCoreRadioButtonStoryMeta>

export const Playground: Story = {}
