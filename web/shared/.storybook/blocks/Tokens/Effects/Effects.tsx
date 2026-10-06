import React from 'react'
import { cssVarPrefix, ECssVarTokenPrefixes, generateCssVariable } from '~tokens/index'
import type { TTokensJSON } from '~tokens/index'
import { useToast } from '~shared/.storybook/blocks/Toasts/ToastProvider'
import { copyToClipboard } from '~shared/.storybook/utils'
import { getStylesByType } from './utils'

import '~shared/.storybook/assets/css/iframe.css'
import '~shared/.storybook/blocks/Tokens/Effects/Effects.css'

type TEffectsProps = {
  effects: TTokensJSON
}

export const Effects = ({ effects }: TEffectsProps) => {
  const { show } = useToast()

  return (
    <div className="sb-stories-effects-tokens">
      {Object.entries(effects).map(([
        key,
        value
      ]) => {
        const token = generateCssVariable(
          cssVarPrefix,
          ECssVarTokenPrefixes.EFFECTS,
          key
        )

        const cardClassName = value.type === 'BACKGROUND_BLUR'
        ? 'sb-stories-effects-tokens__card sb-stories-effects-tokens__card_hatch'
        : 'sb-stories-effects-tokens__card'

        return <div
          className={cardClassName}
          onClick={() => {
            copyToClipboard(token)
            show({
              title: key,
              content: `${token}: успешно скопирован.`,
              duration: 2000
            })
          }}>
          <div className="sb-stories-effects-tokens__card-block" style={{ ...getStylesByType(value) }} />

          <div>
            <h3>{key}</h3>
            <div>{value.cssValue}</div>
            <div>{token}</div>
          </div>
        </div>
      })}
    </div>
  )
}
