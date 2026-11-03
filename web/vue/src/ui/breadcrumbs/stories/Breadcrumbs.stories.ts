import type { Meta, StoryObj } from '@storybook/vue3'
import { AltBreadcrumbs } from '~vue/ui/breadcrumbs'
import { AltBreadcrumbsItem } from '~vue/ui/breadcrumbsItem'
import type { IAltVueBreadcrumbsProps } from '~vue/ui/breadcrumbs/models/types'
import altCoreBreadcrumbsStoryMeta from '~core/ui/breadcrumbs/stories/Breadcrumbs.stories'

/**
 * Vue wrappers for Core Breadcrumbs. With Vue Router, handle `@click` on an item:
 * `@click.prevent="router.push(item.to)"`.
 */
const meta: Meta<IAltVueBreadcrumbsProps> = {
  title: '✅ Breadcrumbs',
  id: 'breadcrumbs',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltBreadcrumbs, AltBreadcrumbsItem },
    setup() {
      return { args }
    },
    template: `
      <AltBreadcrumbs v-bind="args">
        <AltBreadcrumbsItem href="#settings">Settings</AltBreadcrumbsItem>
        
        <AltBreadcrumbsItem href="#settings/staff">Team members</AltBreadcrumbsItem>
        
        <AltBreadcrumbsItem href="#settings/staff/42">Anna Smith</AltBreadcrumbsItem>
      </AltBreadcrumbs>
    `,
  }),
  argTypes: altCoreBreadcrumbsStoryMeta.argTypes,
  args: altCoreBreadcrumbsStoryMeta.args,
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
