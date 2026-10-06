import path from 'path'
import { pascal } from 'radash'
import { createFile } from '~cli/utils/fileSystem'
import { ComponentBuilder } from './componentBuilder'

export class VueComponentBuilder extends ComponentBuilder {
  protected createComponent() {
    createFile(
      path.join(
        this.componentPath,
        `${pascal(this.options.name)}.vue`,
      ),
      this.templates.createComponentTemplate(),
    )
  }
}
