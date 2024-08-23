import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { EditableSpan } from '../common/components/EditableSpan/EditableSpan';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLISTS/EditableSpan',
  component: EditableSpan,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    changeTitle: {
      description: 'Change title on click',
      action: 'clicked'
    }
  },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const EditableSpanStory: Story = {
  args: {
    title: 'any span',
    removeItem: action('Remove title on click'),
    changeTitle: action('Change title on click')
  },
};
