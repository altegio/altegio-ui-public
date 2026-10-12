import { memo, pascal, dash, camel } from 'radash'
import type { ICreateCommandOptions } from '~cli/commands/create/types'
import type { IComponentTemplates } from '~cli/commands/create/types'

export abstract class ComponentTemplates implements IComponentTemplates {
  protected options: ICreateCommandOptions

  protected dash = memo(dash)
  protected pascal = memo(pascal)
  protected camel = memo(camel)

  protected pascalComponentName: string
  protected camelComponentName: string

  constructor(options: ICreateCommandOptions) {
    this.options = options

    this.pascalComponentName = this.pascal(this.options.name)
    this.camelComponentName = this.camel(this.options.name)
  }

  abstract createIndexTemplate(): string
  abstract createComponentTemplate(): string
  abstract createStoriesTemplate(): string
  abstract createTypesTemplate(): string
  abstract createReExportTemplate(): string
  abstract createTestTemplate(): string
}
