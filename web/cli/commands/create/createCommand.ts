import { Option, type Command } from 'commander'
import type { TComponentBuilders } from './types'
import { CoreComponentBuilder, NgComponentBuilder, VueComponentBuilder } from './builders'
import { CoreComponentTemplates, NgComponentTemplates, VueComponentTemplates } from './templates'
import { getPromptCreateOptions } from './commandPrompts'
import { execAsync } from '../../utils/process'

const COMPONENT_BUILDERS: TComponentBuilders = {
  core: (options) => new CoreComponentBuilder(
    options,
    new CoreComponentTemplates(options),
  ),
  vue: (options) => new VueComponentBuilder(
    options,
    new VueComponentTemplates(options),
  ),
  ng: (options) => new NgComponentBuilder(
    options,
    new NgComponentTemplates(options),
  ),
} as const

export const addCreateCommand = (program: Command): Command => {
  const createCommand = program
    .command('create')
    .description('Create a new component')
    .action(async() => {
      try {
        const options = await getPromptCreateOptions()
        const builder = COMPONENT_BUILDERS[options.platform](options)
        const success = builder.create()

        if (success) {
          console.log('✅ Component created successfully')

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
          console.error('❌ Failed to create component')
        }
      } catch(error: unknown) {
        console.error(
          '❌ An error occurred:',
          error instanceof Error ? error.message : 'Unknown error',
        )
      }
    })
    .addHelpOption(new Option(
      '-h, --help',
      'Display help',
    ))

  return createCommand
}
