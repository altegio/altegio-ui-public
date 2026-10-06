import type { EPlatform, IBaseCommandOptions } from '~cli/types'

export interface ICreateCommandOptions extends IBaseCommandOptions {
  name: string
}

export type TCreateCommand = (options: ICreateCommandOptions) => void

export type TComponentBuilders = Record<EPlatform, (options: ICreateCommandOptions) => IComponentBuilder>

export interface IComponentBuilder {
  create: () => boolean
}

export interface IComponentTemplates {
  createIndexTemplate: () => string
  createComponentTemplate: () => string
  createStoriesTemplate: () => string
  createTypesTemplate: () => string
  createReExportTemplate: () => string
  createTestTemplate: () => string
}
