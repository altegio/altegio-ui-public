import { select, input } from '@inquirer/prompts'
import { EPlatform } from '~cli/types'
import type { IUpdateCommandOptions } from './types'
import { createChoices, validateComponentName } from '~cli/utils/commandPrompts'

export const getPromptUpdateOptions = async(): Promise<IUpdateCommandOptions> => {
  const platform = await select({
    message: 'Select a platform:',
    choices: createChoices(EPlatform),
  })

  const oldName = await input({
    message: 'Enter the current component name (kebab-case):',
    validate: validateComponentName,
  })

  const newName = await input({
    message: 'Enter the new component name (kebab-case):',
    validate: validateComponentName,
  })

  return {
    platform,
    oldName,
    newName,
  }
}
