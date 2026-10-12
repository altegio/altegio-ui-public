import React from 'react'
import type { IYIcon } from '~web/shared/icons'

import '~shared/.storybook/assets/css/iframe.css'
import '~shared/.storybook/blocks/Tokens/Icons/Icons.css'
import { copyToClipboard } from '~web/shared/.storybook/utils'
import { useToast } from '../../Toasts/ToastProvider'

type TIconsProps = {
  icons: IYIcon[]
}
const setNormalIconName = (name: string) =>
  name.split('_').map((nameStr) =>
    String(nameStr).charAt(0).toUpperCase() + String(nameStr).slice(1)).join('')

export const Icons = ({ icons }: TIconsProps) => {
  const { show } = useToast()
  const changedIcons = icons.map((icon) => {
    const normalizedIconName = `y${setNormalIconName(icon.name)}`

    return { ...icon, name: normalizedIconName }
  })

  return (
    <div className="sb-stories-icons-tokens">
      {changedIcons.map((icon) =>
        <div key={icon.name} className="sb-stories-icons-tokens__icon"
          onClick={() => {
            copyToClipboard(icon.name)
            show({
              content: `${icon.name}: copied successfully.`,
              duration: 2000
            })
          }}
        >

          <div className="sb-stories-icons-tokens__icon-svg" dangerouslySetInnerHTML={{ __html: icon.data }}>{}</div>
          <p className="sb-stories-icons-tokens__icon-name">{setNormalIconName(icon.name)}</p>
        </div>
      )}
    </div>
  )
}
