import { AnchorHTMLAttributes } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export default function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center gap-2 text-[13px] font-semibold rounded-full px-5 py-2.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  const variants = {
    primary:
      "bg-[var(--fg)] text-[var(--bg)] hover:opacity-85 active:scale-[0.98]",
    secondary:
      "bg-transparent border border-[var(--border-strong)] text-[var(--fg)] hover:border-[var(--fg)] active:scale-[0.98]",
  };

  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
