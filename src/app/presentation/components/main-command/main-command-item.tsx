import { cn } from "../../../core/lib/utils";
import { ReactNode } from "react";

export type MainCommandItemProps = {
  className?: string;
  children?: ReactNode;
  command?: () => void;
}

export function MainCommandItem({ command = () => {}, className, children }: MainCommandItemProps) {
  return (
    <div className={cn("hover:bg-zinc-100 py-1 px-3 rounded-lg cursor-pointer", className)} onClick={command}>
      {children}
    </div>
  )
}

