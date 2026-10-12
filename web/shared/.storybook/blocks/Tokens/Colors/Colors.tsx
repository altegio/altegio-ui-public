import React from 'react'
import { getColorCategoriesHtml } from './utils'
import type { TTokensJSON } from '~tokens/index'
import { useToast } from '../../Toasts/ToastProvider'
import { copyToClipboard } from '~shared/.storybook/utils'


import '../../../assets/css/iframe.css'
import './Colors.css'


type TColorsProps = {
  colors: TTokensJSON
}

export const Colors = ({ colors }: TColorsProps) => {
  const { show } = useToast()

  return (
    <div className="sb-stories-color-tokens">
      {getColorCategoriesHtml(colors).map(([
        category,
        parsedColors
      ]) =>
        <div key={category}>
          <h3 className="sb-stories-color-tokens__category">{category}</h3>
          <div className="sb-stories-color-tokens__colors">
            {parsedColors.map((color) =>
              <div className="sb-stories-color-tokens__color-wrapper" key={color.name} title={String(color.colorHex)} onClick={() => {
                copyToClipboard(color.token)
                show({
                  title: category,
                  content: `${color.name}: copied successfully.`,
                  duration: 2000
                })
              }
              }>
                <div className="sb-stories-color-tokens__color" style={{ backgroundColor: color.color }}></div>
                <div className="sb-stories-color-tokens__color-info">
                  <div className="sb-stories-color-tokens__color-name">{color.name}</div>
                  <div className="sb-stories-color-tokens__color-figma-name">{color.category}/{color.name}</div>
                  <div className="sb-stories-color-tokens__color-hex">{color.colorHex}</div>
                  <div className="sb-stories-color-tokens__color-value">{color.token}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
