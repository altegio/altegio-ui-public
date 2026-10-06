export enum EAnchorTarget {
  SELF = '_self',
  BLANK = '_blank',
  PARENT = '_parent',
  TOP = '_top',
}
export type TAnchorTarget = `${EAnchorTarget}`

export enum EYSizes {
  EXTRA_SMALL = 'extra-small',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra-large',
}

export type TYSizes = `${EYSizes}`

// Определяем тип для таймера, который работает в браузере
export type TTimeout = ReturnType<typeof setTimeout>

export enum ESort {
  ASC = 'asc',
  DESC = 'desc',
  DEFAULT = 'default',
}
export type TSort = `${ESort}`

export enum EYInputType {
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
export type TYInputType = `${EYInputType}`

export enum EYInputAutocomplete {
  ON = 'on',
  OFF = 'off',
  TEL = 'tel',
  TEL_NATIONAL = 'tel-national',
}
export type TYInputAutocomplete = `${EYInputAutocomplete}`

export interface IYBaseCustomEvent {
  event: Event
}

export enum EYTextareaWrap {
  HARD = 'hard',
  SOFT = 'soft',
}
export type TYTextareaWrap = `${EYTextareaWrap}`

export enum EYTextareaResize {
  BOTH = 'both',
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  NONE = 'none',
}
export type TYTextareaResize = `${EYTextareaResize}`

export type TPrimitive = string | number | boolean | null | undefined

export interface IDropdownListItem {
  id: string | number
  [key: string]: unknown
}

