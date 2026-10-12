import { Option } from 'commander'
import { EPlatform } from '~cli/types'

export const createPlatformOption = () => new Option(
  '-p, --platform <platform>',
  'Component platform',
).choices(Object.values(EPlatform))

export const createOption = (flags: string, description: string) => new Option(
  flags,
  description,
)
