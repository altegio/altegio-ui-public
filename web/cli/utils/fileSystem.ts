import fs from 'fs'

export const createDirectory = (directory: string): string | null => {
  try {
    if (fs.existsSync(directory)) throw new Error(`Directory "${directory}" already exists`)

    fs.mkdirSync(
      directory,
      { recursive: true },
    )

    console.log(`✅ Directory created: ${directory}`)

    return directory
  } catch(error) {
    console.error(`❌ Failed to create directory: ${error instanceof Error ? error.message : String(error)}`)
    return null
  }
}

export const createFile = (filePath: string, content: string): string | null => {
  try {
    if (fs.existsSync(filePath)) throw new Error(`File "${filePath}" already exists`)

    fs.writeFileSync(
      filePath,
      content,
      'utf-8',
    )

    console.log(`✅ File created: ${filePath}`)

    return filePath
  } catch(error) {
    console.error(`❌ Failed to create file: ${error instanceof Error ? error.message : String(error)}`)
    return null
  }
}

export const appendToFile = (filePath: string, content: string): string | null => {
  try {
    fs.appendFileSync(
      filePath,
      content,
      'utf-8',
    )

    console.log(`✅ Content appended to file: ${filePath}`)

    return filePath
  } catch(error) {
    console.error(`❌ Failed to append content to file: ${error instanceof Error ? error.message : String(error)}`)
    return null
  }
}

export const renameDirectory = (oldPath: string, newPath: string): boolean => {
  try {
    fs.renameSync(
      oldPath,
      newPath,
    )

    console.log(`✅ Directory renamed: ${oldPath} -> ${newPath}`)

    return true
  } catch(error) {
    console.error(
      `❌ Failed to rename directory ${oldPath} to ${newPath}:`,
      error,
    )
    return false
  }
}

export const renameFile = (oldPath: string, newPath: string): boolean => {
  try {
    fs.renameSync(
      oldPath,
      newPath,
    )

    console.log(`✅ File renamed: ${oldPath} -> ${newPath}`)

    return true
  } catch(error) {
    console.error(
      `❌ Failed to rename file ${oldPath} to ${newPath}:`,
      error,
    )
    return false
  }
}

export const readFile = (filePath: string): string | null => {
  try {
    return fs.readFileSync(
      filePath,
      'utf-8',
    )
  } catch(error) {
    console.error(
      `❌ Failed to read file ${filePath}:`,
      error,
    )
    return null
  }
}

export const updateFile = (filePath: string, updateFn: (content: string) => string): boolean => {
  try {
    const content = fs.readFileSync(
      filePath,
      'utf-8',
    )

    const updatedContent = updateFn(content)

    fs.writeFileSync(
      filePath,
      updatedContent,
    )

    console.log(`✅ File updated: ${filePath}`)

    return true
  } catch(error) {
    console.error(
      `❌ Failed to update file ${filePath}:`,
      error,
    )
    return false
  }
}
