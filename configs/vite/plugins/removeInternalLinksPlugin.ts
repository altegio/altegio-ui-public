import type { Plugin } from 'vite'

const INTERNAL_DOMAINS = [
  'gitlab.altegio.dev',
  'figma.com',
]

const INTERNAL_TERMS = [ // При добавлении новых элементов экранировать спецсимволы
  'Ссылка на \\[Figma\\]'
]

const internalDomainsPattern = INTERNAL_DOMAINS.join('|').replace(/\./g, '\\.');
const internalTermsPattern = INTERNAL_TERMS.join('|')

const internalLinksRegExp = new RegExp(`\\(https?://(?:[^)]*\\.)?(?:${internalDomainsPattern})[^()]*(?:\\([^()]*\\)[^()]*)*\\)`, 'g')
const internalTermsRegExp = new RegExp(internalTermsPattern, 'gi')

export default function removeInternalLinksPlugin(): Plugin {
  return {
    name: 'remove-internal-links',

    transform(code: string, id: string) {
      if (id.includes('node_modules')) return code

      return code
        .replace(internalLinksRegExp, '')
        .replace(internalTermsRegExp, '');
    }
  }
}