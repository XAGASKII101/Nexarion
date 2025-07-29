import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Link as LinkIcon, Share } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      title: "Create Campaign",
      description: "Start new automation",
      icon: Plus,
      bgColor: "hover:border-primary hover:bg-primary/5",
      iconBg: "bg-primary/10 group-hover:bg-primary/20",
      iconColor: "text-primary",
    },
    {
      title: "Connect Platform",
      description: "Add WhatsApp, IG, Email",
      icon: LinkIcon,
      bgColor: "hover:border-accent hover:bg-accent/5",
      iconBg: "bg-accent/10 group-hover:bg-accent/20",
      iconColor: "text-accent",
    },
    {
      title: "Share Referral",
      description: "Earn 20% commission",
      icon: Share,
      bgColor: "hover:border-purple-500 hover:bg-purple-500/5",
      iconBg: "bg-purple-100 dark:bg-purple-900/20 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`flex items-center p-4 h-auto border-2 border-dashed transition-colors group ${action.bgColor}`}
            >
              <div className={`w-10 h-10 ${action.iconBg} rounded-lg flex items-center justify-center mr-3 transition-colors`}>
                <action.icon className={`h-5 w-5 ${action.iconColor}`} />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">{action.title}</p>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
