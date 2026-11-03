import { EPlatform, EPlatformPathSlug } from '~cli/types'

export const getPlatformPathSlug = (platform: `${EPlatform}`): EPlatformPathSlug => {
  if (platform === EPlatform.NG) return EPlatformPathSlug.NG

  return platform as EPlatformPathSlug
}
