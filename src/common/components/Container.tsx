import clsx from 'clsx';
import { ReactNode } from 'react';

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 lg:px-6', className)}
      {...props}
    />
  );
}
