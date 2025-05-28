import React from 'react';
import { cn } from '@/lib/utils';

type BaseNodeProps = React.HTMLAttributes<HTMLDivElement>;

export const BaseNode = React.forwardRef<HTMLDivElement, BaseNodeProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-md bg-white border border-gray-300 shadow-sm relative",
        className
      )}
      {...props}
    />
  ),
);

BaseNode.displayName = "BaseNode";