import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'

import {
  createCoreFieldAvatarProps,
  type IYCoreFieldAvatarProps, mapSizeToAvatarSize,
} from '~core/ui/fieldAvatar/models/types'
import {
  YCoreFieldAvatarTagName as tagName,
} from '~shared/constants'

import YCoreFieldAvatarVarsCSS from '~core/ui/fieldAvatar/css/FieldAvatar.vars.css?inline'
import YCoreFieldAvatarScopedCSS from '~core/ui/fieldAvatar/css/FieldAvatar.scoped.css?inline'

import { interceptEvents } from '~core/utils/event-interceptor'
import { EYSizes } from '~shared/types/global'
import { disabledContextCreated, sizeContextCreated } from '~core/ui/fieldWrapper/providers'

import '~core/ui/avatar'
import { withLocator } from '~core/utils/locator'

const { disabled, size, photo, initials } = createCoreFieldAvatarProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreFieldAvatar
  extends LitElement
  implements IYCoreFieldAvatarProps {
  @consume({ context: disabledContextCreated, subscribe: true })
  @property({ type: Boolean }) disabled: IYCoreFieldAvatarProps['disabled'] = disabled
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IYCoreFieldAvatarProps['size'] = size
  @property({ type: String }) photo: IYCoreFieldAvatarProps['photo'] = photo
  @property({ type: String }) initials: IYCoreFieldAvatarProps['initials'] = initials
  @property({ type: Object }) icon!: IYCoreFieldAvatarProps['icon']

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreFieldAvatarVarsCSS)}
      ${unsafeCSS(YCoreFieldAvatarScopedCSS)}
    `,
  ]

  private get computedSize() {
    return this.size ?? EYSizes.MEDIUM
  }

  private get computedAvatarSize() {
    return mapSizeToAvatarSize[this.computedSize]
  }

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.computedSize}`]: true,
    }
  }


  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <y-core-avatar
          .size=${this.computedAvatarSize}
          .photo=${this.photo}
          .initials=${this.initials}
          .icon=${this.icon}
          .disabled=${this.disabled}
        ></y-core-avatar>
      </div>
    `
  }
}
