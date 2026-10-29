import type { Plugin } from 'vite'
import * as fs from 'fs'
import * as path from 'path'
import { gzipSync } from 'node:zlib'

interface ICssInjectPluginOptions {
  outPath: string
  cssContent: string
  fileName: string
}

// TODO: Move to a shared number-formatting helper or use an existing library
const bytesToKb = (bytes: number) => (bytes / 1024).toFixed(2)

/**
 * Options for cssInjectPlugin
 * @interface ICssInjectPluginOptions
 * @property {string} [outPath='dist'] - Output directory for the CSS file, relative to the project root, without a trailing slash
 * @property {string} [cssContent=''] - CSS to write into the file
 * @property {string} [fileName='injected.css'] - Output CSS file name, relative to outPath
 */
export default function cssInjectPlugin({
  outPath = 'dist',
  cssContent = '',
  fileName = 'injected.css'
}: ICssInjectPluginOptions): Plugin {
  return {
    name: 'css-inject',
    buildStart() {
      const filePath = path.resolve(import.meta.dirname, `../../../${outPath}/${fileName}`)
      const dirPath = path.dirname(filePath)

      // Create the output directory, including missing parents
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
