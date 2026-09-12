import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./Button.module.css";

type Common = {
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  children: React.ReactNode;
};

type AsLink = Common & { href: string; onClick?: never; type?: never; disabled?: never };
type AsButton = Common & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

/** Single button primitive — link or button, same premium visual treatment. */
export function Button(props: AsLink | AsButton) {
  const { variant = "primary", className, children } = props;
  const cls = cn(styles.btn, styles[variant], className);

  if ("href" in props && props.href) {
    const external = props.href.startsWith("http") || props.href.startsWith("mailto:") || props.href.startsWith("tel:");
    return (
      <Link
        href={props.href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type || "button"}
      className={cls}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
}
