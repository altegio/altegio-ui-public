import { exec } from 'child_process'

/**
 * Runs a command in a child process
 * @param {string} command - Command to run
 * @param {Object} options - Options
 * @param {function(string):void} [options.onDataStdout] - Callback for stdout chunks
 * @param {function(string):void} [options.onDataStderr] - Callback for stderr chunks
 * @returns {Promise<{stdout: string, stderr: string}>} Promise with the command output
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
