import { select, input } from '@inquirer/prompts'
import { EPlatform } from '~cli/types'
import type { ICreateCommandOptions } from './types'
import { createChoices, validateComponentName } from '~cli/utils/commandPrompts'

export const getPromptCreateOptions = async(): Promise<ICreateCommandOptions> => {
  const platform = await select({
    message: 'Select a platform:',
    choices: createChoices(EPlatform),
  })

  const name = await input({
    message: 'Enter the component name (kebab-case):',
    validate: validateComponentName,
  })

  return {
    platform,
    name,
  }
}
