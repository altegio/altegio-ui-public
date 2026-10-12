import React from 'react'
import { TypographyGroup } from './TypographyGroup'
import type { TTokensJSON } from '~tokens/index'
import { getGroupedTypographyTokens } from './utils'

import '~shared/.storybook/assets/css/iframe.css'
import '~shared/.storybook/blocks/Tokens/Typography/Typography.css'

type TTypographyProps = {
  typography: TTokensJSON
}

export const Typography = ({ typography }: TTypographyProps) => {
  return (
    <div className="sb-stories-typography-tokens">
      {Object.entries(getGroupedTypographyTokens(typography)).map(([
        category,
        groups
      ]) =>
        <div key={category}>
          <h2 className="sb-stories-typography-tokens__category">{category}</h2>

          <div className="sb-stories-typography-tokens__groups">
            {Object.keys(groups).map((groupName) =>
              <TypographyGroup name={groupName} group={groups[groupName]} category={category} key={groupName}>
              </TypographyGroup>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
