import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FallbackOnly: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>WB</AvatarFallback>
    </Avatar>
  )
};

export const ImageAvatar: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/100?img=7" alt="Profile" />
      <AvatarFallback>WB</AvatarFallback>
    </Avatar>
  )
};

export const LargeAvatar: Story = {
  render: () => (
    <Avatar className="size-16">
      <AvatarFallback className="text-lg">RE</AvatarFallback>
    </Avatar>
  )
};
