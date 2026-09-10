import { AnchorHTMLAttributes } from "react";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export default function ExternalLink({ href, children, ariaLabel, ...rest }: ExternalLinkProps) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </a>
  );
}
