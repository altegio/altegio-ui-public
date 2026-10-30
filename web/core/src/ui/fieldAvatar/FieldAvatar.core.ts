import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'

import {
  createCoreFieldAvatarProps,
  type IAltCoreFieldAvatarProps, mapSizeToAvatarSize,
} from '~core/ui/fieldAvatar/models/types'
import {
  AltCoreFieldAvatarTagName as tagName,
} from '~shared/constants'

import AltCoreFieldAvatarVarsCSS from '~core/ui/fieldAvatar/css/FieldAvatar.vars.css?inline'
import AltCoreFieldAvatarScopedCSS from '~core/ui/fieldAvatar/css/FieldAvatar.scoped.css?inline'

import { interceptEvents } from '~core/utils/event-interceptor'
import { EAltSizes } from '~shared/types/global'
import { disabledContextCreated, sizeContextCreated } from '~core/ui/fieldWrapper/providers'

import '~core/ui/avatar'
import { withLocator } from '~core/utils/locator'

const { disabled, size, photo, initials } = createCoreFieldAvatarProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreFieldAvatar
  extends LitElement
  implements IAltCoreFieldAvatarProps {
  @consume({ context: disabledContextCreated, subscribe: true })
  @property({ type: Boolean }) disabled: IAltCoreFieldAvatarProps['disabled'] = disabled
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IAltCoreFieldAvatarProps['size'] = size
  @property({ type: String }) photo: IAltCoreFieldAvatarProps['photo'] = photo
  @property({ type: String }) initials: IAltCoreFieldAvatarProps['initials'] = initials
  @property({ type: Object }) icon!: IAltCoreFieldAvatarProps['icon']

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreFieldAvatarVarsCSS)}
      ${unsafeCSS(AltCoreFieldAvatarScopedCSS)}
    `,
  ]

  private get computedSize() {
    return this.size ?? EAltSizes.MEDIUM
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
        <alt-core-avatar
          .size=${this.computedAvatarSize}
          .photo=${this.photo}
          .initials=${this.initials}
          .icon=${this.icon}
          .disabled=${this.disabled}
        ></alt-core-avatar>
      </div>
    `
  }
}
