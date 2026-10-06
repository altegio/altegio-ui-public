import { exec } from 'child_process'

/**
 * Асинхронно выполняет команду в дочернем процессе
 * @param {string} command - Команда для выполнения
 * @param {Object} options - Опции
 * @param {function(string):void} [options.onDataStdout] - Колбэк для обработки данных из stdout
 * @param {function(string):void} [options.onDataStderr] - Колбэк для обработки данных из stderr
 * @returns {Promise<{stdout: string, stderr: string}>} Промис с результатом выполнения команды
 */
export const execAsync = (
  command: string,
  {
    onDataStdout,
    onDataStderr,
  }: {
    onDataStdout?: (data: string) => void
    onDataStderr?: (data: string) => void
  } = {},
) => new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
  // eslint-disable-next-line sonarjs/os-command
  const childProcess = exec(
    command,
    (error, stdout, stderr) => {
      if (error) reject(error)
      resolve({ stdout, stderr })
    },
  )

  if (onDataStdout) {
    childProcess.stdout?.on(
      'data',
      (data) => {
        onDataStdout(`${data}`)
      },
    )
  }

  if (onDataStderr) {
    childProcess.stderr?.on(
      'data',
      (data) => {
        onDataStderr(`${data}`)
      },
    )
  }
})
