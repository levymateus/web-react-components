import { Meta, Story } from '@storybook/react'
import { TextField, TextFieldProps } from '@wrc/components'
import React from 'react'

export default {
  component: TextField,
  title: 'TextField',
  args: {
    label: "Input label",
      id: "my-id"
  },
  argTypes: {
    label: {
      control: { type: 'text' }
    },
    endIcon: { control: null },
    id: { control: null },
    maxLength: { control: 'number' },
    helperText: {
      control: { type: 'text' }
    }
  }
} as Meta

const Template: Story<TextFieldProps> = args => <TextField {...args} />

export const Default = Template.bind({})
