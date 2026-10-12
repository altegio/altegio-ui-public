import path from 'path'
import fs from 'fs'
import { camel, dash, pascal } from 'radash'
import type { IComponentUpdater, IUpdateCommandOptions } from '../../types'
import { getPlatformPathSlug } from '~cli/utils/slugs'
import { renameDirectory, renameFile, updateFile } from '~cli/utils/fileSystem'
import { ComponentNameBuilder } from '../../utils/componentNameBuilder'

const CORE_PLATFORM = 'core'

export abstract class ComponentUpdater implements IComponentUpdater {
  protected options: IUpdateCommandOptions
  protected oldComponentPath: string
  protected newComponentPath: string
  protected nameBuilder: ComponentNameBuilder

  protected newComponentName: string
  protected oldComponentName: string

  constructor(options: IUpdateCommandOptions) {
    this.options = options
    this.nameBuilder = new ComponentNameBuilder(options)

    const basePath = path.join(
      'web',
      getPlatformPathSlug(this.options.platform),
      '/src/ui',
    )

    this.oldComponentPath = path.join(
      basePath,
      camel(this.options.oldName),
    )

    this.newComponentPath = path.join(
      basePath,
      camel(this.options.newName),
    )

    this.newComponentName = this.nameBuilder.buildNewComponentName()
    this.oldComponentName = this.nameBuilder.buildOldComponentName()
  }

  protected validatePaths() {
    if (!fs.existsSync(this.oldComponentPath)) {
      console.error(`❌ Component ${this.options.oldName} was not found at ${this.oldComponentPath}`)

      return false
    }

    if (fs.existsSync(this.newComponentPath)) {
      console.error(`❌ Component ${this.options.newName} already exists at ${this.newComponentPath}`)

      return false
    }

    return true
  }

  readonly update = () => {
    if (!this.validatePaths()) {
      return false
    }

    return (
      this.updateAllFiles() &&
      this.renameFiles() &&
      this.renameComponentDirectory()
    )
  }

  protected renameComponentDirectory() {
    return renameDirectory(
      this.oldComponentPath,
      this.newComponentPath,
    )
  }

  protected renameFiles() {
    const files = fs
      .readdirSync(
        this.oldComponentPath,
        { recursive: true, withFileTypes: true },
      )
      .filter((file): file is fs.Dirent => !file.isDirectory())

    return files.every((file) => {
      const oldPath = path.join(
        file.parentPath,
        file.name,
      )
      const fileName = path.basename(file.name)

      const hasOldName = pascal(fileName).includes(pascal(this.options.oldName))
      if (!hasOldName) return true

      const newName = this.nameBuilder.buildFileNameComponent(fileName)

      const newPath = path.join(
        file.parentPath,
        newName,
      )

      return renameFile(
        oldPath,
        newPath,
      )
    })
  }

  protected getUpdatePatterns(): { search: RegExp; replace: string }[] {
    return [
      {
        search: new RegExp(
          this.oldComponentName,
          'g',
        ),
        replace: this.newComponentName,
      },
      {
        search: new RegExp(
          `Y${pascal(this.oldComponentName)}`,
          'g',
        ),
        replace: `Y${pascal(this.newComponentName)}`,
      },
      {
        search: new RegExp(
          `Y${pascal(this.options.oldName)}`,
          'g',
        ),
        replace: `Y${pascal(this.options.newName)}`,
      },
      {
        search: new RegExp(
          `${pascal(CORE_PLATFORM)}${pascal(this.options.oldName)}`,
          'g',
        ),
        replace: `${pascal(CORE_PLATFORM)}${pascal(this.options.newName)}`,
      },
      {
        search: new RegExp(
          `${pascal(CORE_PLATFORM)}${pascal(this.options.oldName)}`,
          'g',
        ),
        replace: `${pascal(CORE_PLATFORM)}${pascal(this.options.newName)}`,
      },
      // Импорты
      {
        search: new RegExp(
          `/${pascal(this.options.oldName)}`,
          'g',
        ),
        replace: `/${pascal(this.options.newName)}`,
      },
      {
        search: new RegExp(
          `/${pascal(this.options.oldName)}`,
          'g',
        ),
        replace: `/${pascal(this.options.newName)}`,
      },
      // CSS + Теги компонентов
      {
        search: new RegExp(
          dash(this.options.oldName),
          'g',
        ),
        replace: dash(this.options.newName),
      },
    ]
  }

  protected updateAllFiles(): boolean {
    const files = fs
      .readdirSync(
        this.oldComponentPath,
        { recursive: true, withFileTypes: true },
      )
      .filter((file): file is fs.Dirent => !file.isDirectory())
      .map((file) => {
        // Получаем относительный путь от oldComponentPath
        const relativePath = path.relative(this.oldComponentPath, path.join(file.parentPath || this.oldComponentPath, file.name))
        return relativePath
      })

    const patterns = this.getUpdatePatterns()

    const updateContent = (content: string) => patterns.reduce(
      (acc, { search, replace }) => acc.replace(
        search,
        replace,
      ),
      content,
    )

    return files.every((fileName) => {
      const filePath = path.join(
        this.oldComponentPath,
        fileName,
      )
      return updateFile(
        filePath,
        updateContent,
      )
    })
  }
}
