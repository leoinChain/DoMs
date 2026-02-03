import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GridIcon, StudiesIcon, PawIcon, GearIcon } from "@/components/NavIcons";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: "Dashboard", icon: GridIcon },
    { path: "/studies", label: "Studies", icon: StudiesIcon },
    { path: "/participants", label: "Participants", icon: PawIcon },
    { path: "/settings", label: "Settings", icon: GearIcon },
  ];

  return (
    <div className="h-screen w-64 bg-[#EDFFF8] border-r border-sidebar-border p-4 flex flex-col">
      <div className="mb-8">
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 mb-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">A</span>
          </div>
          <span className="font-regular text-sidebar-foreground">ImYoo</span>
        </button>
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-regular transition-colors relative",
                isActive
                  ? "text-[#222222]"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8FF0CC] rounded-r" />
              )}
              <Icon className={cn("h-5 w-5", isActive ? "text-[#8FF0CC]" : "text-[#8FF0CC]")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 font-regular"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Collapse
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
