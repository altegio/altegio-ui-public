import { select, input } from '@inquirer/prompts'
import { EPlatform } from '~cli/types'
import type { ICreateCommandOptions } from './types'
import { createChoices, validateComponentName } from '~cli/utils/commandPrompts'

export const getPromptCreateOptions = async(): Promise<ICreateCommandOptions> => {
  const platform = await select({
    message: 'Выберите платформу:',
    choices: createChoices(EPlatform),
  })

  const name = await input({
    message: 'Введите название компонента (kebab-case):',
    validate: validateComponentName,
  })

  return {
    platform,
    name,
  }
}
