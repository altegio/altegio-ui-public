import { html, nothing } from 'lit'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from '@storybook/preview-api'
import { omit } from 'radash'

import {
  type TYCoreRadioButtonEvents,
  type IYCoreRadioButtonExternalProps,
} from '~core/ui/radioButton/models/types'
import yCoreSimpleRadioButtonStoryMeta from '~core/ui/simpleRadioButton/stories/SimpleRadioButton.stories'
import { YCoreRadioButtonTagName as tagName } from '~shared/constants'

import yCoreLabelStoryMeta, { type IYCoreLabelStoryProps, type IYCoreLabelStorySlots } from '~core/ui/label/stories/Label.stories'
import yCoreAnnotationStoryMeta, { type IYCoreAnnotationStoryProps } from '~core/ui/annotation/stories/Annotation.stories'
import yCoreErrorStoryMeta, { type IYCoreErrorStoryProps } from '~core/ui/error/stories/Error.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import type { IYCoreSimpleRadioButtonExternalProps } from '~core/ui/simpleRadioButton/models/types'
import { internalPropsKeys as simpleRadioButtonInternalPropsKeys } from '~core/ui/simpleRadioButton/models/types'
import { internalPropsKeys as labelInternalPropsKeys } from '~core/ui/label/models/types'

import '~core/ui/radioButton'

export interface IYCoreRadioButtonStoryProps extends
  IYCoreSimpleRadioButtonExternalProps,
  IYCoreLabelStoryProps,
  IYCoreAnnotationStoryProps,
  IYCoreRadioButtonExternalProps,
  IYCoreErrorStoryProps {}

export interface IYCoreRadioButtonStoryEvents extends TYCoreRadioButtonEvents {}
export interface IYCoreRadioButtonStorySlots extends IYCoreLabelStorySlots {}

type TYCoreRadioButtonStoryMeta = IYCoreRadioButtonStoryProps & TYCoreRadioButtonEvents & IYCoreRadioButtonStorySlots

const yCoreLabelStoryMetaOmitKeys = [
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
const meta: Meta<TYCoreRadioButtonStoryMeta> = {
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
    ] = useArgs<TYCoreRadioButtonStoryMeta>()

    const { checked } = args
    const onChecked = () => {
      updateArgs({ ...args, checked: !checked })
    }

    return html`
      <y-core-radio-button
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
      </y-core-radio-button>
    `
  },
  argTypes: {
    ...omit(
      yCoreSimpleRadioButtonStoryMeta.argTypes ?? {},
      ['error', ...simpleRadioButtonInternalPropsKeys],
    ),

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

    ...yCoreErrorStoryMeta.argTypes ?? {},
  },
  args: {
    ...omit(
      yCoreSimpleRadioButtonStoryMeta.args ?? {},
      ['error', ...simpleRadioButtonInternalPropsKeys],
    ),

    ...omit(
      yCoreLabelStoryMeta.args ?? {},
      [...yCoreLabelStoryMetaOmitKeys],
    ),
    labelText: 'Label text',
    labelTooltipText: 'Tooltip text',
    labelOverflowDebounce: yCoreLabelStoryMeta.args?.debounce,

    ...omit(
      yCoreAnnotationStoryMeta.args ?? {},
      ['text'],
    ),
    annotationText: 'Annotation text',

    isLongText: yCoreLabelStoryMeta.args?.isLongText,
    showErrors: yCoreErrorStoryMeta.args?.showErrors,
    onChecked: fn(),
  },
} satisfies Meta<TYCoreRadioButtonStoryMeta>

export default meta
type Story = StoryObj<TYCoreRadioButtonStoryMeta>

export const Playground: Story = {}
