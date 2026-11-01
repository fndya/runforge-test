import type { LucideIcon } from "lucide-react";

interface MenuItemProps {
    title: string,
    active?: boolean,
    icon: LucideIcon,
    iconAnimation?: boolean;
}

function MenuItem({title, active, icon: Icon, iconAnimation = false,}: MenuItemProps) {
    let style: string;
    if(active){
       style = "bg-slate-800 px-3 py-3 text-white";
    } else {
        style = "text-slate-400 transition hover:bg-slate-800 hover:text-white";
    };

    return (
        <a
            className={`flex min-w-0 flex-col items-center gap-1 rounded-lg px-1 py-2 text-xs transition lg:flex-row lg:gap-3 lg:px-3 lg:py-3 lg:text-sm ${style}`}
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