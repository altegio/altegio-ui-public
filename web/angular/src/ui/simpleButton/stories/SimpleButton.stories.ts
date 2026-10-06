import {
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonModule } from '@angular/common'

import { YSimpleButton } from '~ng/ui/simpleButton'
import { YIcon } from '~ng/ui/icon'
import { ySearch } from '~shared/icons/build/y-search.icon'
import yCoreSimpleButtonStoryMeta from '~core/ui/simpleButton/stories/SimpleButton.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { action } from '@storybook/addon-actions'
import { createSimpleButtonParameters, SIMPLE_BUTTON_STORIES_CONFIG } from '~core/ui/simpleButton/stories/SimpleButton.stories.utils'
import { EFrameworkName } from '~web/shared/.storybook/enums/frameworkName'

const meta: Meta<YSimpleButton> = {
  title: 'Buttons/⚙️ SimpleButton',
  id: 'simpleButton',
  component: YSimpleButton,
  parameters: createSimpleButtonParameters(EFrameworkName.ANGULAR),
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: {
      ...args,
      ySearch,
      LOREM_IPSUM,
      onClick: action('click'),
    },
    moduleMetadata: {
      imports: [
        CommonModule,
        YIcon,
      ],
    },
    template: `
      <YSimpleButton
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
          <YIcon [icon]="ySearch" size="16px" />

          <span>
            {{ isLongText ? LOREM_IPSUM : text }}
          </span>
        }

        @if (!showContent) {
          {{ isLongText ? LOREM_IPSUM : text }}
        }
      </YSimpleButton>`,
  }),
  argTypes: { ...yCoreSimpleButtonStoryMeta.argTypes },
  args: { ...yCoreSimpleButtonStoryMeta.args },
} satisfies Meta<YSimpleButton>

export default meta
type Story = StoryObj<YSimpleButton>

export const Playground: Story = { args: {} }

export const Variants: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.Variants.parameters,
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YSimpleButton variant="primary">Primary</YSimpleButton>

        <YSimpleButton variant="outline">Outline</YSimpleButton>

        <YSimpleButton variant="outline-filled">Outline-filled</YSimpleButton>

        <YSimpleButton variant="text">Text</YSimpleButton>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.Sizes.parameters,
  render: () => ({
    props: {
      sizes: ['small', 'medium', 'large'],
      ySearch,
    },
    moduleMetadata: { imports: [YIcon] },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <YSimpleButton
          *ngFor="let size of sizes"
          [size]="size"
        >
          <YIcon
            [icon]="ySearch"
            [size]="size === 'large' ? '24px' : '16px'"
          ></YIcon>
          {{ size }}
        </YSimpleButton>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.States.parameters,
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YSimpleButton>Default</YSimpleButton>

        <YSimpleButton disabled>Disabled</YSimpleButton>

        <YSimpleButton loading>Loading</YSimpleButton>
      </div>
    `,
  }),
}

export const PseudoStates: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.PseudoStates.parameters,
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YSimpleButton>Default</YSimpleButton>

        <YSimpleButton disabled>Disabled</YSimpleButton>

        <YSimpleButton loading>Loading</YSimpleButton>
      </div>
    `,
  }),
}

export const FullWidth: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.FullWidth.parameters,
  render: () => ({
    template: `
    
      <div>
        <YSimpleButton [fullWidth]="true">Кнопка на всю ширину</YSimpleButton>
      </div>
    `,
  }),
}

export const LinkMode: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.LinkMode.parameters,
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YSimpleButton href="https://example.com" target="_blank">External Link</YSimpleButton>

        <YSimpleButton href="/internal-page">Internal Link</YSimpleButton>
      </div>
    `,
  }),
}

export const ComplexDemo: Story = {
  parameters: SIMPLE_BUTTON_STORIES_CONFIG.ComplexDemo.parameters,
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YSimpleButton variant="primary">Primary</YSimpleButton>

        <YSimpleButton variant="outline">Outline</YSimpleButton>

        <YSimpleButton variant="outline-filled">Outline-filled</YSimpleButton>

        <YSimpleButton variant="text">Text</YSimpleButton>
      </div>
    `,
  }),
}
