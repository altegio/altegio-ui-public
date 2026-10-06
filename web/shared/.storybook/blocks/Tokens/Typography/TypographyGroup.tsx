import React from 'react'
import { cssVarPrefix, ECssVarTokenPrefixes, generateCssVariable } from '~tokens/index'
import type { TTokensJSON } from '~tokens/index'
import { useToast } from '~shared/.storybook/blocks/Toasts/ToastProvider'
import { copyToClipboard } from '~shared/.storybook/utils'

import '~shared/.storybook/assets/css/iframe.css'
import '~shared/.storybook/blocks/Tokens/Typography/Typography.css'


type TTypographyGroupProps = {
  group: TTokensJSON
  category: string
  name: string
}

export const TypographyGroup = ({ category, name, group }: TTypographyGroupProps) => {
  const { show } = useToast()

  const getTypograpyGroupStyleValue = (key: string) => {
    return group[`${category}_${name}_${key}`].cssValue || ''
  }

  return (
    <div className="sb-stories-typography-tokens-group">
      <div className="sb-stories-typography-tokens-group__desc">
        {getTypograpyGroupStyleValue('font_size')} · {getTypograpyGroupStyleValue('line_height')} · fontWeight: {getTypograpyGroupStyleValue('font_weight')} · {getTypograpyGroupStyleValue('style')}
      </div>

      <div className="sb-stories-typography-tokens-group__name" style={{
        fontSize: getTypograpyGroupStyleValue('font_size'),
        lineHeight: getTypograpyGroupStyleValue('line_height'),
        fontWeight: getTypograpyGroupStyleValue('font_weight')
      }}>
        {name}
      </div>

      <div className='sb-stories-typography-tokens-group__tokens'>
        {Object.keys(group).map((tokenName) => {
          const variableName = generateCssVariable(
            cssVarPrefix,
            ECssVarTokenPrefixes.TYPOGRAPHY,
            tokenName
          )

          return <div className='sb-stories-typography-tokens-group__tokens-value' onClick={() => {
            copyToClipboard(tokenName)
            show({
              title: category,
              content: `${variableName}: copied successfully.`,
              duration: 2000
            })
          }}>
            {variableName}
          </div>
        })}
      </div>
    </div>

  )
}
