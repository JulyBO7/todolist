import type { Meta, StoryObj } from '@storybook/react';
import { Task } from '../featuries/todolistsList';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // changeTask: {
    //   description: 'Status changed inside Task form',
    //   action: 'clicked'
    // },
    // changeTaskTitle: {
    //   description: 'Status changed inside Task',
    //   action: 'clicked'
    // },
    // removeTask: {
    //   description: 'Remove Button clicked changed inside Task inside Task',
    //   action: 'clicked'
    // },

  },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {
  args: {
    taskId: '1',
    status: 0,
    title: 'HTML',
    todolistId: 'fgdosrg8rgjuh'
  }
  // changeTaskTC: action('Status changed inside Task'),
  // changeTaskTitle: action('Title changed inside Task'),
  // removeTaskTC: action('Remove Button clicked changed inside Task')
};

export const TaskIsDoneStory: Story = {
  args: {
    status: 2,
    title: 'Js',
  },
};

