import fs from 'fs'

export const createDirectory = (directory: string): string | null => {
  try {
    if (fs.existsSync(directory)) throw new Error(`Директория "${directory}" уже существует`)

    fs.mkdirSync(
      directory,
      { recursive: true },
    )

    console.log(`✅ Директория создана: ${directory}`)

    return directory
  } catch(error) {
    console.error(`❌ Ошибка создания директории: ${error instanceof Error ? error.message : String(error)}`)
    return null
  }
}

export const createFile = (filePath: string, content: string): string | null => {
  try {
    if (fs.existsSync(filePath)) throw new Error(`Файл "${filePath}" уже существует`)

    fs.writeFileSync(
      filePath,
      content,
      'utf-8',
    )

    console.log(`✅ Файл создан: ${filePath}`)

    return filePath
  } catch(error) {
    console.error(`❌ Ошибка создания файла: ${error instanceof Error ? error.message : String(error)}`)
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

    console.log(`✅ Содержимое добавлено в файл: ${filePath}`)

    return filePath
  } catch(error) {
    console.error(`❌ Ошибка добавления содержимого в файл: ${error instanceof Error ? error.message : String(error)}`)
    return null
  }
}

export const renameDirectory = (oldPath: string, newPath: string): boolean => {
  try {
    fs.renameSync(
      oldPath,
      newPath,
    )

    console.log(`✅ Директория переименована: ${oldPath} -> ${newPath}`)

    return true
  } catch(error) {
    console.error(
      `❌ Ошибка переименования директории ${oldPath} в ${newPath}:`,
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

    console.log(`✅ Файл переименован: ${oldPath} -> ${newPath}`)

    return true
  } catch(error) {
    console.error(
      `❌ Ошибка переименования файла ${oldPath} в ${newPath}:`,
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
      `❌ Ошибка чтения файла ${filePath}:`,
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

    console.log(`✅ Файл обновлен: ${filePath}`)

    return true
  } catch(error) {
    console.error(
      `❌ Ошибка обновления файла ${filePath}:`,
      error,
    )
    return false
  }
}
