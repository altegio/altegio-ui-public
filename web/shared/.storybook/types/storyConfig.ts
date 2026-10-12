export interface IStoryConfig {
  parameters: {
    docs: {
      title: string
      description: {
        story: string
      }
    }
  }
  args?: Record<string, unknown>
}
