import type { EPlatform } from './choices'

export interface IBaseCommandOptions {
  platform: `${EPlatform}`
}

export type TBaseComponent = Record<string, () => void>
