import type { EPlatform, IBaseCommandOptions } from '~cli/types'

export interface IUpdateCommandOptions extends IBaseCommandOptions {
  oldName: string
  newName: string
}

export type TUpdateCommand = (options: IUpdateCommandOptions) => void

export type TComponentUpdaters = Record<EPlatform, (options: IUpdateCommandOptions) => IComponentUpdater>

export interface IComponentUpdater {
  update: () => boolean
}
