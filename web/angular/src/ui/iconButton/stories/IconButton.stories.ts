import type { Meta, StoryObj } from '@storybook/angular'
import { action } from 'storybook/actions'
import altCoreIconButtonStoryMeta from '~core/ui/iconButton/stories/IconButton.stories'

import { AltIconButton } from '~ng/ui/iconButton'
import { EAltCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'


import { createAngularIconButtonParameters, ICON_BUTTON_STORIES_CONFIG, iconButtonSizes, iconButtonIcons } from './IconButton.stories.utils'


const parameters = createAngularIconButtonParameters()

const meta: Meta<AltIconButton> = {
  title: 'Buttons/🔍 IconButton',
  id: 'iconButton',
  parameters,
  component: AltIconButton,
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
        <AltIconButton
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
  argTypes: { ...altCoreIconButtonStoryMeta.argTypes },
  args: { ...altCoreIconButtonStoryMeta.args },
}

export default meta
type Story = StoryObj<AltIconButton>

export const Playground: Story = { parameters: ICON_BUTTON_STORIES_CONFIG.Playground.parameters }

export const Variants: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.Variants.parameters,
  render: () => ({
    props: { iconButtonIcons },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <AltIconButton variant="primary" [icon]="iconButtonIcons.search"></AltIconButton>

        <AltIconButton variant="outline" [icon]="iconButtonIcons.search"></AltIconButton>

        <AltIconButton variant="outline-filled" [icon]="iconButtonIcons.search"></AltIconButton>

        <AltIconButton variant="text" [icon]="iconButtonIcons.search"></AltIconButton>
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

          <AltIconButton [size]="size" [icon]="iconButtonIcons.search"></AltIconButton>
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
        <AltIconButton [icon]="iconButtonIcons.search"></AltIconButton>

        <AltIconButton [disabled]="true" [icon]="iconButtonIcons.search"></AltIconButton>

        <AltIconButton [loading]="true" [icon]="iconButtonIcons.search"></AltIconButton>
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
        <AltIconButton [icon]="iconButtonIcons.search"></AltIconButton>

        <AltIconButton
          [icon]="iconButtonIcons.search"
          style="--alt-core-simple-button-variant-primary-background-color: var(--alt-core-simple-button-variant-primary-hover-background-color);"
        ></AltIconButton>

        <AltIconButton
          [icon]="iconButtonIcons.search"
          style="--alt-core-simple-button-variant-primary-background-color: var(--alt-core-simple-button-variant-primary-hover-background-color);"
        ></AltIconButton>
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
        <AltIconButton
          href="https://example.com"
          target="_blank"
          [icon]="iconButtonIcons.search"
        ></AltIconButton>

        <AltIconButton
          href="/internal-page"
          [icon]="iconButtonIcons.rocket"
        ></AltIconButton>
      </div>
    `,
  }),
}

export const ComplexDemo: Story = {
  parameters: ICON_BUTTON_STORIES_CONFIG.ComplexDemo.parameters,
  render: () => {
    const variants = Object.values(EAltCoreSimpleButtonVariant)
    return {
      props: { variants, iconButtonIcons },
      template: `
        <div style="display: grid; gap: 16px;">
          <div *ngFor="let variant of variants" style="display: flex; gap: 8px; align-items: center;">
            <div style="width: 80px; font-weight: 500;">{{ variant }}:</div>

            <AltIconButton [variant]="variant" size="small" [icon]="iconButtonIcons.search"></AltIconButton>

            <AltIconButton [variant]="variant" size="medium" [icon]="iconButtonIcons.rocket"></AltIconButton>

            <AltIconButton [variant]="variant" size="large" [icon]="iconButtonIcons.magic"></AltIconButton>

            <AltIconButton [variant]="variant" size="medium" [disabled]="true" [icon]="iconButtonIcons.info"></AltIconButton>

            <AltIconButton [variant]="variant" size="medium" [loading]="true" [icon]="iconButtonIcons.copy"></AltIconButton>
          </div>
        </div>
      `,
    }
  },
}
