import type { Meta, StoryObj } from '@storybook/angular'

import { YAvatar } from '~ng/ui/avatar'
import yCoreAvatarStoryMeta from '~core/ui/avatar/stories/Avatar.stories'

/**
 * ## Angular обертка для YAvatar
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
const meta: Meta<YAvatar> = {
  title: '⚠️ Avatar',
  id: 'avatar',
  parameters: { controls: { sort: 'alpha' } },
  component: YAvatar,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <YAvatar
        [photo]="photo"
        [initials]="initials"
        [disabled]="disabled"
        [size]="size"
        [icon]="icon"
      />
    `,
  }),
  argTypes: { ...yCoreAvatarStoryMeta.argTypes },
  args: { ...yCoreAvatarStoryMeta.args },
} satisfies Meta<YAvatar>

export default meta
type Story = StoryObj<YAvatar>

export const Playground: Story = { args: {} }
