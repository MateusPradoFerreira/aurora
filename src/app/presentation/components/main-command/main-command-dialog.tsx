import { DialogProps } from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

export type MainCommandDialogProps = {
  children?: ReactNode,
} & DialogProps;

export function MainCommandDialog({ children, ...props }: MainCommandDialogProps) {
  return (
    <Dialog { ...props }>
      <DialogContent className="translate-y-0 top-0 mt-4 w-full max-w-[956px] p-2">
        <DialogTitle className="hidden" />
        {children}
      </DialogContent>
    </Dialog>
  );
}