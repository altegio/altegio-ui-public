import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCoreFormSubmitDetail {

  /** Values of the fields that have a `name` */
  formData: FormData

  /** Button that submitted the form, if any */
  submitter: HTMLElement | null
}

export interface IAltCoreFormInvalidDetail {

  /** Invalid fields in document order */
  controls: Element[]
}

export class FormSubmitEvent extends CustomEvent<IAltCoreFormSubmitDetail> {}

export class FormInvalidEvent extends CustomEvent<IAltCoreFormInvalidDetail> {}

export class FormResetEvent extends CustomEvent<undefined> {}

export type TAltCoreFormEvents = TEventsStoryArgs<{
  FormSubmitEvent: typeof FormSubmitEvent
  FormInvalidEvent: typeof FormInvalidEvent
  FormResetEvent: typeof FormResetEvent
}>
