import { globSync } from 'glob'
import { fileURLToPath } from 'node:url'

type TGetRollupOptionsInputPayload = {
  inputFilePath: (file: string) => string
  rollupOptionsInputPath: string
}
export const getRollupOptionsInput = ({
  inputFilePath,
  rollupOptionsInputPath,
}: TGetRollupOptionsInputPayload) => Object.fromEntries(
  globSync(rollupOptionsInputPath)
    .map(file => [
      inputFilePath(file),
      fileURLToPath(new URL(file, import.meta.url)),
    ])
)
