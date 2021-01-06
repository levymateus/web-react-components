import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Calendar, CalendarProps } from '@wrc/components'

export default {
  component: Calendar,
  title: 'Calendar',
  argTypes: {
    defaultValue: {
      control: { type: null }
    },
    onChange: {
      control: { type: null }
    }
  }
} as Meta

const Template: Story<CalendarProps> = args => <Calendar {...args} />

export const Default = Template.bind({})
