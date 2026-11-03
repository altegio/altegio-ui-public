import { ESLintUtils } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator((name) => `https://wiki.yandex.ru/product/platform-front-web/linting/${name}`)

/**
 * Checks whether a string fragment is a closing tag.
 * @param {string} part - Fragment to check.
 * @returns {boolean} True for a closing tag, otherwise false.
 */
const isClosingTag = (part) => {
  if (!part) return false
  const trimmed = part.trim()
  return trimmed.startsWith('</') && trimmed.endsWith('>')
}

/**
 * Checks whether a string fragment is an opening tag.
 * @param {string} part - Fragment to check.
 * @returns {boolean} True for an opening tag, otherwise false.
 */
const isOpeningTag = (part) => {
  if (!part) return false
  const trimmed = part.trim()
  return trimmed.startsWith('<') && !trimmed.startsWith('</') && trimmed.endsWith('>')
}

/**
 * Checks whether a string fragment is a self-closing tag.
 * @param {string} part - Fragment to check.
 * @returns {boolean} True for a self-closing tag, otherwise false.
 */
const isSelfClosingTag = (part) => {
  if (!part) return false
  const normalized = part.replace(/\s*\n\s*/g, ' ').trim()
  return normalized.startsWith('<') && !normalized.startsWith('</') && (/\/>$/.test(normalized) || /\s+\/>$/.test(normalized))
}

/**
 * Returns the indentation level of a line (leading spaces divided by 2).
 * @param {string} str - Line to analyze.
 * @returns {number} Indentation level.
 */
const getIndent = (str) => {
  if (!str) return 0
  const withoutNewline = str.replace(/^\n/, '')
  const match = withoutNewline.match(/^\s*/)
  return match ? match[0].length / 2 : 0
}

/**
 * Finds the closing tag that matches the given opening tag.
 * @param {Array<Object>} tags - All tags found in the template.
 * @param {number} startIndex - Index of the opening tag.
 * @returns {number} Index of the matching closing tag.
 */
const findClosingTagPosition = (tags, startIndex) => {
  const openingTag = tags[startIndex]
  const tagName = openingTag.content.match(/<([^\s>]+)/)[1]
  let depth = 1

  // Walk forward until the matching closing tag is found
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
 * Rule entry point: reports sibling tags that are not separated by a line break.
 * @param {Object} context - ESLint rule context.
 * @returns {Function} Visitor that checks a template block.
 */
function checkNewline(context) {
  return (block) => {
    // Offset of the template block within the file
    const templateStart = block.range[0]

    const sourceCode = context.sourceCode
    const templateText = sourceCode.getText(block)
    const lines = templateText.split('\n')

    /**
     * Collects a tag that spans several lines.
     * @param {number} startLine - Line where the tag starts.
     * @param {number} startIndex - Column where the tag starts.
     * @returns {Object} Tag end line, end column and content.
     */
    const getMultilineTagInfo = (startLine, startIndex) => {
      let content = lines[startLine].slice(startIndex)
      let currentLine = startLine
      let endColumn = content.length

      // Keep appending lines until the tag's closing '>' is reached
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

    // Collect every tag in the template into one flat list
    const allTags = []
    lines.forEach((line, lineIndex) => {
      const currentLineNumber = lineIndex + block.loc.start.line
      let match
      const tagRegex = /<\/?[^>]+>?/g

      // Find all tags on the current line
      while ((match = tagRegex.exec(line)) !== null) {
        if (!line.slice(match.index).includes('>')) {
          // Multi-line tags need their full content collected first
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
          // Single-line tag: record it as is
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

    // Check that adjacent tags are separated by a line break
    for (let i = 0; i < allTags.length - 1; i++) {
      const currentTag = allTags[i]
      const nextTag = allTags[i + 1]

      // A closing or self-closing tag followed by an opening or self-closing tag needs a line break between them
      if ((isClosingTag(currentTag.content) || isSelfClosingTag(currentTag.content)) && (isOpeningTag(nextTag.content) || isSelfClosingTag(nextTag.content))) {
        const nextTagEndIndex = isSelfClosingTag(nextTag.content) ? i + 1 : findClosingTagPosition(allTags, i + 1)

        const nextTagEnd = allTags[nextTagEndIndex]
        const lineDifference = nextTag.lineNumber - currentTag.endLineNumber

        // The tags sit on the same or adjacent lines: report it
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

              // Compute the character offset where the line break is inserted
              let position = 0
              for (let lineIndex = 0; lineIndex < currentTag.endLineNumber - block.loc.start.line; lineIndex++) {
                position += lines[lineIndex].length + 1 // +1 for the newline character
              }
              position += currentTag.columnEnd

              const range = [templateStart + position, templateStart + position]

              // Insert the line break and keep the current indentation
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
