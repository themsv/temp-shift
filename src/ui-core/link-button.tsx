import { createLink, type LinkComponent } from '@tanstack/react-router';
import { Button, type ButtonProps } from '@mantine/core';

const MantineButtonComponent = ({ ...props }: ButtonProps) => {
  return <Button {...props} />;
};

const CreatedButtonLink = createLink(MantineButtonComponent);

export const CustomButtonLink: LinkComponent<typeof MantineButtonComponent> = (props) => {
  return <CreatedButtonLink preload="intent" {...props} />;
};
