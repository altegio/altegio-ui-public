type ConsoleMethod = 'log' | 'warn' | 'error'

const ignoreMessages: Record<ConsoleMethod, string[]> = {
  log: [],
  warn: [
    'decodeEntities option is passed but will be ignored in non-browser builds',
    'Lit is in dev mode.',
    'scheduled an update (generally because a property was set) after an update completed',
    'sanitizing HTML stripped some content',
  ],
  error: [],
}

function patchConsole(method: ConsoleMethod) {
  const original = console[method]
  console[method] = (...args: any[]) => {
    const msg = args[0]
    if (
      typeof msg === 'string' &&
      ignoreMessages[method].some((ignore) => msg.includes(ignore))
    ) {
      return
    }
    original.apply(console, args)
  }
}

patchConsole('log')
patchConsole('warn')
patchConsole('error')
