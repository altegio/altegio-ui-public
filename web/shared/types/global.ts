export enum EAnchorTarget {
  SELF = '_self',
  BLANK = '_blank',
  PARENT = '_parent',
  TOP = '_top',
}
export type TAnchorTarget = `${EAnchorTarget}`

export enum EAltSizes {
  EXTRA_SMALL = 'extra-small',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra-large',
}

export type TAltSizes = `${EAltSizes}`

// Timer handle type as returned by setTimeout in the browser
export type TTimeout = ReturnType<typeof setTimeout>

export enum ESort {
  ASC = 'asc',
  DESC = 'desc',
  DEFAULT = 'default',
}
export type TSort = `${ESort}`

export enum EAltInputType {
  HIDDEN = 'hidden',
  TEXT = 'text',
  SEARCH = 'search',
  TEL = 'tel',
  URL = 'url',
  EMAIL = 'email',
  PASSWORD = 'password',
  DATETIME = 'datetime',
  DATE = 'date',
  MONTH = 'month',
  WEEK = 'week',
  TIME = 'time',
  DATETIME_LOCAL = 'datetime-local',
  NUMBER = 'number',
  RANGE = 'range',
  COLOR = 'color',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  FILE = 'file',
  SUBMIT = 'submit',
  IMAGE = 'image',
  RESET = 'reset',
  BUTTON = 'button',
}
export type TAltInputType = `${EAltInputType}`

export enum EAltInputAutocomplete {
  ON = 'on',
  OFF = 'off',
  TEL = 'tel',
  TEL_NATIONAL = 'tel-national',
}
export type TAltInputAutocomplete = `${EAltInputAutocomplete}`

export interface IAltBaseCustomEvent {
  event: Event
}

export enum EAltTextareaWrap {
  HARD = 'hard',
  SOFT = 'soft',
}
export type TAltTextareaWrap = `${EAltTextareaWrap}`

export enum EAltTextareaResize {
  BOTH = 'both',
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  NONE = 'none',
}
export type TAltTextareaResize = `${EAltTextareaResize}`

export type TPrimitive = string | number | boolean | null | undefined

export interface IDropdownListItem {
  id: string | number
  [key: string]: unknown
}

