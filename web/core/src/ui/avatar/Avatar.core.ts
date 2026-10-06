import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import {
  createCoreAvatarProps,
  type IYCoreAvatarExternalProps,
} from '~core/ui/avatar/models/types'
import {
  YCoreAvatarTagName as tagName,
} from '~shared/constants'

import '~core/ui/icon'
const { size, initials, photo, icon, disabled } = createCoreAvatarProps()

import YAvatarVarsCss from '~core/ui/avatar/css/Avatar.vars.css?inline'
import YAvatarScopedCss from '~core/ui/avatar/css/Avatar.scoped.css?inline'
import { ifDefined } from 'lit/directives/if-defined.js'
import { renderIcon } from '~core/renderers'
import { interceptEvents } from '~core/utils/event-interceptor'
import { EYSizes } from '~shared/types/global'
import {
  YC_AVATAR_ICON_SIZE_100,
  YC_AVATAR_ICON_SIZE_300,
  YC_AVATAR_ICON_SIZE_500,
  YC_AVATAR_ICON_SIZE_800,
} from '~shared/constants/tokens'
import { withLocator } from '~core/utils/locator'

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreAvatar extends LitElement implements IYCoreAvatarExternalProps {
  @property({ type: String }) size: IYCoreAvatarExternalProps['size'] = size
  @property({ type: String }) initials: IYCoreAvatarExternalProps['initials'] = initials
  @property({ type: String }) photo: IYCoreAvatarExternalProps['photo'] = photo
  @property({ type: Object }) icon: IYCoreAvatarExternalProps['icon'] = icon
  @property({ type: Boolean }) disabled: IYCoreAvatarExternalProps['disabled'] = disabled

  private readonly baseClass = tagName
  @state() imageError = false

  private get isPhoto() {
    return this.photo && !this.imageError
  }

  /**
   * Преобразует строку с именем пользователя в инициалы.
   *
   * @example
   * "Иван" -> "И"
   * "Иван Петров" -> "ИП"
   * "иван петров" -> "ИП"
   * "  Иван  Петров  " -> "ИП"
   * "" -> ""
   *
   * @returns {string} Инициалы пользователя в верхнем регистре.
   * Возвращает пустую строку, если this.initials не определено.
   * Для одного слова возвращает только первую букву.
   * Для нескольких слов берет первые буквы первых двух слов.
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
      ${unsafeCSS(YAvatarVarsCss)}
      ${unsafeCSS(YAvatarScopedCss)}
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

  private resolveIconSize(avatarSize: IYCoreAvatarExternalProps['size']): number {
    switch (avatarSize) {
      case EYSizes.EXTRA_SMALL: return YC_AVATAR_ICON_SIZE_100
      case EYSizes.SMALL: return YC_AVATAR_ICON_SIZE_300
      case EYSizes.MEDIUM: return YC_AVATAR_ICON_SIZE_500
      case EYSizes.LARGE: return YC_AVATAR_ICON_SIZE_800
      default: return YC_AVATAR_ICON_SIZE_500
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

