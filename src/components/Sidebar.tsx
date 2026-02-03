import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GridIcon, StudiesIcon, PawIcon, GearIcon } from "@/components/NavIcons";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [organizationName, setOrganizationName] = useState("Institution Name");

  useEffect(() => {
    // Get organization name from localStorage (set by Settings page)
    const orgName = localStorage.getItem("organizationName") || "Institution Name";
    setOrganizationName(orgName);

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedName = localStorage.getItem("organizationName") || "Institution Name";
      setOrganizationName(updatedName);
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom event from same window
    window.addEventListener("organizationNameUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("organizationNameUpdated", handleStorageChange);
    };
  }, []);

  const navItems = [
    { path: "/", label: "Dashboard", icon: GridIcon },
    { path: "/studies", label: "Studies", icon: StudiesIcon },
    { path: "/participants", label: "Participants", icon: PawIcon },
    { path: "/settings", label: "Settings", icon: GearIcon },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className={cn(
      "h-screen bg-[#F8FFFC] border-r border-[#F0F0F0] flex flex-col transition-all duration-300",
      isCollapsed ? "w-[60px]" : "w-[201px]"
    )}>
      {/* Profile Card */}
      <div className="p-3 border-b-2 border-white">
        <div className={cn(
          "flex items-center gap-2 px-2 py-2",
          isCollapsed && "justify-center"
        )}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/Avatar.png" alt="Profile" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1">
              <div className="text-sm font-regular text-[#2E7054]">{organizationName}</div>
              <div className="text-[10px] text-[#7C7C7C]">John Smith</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        <div className="bg-[#EDFFF8] rounded-[2px] p-1 flex flex-col pl-[6px]" style={{ minHeight: 'calc(25% + 20px)', gap: '10px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "nav-item flex items-center gap-[6px] px-0.5 rounded-[2px] text-xs font-regular transition-all relative group flex-1 p-2",
                  isCollapsed && "justify-center",
                  active
                    ? "bg-[#DDFFF4] text-[#0D5C43] py-[7.5px]"
                    : "text-[#525252] py-[5px] hover:bg-[#F0F0F0] hover:text-[#222222] focus:bg-[#DDFFF4] focus:text-[#0D5C43] focus:py-[7.5px]"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={cn(
                  "h-[18px] w-[18px] transition-colors flex-shrink-0",
                  active
                    ? "text-[#0D5C43]"
                    : "text-[#7C7C7C] group-hover:text-[#222222]"
                )} />
                {!isCollapsed && (
                  <span className="flex-1 text-xs">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-3 border-t-2 border-white">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start text-xs font-regular hover:bg-[#F0F0F0] hover:text-[#222222]",
            isCollapsed && "justify-center px-0"
          )}
        >
          <LogOut className="h-4 w-4 mr-2 flex-shrink-0" />
          {!isCollapsed && "Logout"}
        </Button>
      </div>

      {/* Collapse Toggle */}
      <div className="p-3 border-t-2 border-white">
        <Button
          variant="ghost"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full justify-center p-2 hover:bg-[#F0F0F0]"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
