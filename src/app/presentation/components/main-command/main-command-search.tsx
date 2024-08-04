import { BiSearch } from "react-icons/bi";
import { Button, ButtonProps } from "../ui/button";
import { Input, InputProps } from "../ui/input";
import { cn } from "../../../core/lib/utils";
import { ForwardedRef } from "react";

export type MainCommandSearchProps = {
  className?: string;
  inputProps?: InputProps;
  buttonProps?: ButtonProps;
  inputRef?: ForwardedRef<HTMLInputElement>,
};

export function MainCommandSearch({ className, inputProps, buttonProps, inputRef }: MainCommandSearchProps) {
  return (
    <div className={cn("flex", className)}>
      <Input
        placeholder="Search..."
        { ...inputProps }
        className={cn("w-full rounded-r-none rounded-l-lg pl-5 border-transparent bg-zinc-100", inputProps?.className)}
        ref={inputRef}
      />
      <Button variant="secondary" shape="square" round="circle" {...buttonProps} className={cn("rounded-l-none rounded-r-lg", buttonProps?.className)}>
        <BiSearch />
      </Button>
    </div>
  )
}