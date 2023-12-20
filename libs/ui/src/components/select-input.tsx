import { CaretUpDown } from "@phosphor-icons/react";
import { Input } from "./input";
import { forwardRef } from "react";
import { cn } from "@reactive-resume/utils";

export interface SelectInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}
export const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(({ className, children, ...props }, ref) => (
  <div className="relative flex items-center">
    <span className="absolute text-gray-500 transform -translate-y-1/2 left-2 top-1/2">
     {children}
    </span>
    <Input
      ref={ref}
      className={cn("py-2 pl-9 pr-10 shadow-sm focus:outline-none", className)}
      {...props}
    />
    <div className="absolute opacity-50 right-3">
      <CaretUpDown className="w-4 h-4" />
    </div>
  </div>
));
