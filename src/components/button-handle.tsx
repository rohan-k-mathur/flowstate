import { HandleProps, Position } from "@xyflow/react";
import { BaseHandle } from "@/components/base-handle";
import { cn } from "@/lib/utils";

const wrapperClassNames: Record<Position, string> = {
  [Position.Top]: "flex-col-reverse left-1/2 -translate-y-full -translate-x-1/2",
  [Position.Bottom]: "flex-col left-1/2 translate-y-[10px] -translate-x-1/2",
  [Position.Left]: "flex-row-reverse top-1/2 -translate-x-full -translate-y-1/2",
  [Position.Right]: "top-1/2 -translate-y-1/2 translate-x-[10px]",
};

export const ButtonHandle = ({
  showButton = true,
  position = Position.Bottom,
  x = 0,
  y = 0,
  children,
  style,
  ...props
}: HandleProps & { showButton?: boolean; x?: number; y?: number }) => {
  const wrapperClassName = wrapperClassNames[position || Position.Bottom];
  const vertical = position === Position.Top || position === Position.Bottom;

  return (
    <BaseHandle
      position={position}
      id={props.id}
      style={{
        left: x,
        top: y,
        transform: 'none',
        position: 'absolute', // explicitly absolute
        ...style,
      }}
      {...props}
    >
      {showButton && (
        <div className={cn("absolute flex items-center pointer-events-none", wrapperClassName)}>
          <div
            className={cn("bg-gray-300", vertical ? "h-10 w-[1px]" : "h-[1px] w-10")}
          />
          <div className="nodrag nopan pointer-events-auto">
            {children}
          </div>
        </div>
      )}
    </BaseHandle>
  );
};
