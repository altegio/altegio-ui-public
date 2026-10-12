import type { Meta, StoryObj } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import yCoreIconButtonStoryMeta from '~core/ui/iconButton/stories/IconButton.stories'

import { YIconButton } from '~ng/ui/iconButton'
import { EYCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'


import { createAngularIconButtonParameters, ICON_BUTTON_STORIES_CONFIG, iconButtonSizes, iconButtonIcons } from './IconButton.stories.utils'


const parameters = createAngularIconButtonParameters()

const meta: Meta<YIconButton> = {
  title: 'Buttons/🔍 IconButton',
  id: 'iconButton',
  parameters,
  component: YIconButton,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    return {
      props: {
        ...args,
        onClick: action('click'),
      },
      template: `
        <YIconButton
          [icon]="icon"
          [disabled]="disabled"
          [loading]="loading"
          [size]="size"
          [variant]="variant"
          [href]="href"
          [target]="target"
          [fullWidth]="fullWidth"
          (click)="onClick($event)"
        />
      `,
    }
  },
  argTypes: { ...yCoreIconButtonStoryMeta.argTypes },
  args: { ...yCoreIconButtonStoryMeta.args },
}

export default meta
type Story = StoryObj<YIconButton>

export const Playground: Story = { parameters: ICON_BUTTON_STORIES_CONFIG.Playground.parameters }

export const Variants: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.Variants.parameters,
  render: () => ({
    props: { iconButtonIcons },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YIconButton variant="primary" [icon]="iconButtonIcons.search"></YIconButton>

        <YIconButton variant="outline" [icon]="iconButtonIcons.search"></YIconButton>

        <YIconButton variant="outline-filled" [icon]="iconButtonIcons.search"></YIconButton>

        <YIconButton variant="text" [icon]="iconButtonIcons.search"></YIconButton>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.Sizes.parameters,
  render: () => ({
    props: { iconButtonSizes, iconButtonIcons },
    template: `
      <div style="display: grid; gap: 16px;">
        <div *ngFor="let size of iconButtonSizes" style="display: flex; gap: 8px; align-items: center;">
          <div style="width: 80px; font-weight: 500;">{{ size }}:</div>

          <YIconButton [size]="size" [icon]="iconButtonIcons.search"></YIconButton>
        </div>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.States.parameters,
  render: () => ({
    props: { iconButtonIcons },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YIconButton [icon]="iconButtonIcons.search"></YIconButton>

        <YIconButton [disabled]="true" [icon]="iconButtonIcons.search"></YIconButton>

        <YIconButton [loading]="true" [icon]="iconButtonIcons.search"></YIconButton>
      </div>
    `,
  }),
}

export const PseudoStates: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.PseudoStates.parameters,
  render: () => ({
    props: { iconButtonIcons },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YIconButton [icon]="iconButtonIcons.search"></YIconButton>

        <YIconButton
          [icon]="iconButtonIcons.search"
          style="--y-core-simple-button-variant-primary-background-color: var(--y-core-simple-button-variant-primary-hover-background-color);"
        ></YIconButton>

        <YIconButton
          [icon]="iconButtonIcons.search"
          style="--y-core-simple-button-variant-primary-background-color: var(--y-core-simple-button-variant-primary-hover-background-color);"
        ></YIconButton>
      </div>
    `,
  }),
}

export const FullWidth: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.FullWidth.parameters,
  args: ICON_BUTTON_STORIES_CONFIG.FullWidth.args,
}

export const LinkMode: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.LinkMode.parameters,
  render: () => ({
    props: { iconButtonIcons },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <YIconButton
          href="https://example.com"
          target="_blank"
          [icon]="iconButtonIcons.search"
        ></YIconButton>

        <YIconButton
          href="/internal-page"
          [icon]="iconButtonIcons.rocket"
        ></YIconButton>
      </div>
    `,
  }),
}

export const ComplexDemo: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.ComplexDemo.parameters,
  render: () => {
    const variants = Object.values(EYCoreSimpleButtonVariant)
    return {
      props: { variants, iconButtonIcons },
      template: `
        <div style="display: grid; gap: 16px;">
          <div *ngFor="let variant of variants" style="display: flex; gap: 8px; align-items: center;">
            <div style="width: 80px; font-weight: 500;">{{ variant }}:</div>

            <YIconButton [variant]="variant" size="small" [icon]="iconButtonIcons.search"></YIconButton>

            <YIconButton [variant]="variant" size="medium" [icon]="iconButtonIcons.rocket"></YIconButton>

            <YIconButton [variant]="variant" size="large" [icon]="iconButtonIcons.magic"></YIconButton>

            <YIconButton [variant]="variant" size="medium" [disabled]="true" [icon]="iconButtonIcons.info"></YIconButton>

            <YIconButton [variant]="variant" size="medium" [loading]="true" [icon]="iconButtonIcons.copy"></YIconButton>
          </div>
        </div>
      `,
    }
  },
}
