import { forwardRef } from "react";
import { Handle, HandleProps } from "@xyflow/react";
import { cn } from "@/lib/utils";

export const BaseHandle = forwardRef<HTMLDivElement, HandleProps>(
  ({ className, children, style, ...props }, ref) => (
    <Handle
      ref={ref}
      {...props}
      style={style}
      className={cn(
        "h-[11px] w-[11px] rounded-full border border-slate-300 bg-slate-100 transition dark:border-secondary dark:bg-secondary",
        className,
      )}
    >
      {children}
    </Handle>
  ),
);

BaseHandle.displayName = "BaseHandle";
