import {
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonModule } from '@angular/common'

import { AltSimpleButton } from '~ng/ui/simpleButton'
import { AltIcon } from '~ng/ui/icon'
import { altSearch } from '~shared/icons/build/alt-search.icon'
import altCoreSimpleButtonStoryMeta from '~core/ui/simpleButton/stories/SimpleButton.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { action } from 'storybook/actions'
import { createSimpleButtonParameters, SIMPLE_BUTTON_STORIES_CONFIG } from '~core/ui/simpleButton/stories/SimpleButton.stories.utils'
import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'

const meta: Meta<AltSimpleButton> = {
  title: 'Buttons/⚙️ SimpleButton',
  id: 'simpleButton',
  component: AltSimpleButton,
  parameters: createSimpleButtonParameters(EFrameworkName.ANGULAR),
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: {
      ...args,
      altSearch,
      LOREM_IPSUM,
      onClick: action('click'),
    },
    moduleMetadata: {
      imports: [
        CommonModule,
        AltIcon,
      ],
    },
    template: `
      <AltSimpleButton
        [size]="size"
        [variant]="variant"
        [disabled]="disabled"
        [loading]="loading"
        [href]="href"
        [target]="target"
        [alignment]="alignment"
        [fullWidth]="fullWidth"
        [hostStyles]="hostStyles"
        (click)="onClick($event)"
      >
        @if (showContent) {
          <AltIcon [icon]="altSearch" size="16px" />

          <span>
            {{ isLongText ? LOREM_IPSUM : text }}
          </span>
        }

        @if (!showContent) {
          {{ isLongText ? LOREM_IPSUM : text }}
        }
      </AltSimpleButton>`,
  }),
  argTypes: { ...altCoreSimpleButtonStoryMeta.argTypes },
  args: { ...altCoreSimpleButtonStoryMeta.args },
} satisfies Meta<AltSimpleButton>

export default meta
type Story = StoryObj<AltSimpleButton>

export const Playground: Story = { args: {} }

export const Variants: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.Variants.parameters,
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltSimpleButton variant="primary">Primary</AltSimpleButton>

        <AltSimpleButton variant="outline">Outline</AltSimpleButton>

        <AltSimpleButton variant="outline-filled">Outline-filled</AltSimpleButton>

        <AltSimpleButton variant="text">Text</AltSimpleButton>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.Sizes.parameters,
  render: () => ({
    props: {
      sizes: ['small', 'medium', 'large'],
      altSearch,
    },
    moduleMetadata: { imports: [AltIcon] },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <AltSimpleButton
          *ngFor="let size of sizes"
          [size]="size"
        >
          <AltIcon
            [icon]="altSearch"
            [size]="size === 'large' ? '24px' : '16px'"
          ></AltIcon>
          {{ size }}
        </AltSimpleButton>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.States.parameters,
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltSimpleButton>Default</AltSimpleButton>

        <AltSimpleButton disabled>Disabled</AltSimpleButton>

        <AltSimpleButton loading>Loading</AltSimpleButton>
      </div>
    `,
  }),
}

export const PseudoStates: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.PseudoStates.parameters,
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltSimpleButton>Default</AltSimpleButton>

        <AltSimpleButton disabled>Disabled</AltSimpleButton>

        <AltSimpleButton loading>Loading</AltSimpleButton>
      </div>
    `,
  }),
}

export const FullWidth: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.FullWidth.parameters,
  render: () => ({
    template: `
    
      <div>
        <AltSimpleButton [fullWidth]="true">Full-width button</AltSimpleButton>
      </div>
    `,
  }),
}

export const LinkMode: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.LinkMode.parameters,
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltSimpleButton href="https://example.com" target="_blank">External Link</AltSimpleButton>

        <AltSimpleButton href="/internal-page">Internal Link</AltSimpleButton>
      </div>
    `,
  }),
}

export const ComplexDemo: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.ComplexDemo.parameters,
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltSimpleButton variant="primary">Primary</AltSimpleButton>

        <AltSimpleButton variant="outline">Outline</AltSimpleButton>

        <AltSimpleButton variant="outline-filled">Outline-filled</AltSimpleButton>

        <AltSimpleButton variant="text">Text</AltSimpleButton>
      </div>
    `,
  }),
}
