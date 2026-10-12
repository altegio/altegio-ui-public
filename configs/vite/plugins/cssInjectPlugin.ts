import type { Plugin } from 'vite'
import * as fs from 'fs'
import * as path from 'path'
import { gzipSync } from 'node:zlib'

interface ICssInjectPluginOptions {
  outPath: string
  cssContent: string
  fileName: string
}

// TODO: Вынести в отдельную утилитарную функцию для форматирования чисел или найти готовое решение
const bytesToKb = (bytes: number) => (bytes / 1024).toFixed(2)

/**
 * Опции для плагина cssInjectPlugin
 * @interface ICssInjectPluginOptions
 * @property {string} [outPath='dist'] - Путь для сохранения CSS файла, относительно корня проекта, без слэша на конце
 * @property {string} [cssContent=''] - Содержимое CSS для инъекции
 * @property {string} [fileName='injected.css'] - Имя выходного CSS файла, относительно outPath
 */
export default function cssInjectPlugin({
  outPath = 'dist',
  cssContent = '',
  fileName = 'injected.css'
}: ICssInjectPluginOptions): Plugin {
  return {
    name: 'css-inject',
    buildStart() {
      const filePath = path.resolve(__dirname, `../../../${outPath}/${fileName}`)
      const dirPath = path.dirname(filePath)

      // Создаем директории рекурсивно, если они не существуют
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
      }

      fs.writeFileSync(filePath, cssContent)
      
      const stats = fs.statSync(filePath)
      const fileSizeInKb = bytesToKb(stats.size)
      
      const gzippedSize = gzipSync(Buffer.from(cssContent)).length
      const gzippedSizeInKb = bytesToKb(gzippedSize)
      
      console.log(`> CSS файл ${fileName} был записан в ${outPath} | Размер файла: ${fileSizeInKb} KB (gzip: ${gzippedSizeInKb} KB)`)
    }
  }
}
