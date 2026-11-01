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
    <nav className="flex items-center rounded-xl border border-slate-800 p-2 lg:h-full lg:flex-col lg:items-stretch lg:p-4">
      <h1 className="mb-8 hidden px-3 text-xl font-bold tracking-wider lg:block">
        RUNFORGE
      </h1>

      <span className="mb-3 hidden px-3 text-xs font-semibold text-slate-500 lg:block">
        WORKSPACE
      </span>

      <ul className="flex w-full items-center gap-1 lg:flex-col lg:items-stretch">
        {navItems.map((item) => (
          <li className="min-w-0 flex-1 lg:w-full lg:flex-none" key={item.title}>
            <MenuItem
              title={item.title}
              icon={item.icon}
              active={item.active}
            />
          </li>
        ))}

        <li className="min-w-0 flex-1 lg:mt-auto lg:w-full lg:flex-none">
          <MenuItem title="Settings" icon={Cog} iconAnimation />
        </li>
      </ul>
    </nav>
  );    
}
export default NavPanel;
