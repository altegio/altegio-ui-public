import { Option, InvalidArgumentError } from 'commander'
import { EPlatform } from '~cli/types'
import { isKebabCase } from './regex'

export const createPlatformOption = () => {
  const platform = new Option(
    '-p, --platform <platform>',
    'Платформа',
  )
  platform.choices(Object.values(EPlatform))
  platform.makeOptionMandatory()

  return platform
}

export const createNameOption = (flag: string, description: string) => {
  const name = new Option(
    flag,
    description,
  )
  name.makeOptionMandatory()
  name.argParser((input) => {
    if (!isKebabCase(input)) throw new InvalidArgumentError('Название компонента должно быть в формате kebab-case.')
    return input
  })

  return name
}
