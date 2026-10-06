import { camel, pascal } from 'radash'
import type { IUpdateCommandOptions } from '../types'

export class ComponentNameBuilder {
  constructor(private options: IUpdateCommandOptions) {}

  buildNewComponentName() {
    return this.buildComponentNameByPattern(this.options.newName)
  }

  buildOldComponentName() {
    return this.buildComponentNameByPattern(this.options.oldName)
  }

  private buildComponentNameByPattern(name: string) {
    return `${pascal(this.options.platform)}${pascal(name)}`
  }

  private formatName(name: string, isFirstLetterUpperCase: boolean): string {
    return isFirstLetterUpperCase ? pascal(name) : camel(name)
  }

  buildFileNameComponent(fileName: string): string {
    const isFirstLetterUpperCase = fileName.startsWith(fileName[0].toUpperCase())

    return fileName.replace(
      new RegExp(
        this.formatName(
          this.options.oldName,
          isFirstLetterUpperCase,
        ),
        'g',
      ),
      this.formatName(
        this.options.newName,
        isFirstLetterUpperCase,
      ),
    )
  }
}
