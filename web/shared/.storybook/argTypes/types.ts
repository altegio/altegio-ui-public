import type { Args, ArgTypes, Meta } from '@storybook/web-components'

export type TStoryMeta<T> = Meta<T> & {
  argTypes: ArgTypes<T>
  args: Args
}

export interface ITextStoryProps {
  isLongText: boolean
}

export interface IShowErrorsStoryProps {
  showErrors: string[]
}
