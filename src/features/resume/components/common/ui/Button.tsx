"use client";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        outline: "border border-gray-300 text-gray-800 bg-white hover:bg-gray-50",
        ghost: "text-gray-600 hover:text-black",
        danger: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        default: "h-[60px] px-6 text-base",
        sm: "h-[40px] px-4 text-sm",
        lg: "h-[70px] px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
