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
    .description('Обновить существующий компонент')
    .action(async() => {
      try {
        const options = await getPromptUpdateOptions()
        const updater = COMPONENT_UPDATERS[options.platform](options)
        const success = updater.update()

        if (success) {
          console.log('✅ Компонент успешно обновлен')

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

          console.log('✅ Переменные окружения успешно обновлены')
        } else {
          console.error('❌ Ошибка при обновлении компонента')
        }
      } catch(error: unknown) {
        console.error(
          '❌ Произошла ошибка:',
error instanceof Error ? error.message : 'Неизвестная ошибка',
        )
      }
    })

  return updateCommand
}
