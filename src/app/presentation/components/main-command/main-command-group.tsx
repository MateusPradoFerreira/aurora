import { cn } from "../../../core/lib/utils";
import { ReactNode } from "react";

export type MainCommandGroupProps = {
  title: string;
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
}

export function MainCommandGroup({ className, contentClassName, title, children }: MainCommandGroupProps) {
  return (
    <div className={cn("", className)}>
      <span className="text-sm font-medium text-zinc-500 p-1">{title}</span>
      <div className={cn("mt-2", contentClassName)}>
        {children}
      </div>
    </div>
  );
}