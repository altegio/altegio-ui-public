import type { Meta, StoryObj } from '@storybook/vue3'

import { YAvatar } from '~vue/ui/avatar'
import { type IYVueAvatarProps } from '~vue/ui/avatar/models/types'
import yCoreAvatarStoryMeta from '~core/ui/avatar/stories/Avatar.stories'

type TVueAvatarStoryMeta = IYVueAvatarProps

/**
 * ## Vue обертка для Core Avatar
 * Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-%7C-Components-(IN-PROGRESS)?node-id=2152-8128&t=UHE9iX3bdxjp7Vvd-0)
 *
 * Компонент для отображения аватара пользователя.
 *
 * ### Варианты использования
 * - Отображение фотографии пользователя
 * - Отображение инициалов при отсутствии фото
 * - Разные размеры для разных контекстов
 *
 * ### Примечание
 * Для тестирования компонента можно использовать сервис https://i.pravatar.cc
 * Поддерживает различные разрешения, например:
 * - https://i.pravatar.cc/150
 * - https://i.pravatar.cc/300
 * - https://i.pravatar.cc/500
 */
const meta: Meta<TVueAvatarStoryMeta> = {
  title: '⚠️ Avatar',
  id: 'avatar',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YAvatar },
    setup() {
      return { args }
    },
    template: `
      <YAvatar v-bind="args" />
    `,
  }),
  argTypes: { ...yCoreAvatarStoryMeta.argTypes },
  args: { ...yCoreAvatarStoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
