import * as React from "react";
import { cn } from "@/lib/utils";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm";
};
export const Button = React.forwardRef<HTMLButtonElement, Props>(
  function Button(
    { className, variant = "default", size = "default", ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          "ui-button",
          `ui-button-${variant}`,
          size === "sm" && "ui-button-sm",
          className,
        )}
        {...props}
      />
    );
  },
);
