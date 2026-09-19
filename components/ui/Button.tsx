import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type ButtonVariant = "primary" | "outline" | "dark";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-green text-white hover:bg-green-dark hover:shadow-[0_12px_28px_-6px_rgba(31,106,76,0.5)]",
  outline: "border border-cream/40 text-cream hover:border-cream hover:bg-cream hover:text-forest",
  dark: "border border-forest/15 bg-white text-forest hover:border-forest/40",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: ButtonVariant };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props} />;
}

type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & { variant?: ButtonVariant };

export function LinkButton({ variant = "primary", className = "", ...props }: LinkButtonProps) {
  return <Link className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props} />;
}

type IconButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: "solid" | "outline" };

export function IconButton({ variant = "solid", className = "", ...props }: IconButtonProps) {
  const styles =
    variant === "solid"
      ? "bg-forest text-white hover:translate-x-0.5"
      : "border border-forest/20 text-forest hover:bg-forest hover:text-white";

  return (
    <button
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 disabled:pointer-events-none disabled:opacity-35 ${styles} ${className}`}
      {...props}
    />
  );
}
