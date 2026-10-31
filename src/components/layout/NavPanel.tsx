import MenuItem from "../ui/MenuItem";
import { Box, Cog, DatabaseBackup, Eye, FolderGit2, Play } from 'lucide-react';
import type { LucideIcon } from "lucide-react";

interface NavItem {
  title: string;
  icon: LucideIcon;
  active?: boolean;
}

const navItems: NavItem[] = [
  { title: "Runs", icon: Play, active: true },
  { title: "Devboxes", icon: Box },
  { title: "Projects", icon: FolderGit2 },
  { title: "Previews", icon: Eye },
  { title: "Snapshots", icon: DatabaseBackup },
];
function NavPanel() {
    

    return (
        <nav className="flex flex-col rounded-xl border border-slate-800 p-4">
          <h1 className="mb-8 px-3 text-xl font-bold tracking-wider">
            RUNFORGE
          </h1>

          <span className="mb-3 px-3 text-xs font-semibold text-slate-500">
            WORKSPACE
          </span>

          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
               <li key={item.title}>
                    <MenuItem
                        title={item.title}
                        icon={item.icon}
                        active={item.active}
                    />        
               </li> 
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <MenuItem title='Settings' icon={Cog} iconAnimation={true}/>
          </div>
        </nav>
    );
}
export default NavPanel;
