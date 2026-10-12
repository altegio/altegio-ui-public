type ConsoleMethod = 'log' | 'warn' | 'error'

const ignoreMessages: Record<ConsoleMethod, string[]> = {
  log: [],
  warn: [
    'decodeEntities option is passed but will be ignored in non-browser builds',
    'Lit is in dev mode.',
    'scheduled an update (generally because a property was set) after an update completed',
    'sanitizing HTML stripped some content',
    '[Vue warn]: Missing required prop', // TODO: Добавить обязательные пропы в тесты
    'has no corresponding declaration.', // TODO: Проверить типы во Vue компонентах
  ],
  error: [
    'NG0303: Can\'t bind to', // TODO: Проверить ошибки в Angular компонентах
  ],
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
