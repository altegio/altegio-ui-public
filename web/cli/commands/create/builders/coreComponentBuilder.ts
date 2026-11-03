import path from 'path'
import { pascal } from 'radash'
import type { ICreateCommandOptions } from '~cli/commands/create/types'
import { appendToFile, createDirectory, createFile } from '~cli/utils/fileSystem'
import { ComponentBuilder } from './componentBuilder'
import type { CoreComponentTemplates } from '../templates'

const COMPONENT_TAG_NAMES_PATH = 'web/shared/constants'

export class CoreComponentBuilder extends ComponentBuilder {
  protected componentCssPath: string
  protected componentTestCasesPath: string
  protected get coreTemplates(): CoreComponentTemplates {
    return this.templates as CoreComponentTemplates
  }

  constructor(options: ICreateCommandOptions, templates: CoreComponentTemplates) {
    super(
      options,
      templates,
    )

    this.componentCssPath = path.join(
      this.componentPath,
      'css',
    )
    this.componentTestCasesPath = path.join(
      this.componentTestsPath,
      'cases',
    )
  }

  create() {
    if (!super.create()) return false
    if (!createDirectory(this.componentCssPath)) return false
    if (!createDirectory(this.componentTestCasesPath)) return false

    this.createCssVariables()
    this.createStyles()
    this.createExternals()
    this.createInternals()
    this.createCSSTestCases()
    this.createCSSTestTemplate()
    this.appendTagNames()

    return true
  }

  protected appendTagNames(): boolean {
    appendToFile(
      path.join(
        COMPONENT_TAG_NAMES_PATH,
        'index.ts',
      ),
      this.coreTemplates.createTagNameTemplate(),
    )

    return true
  }

  protected createComponent() {
    createFile(
      path.join(
        this.componentPath,
        `${pascal(this.options.name)}.core.ts`,
      ),
      this.coreTemplates.createComponentTemplate(),
    )
  }

  private createCssVariables() {
    createFile(
      path.join(
        this.componentCssPath,
        `${pascal(this.options.name)}.vars.css`,
      ),
      this.coreTemplates.createCssVariables(),
    )
  }

  private createStyles() {
    createFile(
      path.join(
        this.componentCssPath,
        `${pascal(this.options.name)}.scoped.css`,
      ),
      this.coreTemplates.createStyles(),
    )
  }

  private createExternals() {
    createFile(
      path.join(
        this.componentModelsPath,
        'external.ts',
      ),
      this.coreTemplates.createExternals(),
    )
  }

  private createInternals() {
    createFile(
      path.join(
        this.componentModelsPath,
        'internal.ts',
      ),
      this.coreTemplates.createInternals(),
    )
  }

  private createCSSTestCases() {
    createFile(
      path.join(
        this.componentTestsPath,
        'cases',
        'css.ts.draft',
      ),
      this.coreTemplates.createCSSTestCasesTemplate(),
    )
  }

  private createCSSTestTemplate() {
    createFile(
      path.join(
        this.componentTestsPath,
        `${pascal(this.options.name)}.css.test.ts.draft`,
      ),
      this.coreTemplates.createCSSTestTemplate(),
    )
  }
}
