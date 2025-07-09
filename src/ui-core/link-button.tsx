import { forwardRef } from 'react';
import { createLink, type LinkComponent } from '@tanstack/react-router';
import { Button, type ButtonProps } from '@mantine/core';

interface MantineButtonLinkProps extends Omit<ButtonProps, 'component'> {
  // You can extend this to include additional props if needed
}

const MantineButtonComponent = forwardRef<HTMLButtonElement, MantineButtonLinkProps>(
  (props, ref) => {
    return <Button ref={ref} {...props} />;
  },
);

const CreatedButtonLink = createLink(MantineButtonComponent);

export const CustomButtonLink: LinkComponent<typeof MantineButtonComponent> = (props) => {
  return <CreatedButtonLink preload="intent" {...props} />;
};
