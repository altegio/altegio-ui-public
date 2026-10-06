import { html, nothing } from 'lit'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from '@storybook/preview-api'
import { omit } from 'radash'

import { type IYCoreCheckboxExternalProps } from '~core/ui/checkbox/models/types'
import yCoreSimpleCheckboxStoryMeta from '~core/ui/simpleCheckbox/stories/SimpleCheckbox.stories'
import { type TYCoreCheckboxEvents } from '~core/ui/checkbox/models/types'
import { YCoreCheckboxTagName as tagName } from '~shared/constants'

import type { IYCoreLabelStoryProps, IYCoreLabelStorySlots } from '~core/ui/label/stories/Label.stories'
import yCoreLabelStoryMeta from '~core/ui/label/stories/Label.stories'
import type { IYCoreAnnotationStoryProps } from '~core/ui/annotation/stories/Annotation.stories'
import yCoreAnnotationStoryMeta from '~core/ui/annotation/stories/Annotation.stories'
import yCoreErrorStoryMeta, { type IYCoreErrorStoryProps } from '~core/ui/error/stories/Error.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import type { IYCoreSimpleCheckboxExternalProps } from '~core/ui/simpleCheckbox/models/types'
import { internalPropsKeys } from '~core/ui/simpleCheckbox/models/types'
import { internalPropsKeys as labelInternalPropsKeys } from '~core/ui/label/models/types'

import '~core/ui/checkbox'

export interface IYCoreCheckboxStoryProps extends
  IYCoreSimpleCheckboxExternalProps,
  IYCoreLabelStoryProps,
  IYCoreAnnotationStoryProps,
  IYCoreCheckboxExternalProps,
  IYCoreErrorStoryProps {}

export interface IYCoreCheckboxStoryEvents extends TYCoreCheckboxEvents {}
export interface IYCoreCheckboxStorySlots extends IYCoreLabelStorySlots {}

export type TYCoreCheckboxStoryMeta = IYCoreCheckboxStoryProps & IYCoreCheckboxStoryEvents & IYCoreCheckboxStorySlots

const yCoreLabelStoryMetaOmitKeys = [
  'text',
  'tooltipText',
  'debounce',
  'tooltipPlacement',
  ...labelInternalPropsKeys,
] as const

/**
 * ## Core Checkbox
 * Комплексный чекбокс с лейблом и аннотацией
 *
 * Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-DS-%7C-Testing?node-id=533-17346&t=qt4fcISx5UOUpGXS-4)
 */
const meta: Meta<TYCoreCheckboxStoryMeta> = {
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
    ] = useArgs<TYCoreCheckboxStoryMeta>()

    const { checked, indeterminate } = args
    const onChecked = () => {
      updateArgs({ ...args, checked: !checked })
    }

    return html`
      <y-core-checkbox
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
      </y-core-checkbox>
    `
  },
  argTypes: {
    ...omit(
      yCoreSimpleCheckboxStoryMeta.argTypes ?? {},
      ['error', ...internalPropsKeys],
    ),

    ...omit(
      yCoreLabelStoryMeta.argTypes ?? {},
      [...yCoreLabelStoryMetaOmitKeys],
    ),
    labelText: yCoreLabelStoryMeta.argTypes?.text ?? {},
    labelTooltipText: yCoreLabelStoryMeta.argTypes?.tooltipText ?? {},
    labelOverflowDebounce: yCoreLabelStoryMeta.argTypes?.debounce ?? {},
    labelTooltipPlacement: yCoreLabelStoryMeta.argTypes?.tooltipPlacement ?? {},

    ...omit(
      yCoreAnnotationStoryMeta.argTypes ?? {},
      ['text'],
    ),
    annotationText: yCoreAnnotationStoryMeta.argTypes?.text ?? {},

    ...yCoreErrorStoryMeta.argTypes ?? {},
  },
  args: {
    ...omit(
      yCoreSimpleCheckboxStoryMeta.args ?? {},
      ['error', ...internalPropsKeys],
    ),

    ...omit(
      yCoreLabelStoryMeta.args ?? {},
      [...yCoreLabelStoryMetaOmitKeys],
    ),
    labelText: 'Текст лейбла',
    labelTooltipText: 'Текст тултипа',
    labelOverflowDebounce: yCoreLabelStoryMeta.args?.debounce,
    labelTooltipPlacement: yCoreLabelStoryMeta.args?.tooltipPlacement,

    ...omit(
      yCoreAnnotationStoryMeta.args ?? {},
      ['text'],
    ),
    annotationText: 'Текст аннотации',

    isLongText: yCoreLabelStoryMeta.args?.isLongText,
    showErrors: yCoreErrorStoryMeta.args?.showErrors,
    onChecked: fn(),
  },
} satisfies Meta<TYCoreCheckboxStoryMeta>

export default meta
type Story = StoryObj<TYCoreCheckboxStoryMeta>

export const Playground: Story = {}
