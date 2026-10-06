import { ComponentUpdater } from './abstract/componentUpdater'
import { updateFile } from '~cli/utils/fileSystem'
import { getPlatformPathSlug } from '~cli/utils/slugs'
import { pascal, dash } from 'radash'
import { COMPONENT_CONSTANTS_RELATIVE_PATH, DECLARE_TYPES_RELATIVE_PATH } from '../constants'

export class CoreComponentUpdater extends ComponentUpdater {
  protected updatePlatformSpecific() {
    return this.updateConstants() && this.updateDeclareTypes()
  }

  private updateDeclareTypes() {
    const indexPath = DECLARE_TYPES_RELATIVE_PATH(getPlatformPathSlug(this.options.platform))

    const oldLine = `export * from './${pascal(this.options.oldName)}.core'`
    const newLine = `export * from './${pascal(this.options.newName)}.core'`

    return updateFile(
      indexPath,
      (content) => content.replace(
        new RegExp(
          oldLine,
          'g',
        ),
        newLine,
      ),
    )
  }

  private updateConstants() {
    const oldLine = `export const Y${pascal(this.options.oldName)}TagName = 'y-${dash(this.options.oldName)}'`
    const newLine = `export const Y${pascal(this.options.newName)}TagName = 'y-${dash(this.options.newName)}'`

    return updateFile(
      COMPONENT_CONSTANTS_RELATIVE_PATH,
      (content) => content.replace(
        new RegExp(
          oldLine,
          'g',
        ),
        newLine,
      ),
    )
  }
}
