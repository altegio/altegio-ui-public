import { select, input } from '@inquirer/prompts'
import { EPlatform } from '~cli/types'
import type { IUpdateCommandOptions } from './types'
import { createChoices, validateComponentName } from '~cli/utils/commandPrompts'

export const getPromptUpdateOptions = async(): Promise<IUpdateCommandOptions> => {
  const platform = await select({
    message: 'Выберите платформу:',
    choices: createChoices(EPlatform),
  })

  const oldName = await input({
    message: 'Введите текущее название компонента (kebab-case):',
    validate: validateComponentName,
  })

  const newName = await input({
    message: 'Введите новое название компонента (kebab-case):',
    validate: validateComponentName,
  })

  return {
    platform,
    oldName,
    newName,
  }
}
