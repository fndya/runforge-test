import type { LucideIcon } from "lucide-react";

interface MenuItemProps {
  title: string;
  active?: boolean;
  icon: LucideIcon;
  iconAnimation?: boolean;
}

function MenuItem({
  title,
  active,
  icon: Icon,
  iconAnimation = false,
}: MenuItemProps) {
  return (
    <a
      className={`
        group flex min-w-0 flex-col items-center justify-center
        gap-1 rounded-lg px-1 py-2 text-[10px]
        transition
        lg:flex-row lg:justify-start lg:gap-3
        lg:px-3 lg:py-3 lg:text-sm
        ${
          active
            ? "bg-slate-800 text-white"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }
      `}
    >
      <Icon
        size={18}
        className={`shrink-0 transition ${
          iconAnimation ? "group-hover:animate-spin" : ""
        }`}
      />

      <span className="truncate">{title}</span>
    </a>
  );
}

export default MenuItem;