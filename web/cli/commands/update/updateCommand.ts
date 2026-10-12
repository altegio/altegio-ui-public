import type { Command } from 'commander'
import { getPromptUpdateOptions } from './commandPrompts'
import { CoreComponentUpdater, NgComponentUpdater, VueComponentUpdater } from './updaters'
import type { TComponentUpdaters } from './types'
import { execAsync } from '../../utils/process'

const COMPONENT_UPDATERS: TComponentUpdaters = {
  core: (options) => new CoreComponentUpdater(options),
  vue: (options) => new VueComponentUpdater(options),
  ng: (options) => new NgComponentUpdater(options),
} as const

export const addUpdateCommand = (program: Command): Command => {
  const updateCommand = program
    .command('update')
    .description('Update an existing component')
    .action(async() => {
      try {
        const options = await getPromptUpdateOptions()
        const updater = COMPONENT_UPDATERS[options.platform](options)
        const success = updater.update()

        if (success) {
          console.log('✅ Component updated successfully')

          await execAsync(
            'pnpm vars-build',
            {
              onDataStdout: (data) => {
                console.log(data)
              },
              onDataStderr: (data) => {
                console.error(data)
              },
            },
          )

          console.log('✅ Design variables rebuilt successfully')
        } else {
          console.error('❌ Failed to update component')
        }
      } catch(error: unknown) {
        console.error(
          '❌ An error occurred:',
          error instanceof Error ? error.message : 'Unknown error',
        )
      }
    })

  return updateCommand
}
