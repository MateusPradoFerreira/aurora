import { cn } from "../../core/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const tagChipVariants = cva(
  "py-1 px-3 rounded-lg cursor-pointer text-sm w-fit capitalize font-medium transition-all",
  {
    variants: {
      variant: {
        default: "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80",
        metatag: "bg-indigo-100 text-indigo-600 hover:bg-indigo-200/80",
        general: "bg-blue-100 text-blue-600 hover:bg-blue-200/80",
        artist: "bg-red-100 text-red-600 hover:bg-red-200/80",
        copyright: "bg-violet-100 text-violet-600 hover:bg-violet-200/80",
        character: "bg-emerald-100 text-emerald-600 hover:bg-emerald-200/80",
        meta: "bg-orange-100 text-orange-600 hover:bg-orange-200/80",
        0: "bg-blue-100 text-blue-600 hover:bg-blue-200/80",
        1: "bg-red-100 text-red-600 hover:bg-red-200/80",
        3: "bg-violet-100 text-violet-600 hover:bg-violet-200/80",
        4: "bg-emerald-100 text-emerald-600 hover:bg-emerald-200/80",
        5: "bg-orange-100 text-orange-600 hover:bg-orange-200/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type TagChip = {
  className?: string;
  children?: ReactNode;
  command?: () => void;
} & VariantProps<typeof tagChipVariants>

export function TagChip({ command = () => {}, className, children, variant }: TagChip) {
  return (
    <div className={cn(tagChipVariants({ variant, className }))} onClick={command}>
      {children}
    </div>
  )
}