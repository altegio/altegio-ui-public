import path from 'path'
import { camel, pascal } from 'radash'
import type { IComponentBuilder, ICreateCommandOptions } from '~cli/commands/create/types'
import type { IComponentTemplates } from '~cli/commands/create/types'
import { appendToFile, createDirectory, createFile } from '~cli/utils/fileSystem'
import { getPlatformPathSlug } from '~cli/utils/slugs'

const COMPONENT_MODELS_RELATIVE_PATH = 'models/types/'

export class ComponentBuilder implements IComponentBuilder {
  protected options: ICreateCommandOptions
  protected templates: IComponentTemplates
  protected componentPath: string
  protected componentModelsPath: string
  protected componentTestsPath: string
  protected componentStoriesPath: string

  constructor(options: ICreateCommandOptions, templates: IComponentTemplates) {
    this.options = options
    this.templates = templates

    this.componentPath = path.join(
      'web',
      getPlatformPathSlug(this.options.platform),
      '/src/ui',
      camel(this.options.name),
    )

    this.componentTestsPath = path.join(
      this.componentPath,
      'tests',
    )

    this.componentStoriesPath = path.join(
      this.componentPath,
      'stories',
    )

    this.componentModelsPath = path.join(
      this.componentPath,
      COMPONENT_MODELS_RELATIVE_PATH,
    )
  }

  create() {
    if (!createDirectory(this.componentPath)) return false
    if (!createDirectory(this.componentModelsPath)) return false
    if (!createDirectory(this.componentTestsPath)) return false
    if (!createDirectory(this.componentStoriesPath)) return false

    this.createIndex()
    this.createComponent()
    this.createStories()
    this.createTypes()
    this.createTest()
    this.appendReExports()

    return true
  }

  protected createIndex() {
    createFile(
      path.join(
        this.componentPath,
        'index.ts',
      ),
      this.templates.createIndexTemplate(),
    )
  }

  protected createComponent() {
    createFile(
      path.join(
        this.componentPath,
        `${pascal(this.options.name)}.ts`,
      ),
      this.templates.createComponentTemplate(),
    )
  }

  protected createStories() {
    createFile(
      path.join(
        this.componentStoriesPath,
        `${pascal(this.options.name)}.stories.ts`,
      ),
      this.templates.createStoriesTemplate(),
    )
  }

  protected createTypes() {
    createFile(
      path.join(
        this.componentModelsPath,
        'index.ts',
      ),
      this.templates.createTypesTemplate(),
    )
  }

  protected appendReExports() {
    appendToFile(
      path.join(
        this.componentPath,
        'index.ts',
      ),
      this.templates.createReExportTemplate(),
    )
  }

  protected createTest() {
    createFile(
      path.join(
        this.componentTestsPath,
        `${pascal(this.options.name)}.test.ts.draft`,
      ),
      this.templates.createTestTemplate(),
    )
  }
}
