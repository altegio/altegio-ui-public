import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { AltBreadcrumbs } from '~ng/ui/breadcrumbs'
import { AltBreadcrumbsItem } from '~ng/ui/breadcrumbsItem'
import altCoreBreadcrumbsStoryMeta from '~core/ui/breadcrumbs/stories/Breadcrumbs.stories'

/**
 * Angular wrappers for Core Breadcrumbs.
 */
const meta: Meta<AltBreadcrumbs> = {
  title: '✅ Breadcrumbs',
  id: 'breadcrumbs',
  parameters: { controls: { sort: 'alpha' } },
  component: AltBreadcrumbs,
  decorators: [moduleMetadata({ imports: [AltBreadcrumbsItem] })],
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltBreadcrumbs [accessibleName]="accessibleName">
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
type Story = StoryObj<AltBreadcrumbs>

export const Playground: Story = { args: {} }
