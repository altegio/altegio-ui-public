import { ESLintUtils } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator((name) => `https://wiki.yandex.ru/product/platform-front-web/linting/${name}`)

/**
 * Проверяет, является ли часть строки закрывающим тегом.
 * @param {string} part - Часть строки для проверки.
 * @returns {boolean} True, если это закрывающий тег, иначе false.
 */
const isClosingTag = (part) => {
  if (!part) return false
  const trimmed = part.trim()
  return trimmed.startsWith('</') && trimmed.endsWith('>')
}

/**
 * Проверяет, является ли часть строки открывающим тегом.
 * @param {string} part - Часть строки для проверки.
 * @returns {boolean} True, если это открывающий тег, иначе false.
 */
const isOpeningTag = (part) => {
  if (!part) return false
  const trimmed = part.trim()
  return trimmed.startsWith('<') && !trimmed.startsWith('</') && trimmed.endsWith('>')
}

/**
 * Проверяет, является ли часть строки самозакрывающимся тегом.
 * @param {string} part - Часть строки для проверки.
 * @returns {boolean} True, если это самозакрывающийся тег, иначе false.
 */
const isSelfClosingTag = (part) => {
  if (!part) return false
  const normalized = part.replace(/\s*\n\s*/g, ' ').trim()
  return normalized.startsWith('<') && !normalized.startsWith('</') && (/\/>$/.test(normalized) || /\s+\/>$/.test(normalized))
}

/**
 * Возвращает уровень отступа строки (количество пробелов, деленное на 2).
 * @param {string} str - Строка для анализа.
 * @returns {number} Уровень отступа.
 */
const getIndent = (str) => {
  if (!str) return 0
  const withoutNewline = str.replace(/^\n/, '')
  const match = withoutNewline.match(/^\s*/)
  return match ? match[0].length / 2 : 0
}

/**
 * Находит позицию закрывающего тега для текущего открывающего тега.
 * @param {Array<Object>} tags - Массив всех тегов в шаблоне.
 * @param {number} startIndex - Индекс открывающего тега.
 * @returns {number} Индекс закрывающего тега.
 */
const findClosingTagPosition = (tags, startIndex) => {
  const openingTag = tags[startIndex]
  const tagName = openingTag.content.match(/<([^\s>]+)/)[1]
  let depth = 1

  // Проходим по всем тегам, чтобы найти соответствующий закрывающий тег
  for (let i = startIndex + 1; i < tags.length; i++) {
    const currentTag = tags?.[i]?.content
    if (currentTag?.includes(`<${tagName}`)) {
      depth++
    } else if (currentTag?.includes(`</${tagName}`)) {
      depth--
      if (depth === 0) {
        return i
      }
    }
  }

  return startIndex
}

/**
 * Основная функция, которая проверяет наличие переноса строки между тегами.
 * @param {Object} context - Контекст ESLint.
 * @returns {Function} Функция, которая проверяет блок шаблона.
 */
function checkNewline(context) {
  return (block) => {
    // Позиция начала шаблона в файле
    const templateStart = block.range[0]

    const sourceCode = context.getSourceCode()
    const templateText = sourceCode.getText(block)
    const lines = templateText.split('\n')

    /**
     * Получает информацию о многострочном теге.
     * @param {number} startLine - Начальная строка тега.
     * @param {number} startIndex - Начальный индекс в строке.
     * @returns {Object} Информация о теге (конечная строка, конечный столбец, содержимое).
     */
    const getMultilineTagInfo = (startLine, startIndex) => {
      let content = lines[startLine].slice(startIndex)
      let currentLine = startLine
      let endColumn = content.length

      // Собираем содержимое тега, пока не найдем закрывающий символ '>'
      while (!content.includes('>') && currentLine < lines.length - 1) {
        currentLine++
        content += lines[currentLine]
        endColumn = lines[currentLine].indexOf('>') + 1
      }

      return {
        endLine: currentLine,
        endColumn,
        content: content.replace(/\s+/g, ' ').trim(),
      }
    }

    // Собираем все теги из шаблона в один массив
    const allTags = []
    lines.forEach((line, lineIndex) => {
      const currentLineNumber = lineIndex + block.loc.start.line
      let match
      const tagRegex = /<\/?[^>]+>?/g

      // Находим все теги в текущей строке
      while ((match = tagRegex.exec(line)) !== null) {
        if (!line.slice(match.index).includes('>')) {
          // Если тег многострочный, обрабатываем его отдельно
          const multilineInfo = getMultilineTagInfo(lineIndex, match.index)
          allTags.push({
            content: multilineInfo.content.match(/<[^>]+>/)?.[0],
            position: match.index,
            lineNumber: currentLineNumber,
            columnEnd: multilineInfo.endColumn,
            fullLine: line,
            endLineNumber: block.loc.start.line + multilineInfo.endLine,
          })
        } else {
          // Если тег однострочный, добавляем его в массив
          allTags.push({
            content: match[0],
            position: match.index,
            lineNumber: currentLineNumber,
            columnEnd: match.index + match[0].length,
            fullLine: line,
            endLineNumber: currentLineNumber,
          })
        }
      }
    })

    // Проверяем наличие переноса строки между тегами
    for (let i = 0; i < allTags.length - 1; i++) {
      const currentTag = allTags[i]
      const nextTag = allTags[i + 1]

      // Если текущий тег — закрывающий или самозакрывающийся, а следующий — открывающий или самозакрывающийся
      if ((isClosingTag(currentTag.content) || isSelfClosingTag(currentTag.content)) && (isOpeningTag(nextTag.content) || isSelfClosingTag(nextTag.content))) {
        const nextTagEndIndex = isSelfClosingTag(nextTag.content) ? i + 1 : findClosingTagPosition(allTags, i + 1)

        const nextTagEnd = allTags[nextTagEndIndex]
        const lineDifference = nextTag.lineNumber - currentTag.endLineNumber

        // Если между тегами нет переноса строки, сообщаем об ошибке
        if (lineDifference <= 1) {
          context.report({
            messageId: 'missingLineBreak',
            loc: {
              start: {
                line: nextTag.lineNumber,
                column: nextTag.position,
              },
              end: {
                line: nextTagEnd.endLineNumber,
                column: nextTagEnd.columnEnd,
              },
            },
            fix(fixer) {
              const indent = getIndent(nextTag.fullLine)

              // Вычисляем позицию для вставки переноса строки
              let position = 0
              for (let lineIndex = 0; lineIndex < currentTag.endLineNumber - block.loc.start.line; lineIndex++) {
                position += lines[lineIndex].length + 1 // +1 для учета символа новой строки
              }
              position += currentTag.columnEnd

              const range = [templateStart + position, templateStart + position]

              // Вставляем перенос строки с учетом отступа
              if (currentTag.lineNumber === nextTag.lineNumber) {
                return fixer.insertTextAfterRange(range, '\n\n' + ' '.repeat(indent * 2))
              }

              return fixer.insertTextAfterRange(range, '\n' + ' '.repeat(indent * 2))
            },
          })
        }
      }
    }
  }
}

const rule = createRule({
  name: 'padding-line-between-tags',
  meta: {
    type: 'problem',
    docs: {
      description: 'There should be a line break between HTML tags in template literals',
      recommended: 'error',
    },
    fixable: 'whitespace',
    schema: [],
    messages: {
      missingLineBreak: 'There should be a line break between HTML tags',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      TemplateElement: checkNewline(context),
    }
  },
})

export default rule
