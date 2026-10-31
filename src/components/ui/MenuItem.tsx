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
        <a className={`flex group items-center gap-3 rounded-lg px-3 py-3 ${style}`}>
            <Icon size={18} className={`transition ${iconAnimation ? "group-hover:animate-spin" : ""}`}/>
            {title}
        </a>
    );
}
export default MenuItem;