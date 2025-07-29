import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";

export function ConnectedPlatforms() {
  const { data: integrations, isLoading } = useQuery({
    queryKey: ["/api/integrations"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connected Platforms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg border">
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const platformConfigs = {
    whatsapp: {
      name: "WhatsApp Business",
      icon: FaWhatsapp,
      bgColor: "bg-green-50 dark:bg-green-900/10",
      borderColor: "border-green-200 dark:border-green-800",
      iconColor: "text-white",
      iconBg: "bg-green-500",
      statusColor: "text-green-600 dark:text-green-400",
      dotColor: "bg-green-500",
    },
    instagram: {
      name: "Instagram Business",
      icon: FaInstagram,
      bgColor: "bg-purple-50 dark:bg-purple-900/10",
      borderColor: "border-purple-200 dark:border-purple-800",
      iconColor: "text-white",
      iconBg: "bg-gradient-to-r from-purple-500 to-pink-500",
      statusColor: "text-purple-600 dark:text-purple-400",
      dotColor: "bg-purple-500",
    },
    email: {
      name: "Email (SendGrid)",
      icon: FaEnvelope,
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
      borderColor: "border-blue-200 dark:border-blue-800",
      iconColor: "text-white",
      iconBg: "bg-blue-500",
      statusColor: "text-blue-600 dark:text-blue-400",
      dotColor: "bg-blue-500",
    },
  };

  const connectedPlatforms = (integrations as any)?.filter((integration: any) => integration.isActive) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Platforms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(platformConfigs).map(([platform, config]) => {
          const isConnected = connectedPlatforms.some((integration: any) => integration.platform === platform);
          
          if (isConnected) {
            const integration = connectedPlatforms.find((integration: any) => integration.platform === platform);
            return (
              <div
                key={platform}
                className={`flex items-center justify-between p-4 ${config.bgColor} rounded-lg border ${config.borderColor}`}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 ${config.iconBg} rounded-lg flex items-center justify-center`}>
                    <config.icon className={`text-lg ${config.iconColor}`} />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-foreground">{config.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Connected • {Math.floor(Math.random() * 5000)} contacts
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`w-2 h-2 ${config.dotColor} rounded-full mr-2`}></span>
                  <Badge variant="secondary" className={config.statusColor}>
                    Active
                  </Badge>
                </div>
              </div>
            );
          }
          
          return null;
        })}

        {connectedPlatforms.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No platforms connected yet</p>
          </div>
        )}

        <Button
          variant="outline"
          className="w-full py-2 px-4 border-2 border-dashed border-muted-foreground/25 hover:border-primary hover:text-primary transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Connect New Platform
        </Button>
      </CardContent>
    </Card>
  );
}
