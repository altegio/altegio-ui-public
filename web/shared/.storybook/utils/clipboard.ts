export const copyToClipboard = async(token: string): Promise<void> => {
  try {
    const item = new ClipboardItem({
      'text/plain': new Blob(
        [token],
        { type: 'text/plain' },
      ),
    })

    await navigator.clipboard.write([item])
  } catch(error) {
    throw new Error(`Failed to write to clipboard: ${(error as Error).message}`)
  }
}
