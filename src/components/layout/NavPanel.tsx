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
        <nav className="flex row-start-2 items-center rounded-xl border border-slate-800 p-4 lg:flex-col lg:row-start-1">
          <h1 className="px-3 hidden text-xl font-bold tracking-wider lg:block lg:mb-8">
            RUNFORGE
          </h1>

          <span className="mb-3 px-3 hidden text-xs font-semibold text-slate-500 lg:block">
            WORKSPACE
          </span>

          <ul className="flex justify-between w-full lg:flex-col gap-1">
            {navItems.map((item) => (
               <li className="w-30 lg:w-full" key={item.title}>
                    <MenuItem
                        title={item.title}
                        icon={item.icon}
                        active={item.active}
                    />        
               </li> 
            ))}
            
            <li>
              <div className="w-30 mt-auto lg:pt-6 lg:w-full">
                <MenuItem title='Settings' icon={Cog} iconAnimation={true}/>
              </div>
            </li>
          </ul>

        </nav>
    );
}
export default NavPanel;
