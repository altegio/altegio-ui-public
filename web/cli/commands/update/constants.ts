import type { EPlatformPathSlug } from '~cli/types'

export const COMPONENT_CONSTANTS_RELATIVE_PATH = 'web/shared/constants/index.ts'
export const DECLARE_TYPES_RELATIVE_PATH = (platform: EPlatformPathSlug) => `web/${platform}/src/index.ts`

