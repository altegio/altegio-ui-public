import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import {
  createCoreAvatarProps,
  type IAltCoreAvatarExternalProps,
} from '~core/ui/avatar/models/types'
import {
  AltCoreAvatarTagName as tagName,
} from '~shared/constants'

import '~core/ui/icon'
const { size, initials, photo, icon, disabled } = createCoreAvatarProps()

import AltAvatarVarsCss from '~core/ui/avatar/css/Avatar.vars.css?inline'
import AltAvatarScopedCss from '~core/ui/avatar/css/Avatar.scoped.css?inline'
import { ifDefined } from 'lit/directives/if-defined.js'
import { renderIcon } from '~core/renderers'
import { interceptEvents } from '~core/utils/event-interceptor'
import { EAltSizes } from '~shared/types/global'
import {
  ALT_AVATAR_ICON_SIZE_100,
  ALT_AVATAR_ICON_SIZE_300,
  ALT_AVATAR_ICON_SIZE_500,
  ALT_AVATAR_ICON_SIZE_800,
} from '~shared/constants/tokens'
import { withLocator } from '~core/utils/locator'

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreAvatar extends LitElement implements IAltCoreAvatarExternalProps {
  @property({ type: String }) size: IAltCoreAvatarExternalProps['size'] = size
  @property({ type: String }) initials: IAltCoreAvatarExternalProps['initials'] = initials
  @property({ type: String }) photo: IAltCoreAvatarExternalProps['photo'] = photo
  @property({ type: Object }) icon: IAltCoreAvatarExternalProps['icon'] = icon
  @property({ type: Boolean }) disabled: IAltCoreAvatarExternalProps['disabled'] = disabled

  private readonly baseClass = tagName
  @state() imageError = false

  private get isPhoto() {
    return this.photo && !this.imageError
  }

  /**
   * Converts the user name string into initials.
   *
   * @example
   * "Anna" -> "A"
   * "Anna Smith" -> "AS"
   * "anna smith" -> "AS"
   * "" -> ""
   *
   * @returns {string} Upper-case initials.
   * Returns an empty string when this.initials is not set.
   * A single word gives one letter; otherwise the first letters of the first two words are used.
   * Words are split on single spaces, so "Anna  Smith" (two spaces) gives "A".
   */
  private get initialsFromString() {
    if (!this.initials) return ''

    const parts = this.initials.trim().split(' ')
    const firstName = parts[0] || ''
    const lastName = parts[1] || ''

    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase()
  }

  static readonly styles = [
    css`
      ${unsafeCSS(AltAvatarVarsCss)}
      ${unsafeCSS(AltAvatarScopedCss)}
    `,
  ]

  private handleImageError = () => {
    this.imageError = true
  }

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: true,
      [`${this.baseClass}_type_photo`]: Boolean(this.isPhoto),
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
    }
  }

  private resolveIconSize(avatarSize: IAltCoreAvatarExternalProps['size']): number {
    switch (avatarSize) {
      case EAltSizes.EXTRA_SMALL: return ALT_AVATAR_ICON_SIZE_100
      case EAltSizes.SMALL: return ALT_AVATAR_ICON_SIZE_300
      case EAltSizes.MEDIUM: return ALT_AVATAR_ICON_SIZE_500
      case EAltSizes.LARGE: return ALT_AVATAR_ICON_SIZE_800
      default: return ALT_AVATAR_ICON_SIZE_500
    }
  }

  private get iconSize(): string {
    const iconSizeByAvatar = this.resolveIconSize(this.size)

    return `${iconSizeByAvatar}px`
  }

  private get content() {
    if (this.isPhoto) return this.renderPhoto()
    if (this.icon) return this.renderIcon()
    if (this.initials) return this.renderInitials()

    return nothing
  }

  private renderPhoto() {
    return html`
      <img
        class="${this.baseClass}__image"
        src=${ifDefined(this.photo)}
        alt=${ifDefined(this.initials)}
        @error=${this.handleImageError}
      />
    `
  }

  private renderIcon() {
    return renderIcon({ icon: this.icon, size: this.iconSize })
  }

  private renderInitials() {
    return html`
      <span class="${this.baseClass}__initials">
        ${this.initialsFromString}
      </span>
    `
  }


  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        ${this.content}
      </div>
    `
  }
}

