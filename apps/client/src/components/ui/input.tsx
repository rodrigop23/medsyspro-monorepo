import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, useState } from "react";

const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [show, setShow] = useState(false);

    if (type === "password") {
      return (
        <div className="w-full relative">
          <input
            autoComplete="off"
            type={!show ? type : "text"}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
          <button
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            type="button"
          >
            {show ? (
              <EyeIcon className="stroke-slate-700/70" size={18} />
            ) : (
              <EyeOffIcon className="stroke-slate-700/70" size={18} />
            )}
          </button>
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
