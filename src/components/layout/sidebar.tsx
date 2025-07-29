import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  BarChart3,
  Bot,
  BellRing,
  CreditCard,
  Link as LinkIcon,
  PieChart,
  Users,
  Zap,
  Shield,
  LogOut,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Automations", href: "/automations", icon: Bot },
  { name: "Campaigns", href: "/campaigns", icon: BellRing },
  { name: "Integrations", href: "/integrations", icon: LinkIcon },
  { name: "Affiliates", href: "/affiliates", icon: Users },
  { name: "Analytics", href: "/analytics", icon: PieChart },
  { name: "Billing", href: "/billing", icon: CreditCard },
];

const adminNavigation = [
  { name: "Admin", href: "/admin", icon: Shield },
];

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps = {}) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const navigationItems = user?.role === "admin" 
    ? [...navigation, ...adminNavigation] 
    : navigation;

  const handleNavigate = () => {
    onNavigate?.();
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className={cn("hidden md:flex md:w-64 md:flex-col h-full bg-card", className)}>
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-card border-r border-border">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="flex items-center">
            <div className="w-8 h-8 nexarion-gradient rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-foreground">
              Nexarion AI
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex-1">
          <div className="px-2 space-y-1">
            {navigationItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive
                        ? "nexarion-gradient text-white"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    onClick={handleNavigate}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Section */}
          <div className="mt-auto px-2 pb-4 space-y-2">
            <div className="flex items-center px-2 py-2">
              <div className="w-8 h-8 nexarion-gradient-secondary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">
                  {user?.username}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.plan} Plan
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
