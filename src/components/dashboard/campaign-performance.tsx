import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BellRing, Gift, Heart } from "lucide-react";

export function CampaignPerformance() {
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["/api/campaigns"],
  });

  if (isLoading) {
    return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Top Campaigns</CardTitle>
            <Skeleton className="h-4 w-16" />
          </div>
        </CardHeader>
        <CardContent>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 mb-3">
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Mock campaign data with performance metrics
  const mockCampaigns = [
    {
      id: 1,
      name: "Welcome Sequence",
      stats: "847 sent • 68% open rate",
      conversions: "23 conversions",
      ctr: "2.7% CTR",
      icon: BellRing,
      gradient: "from-primary to-purple-600",
    },
    {
      id: 2,
      name: "Product Launch",
      stats: "1,234 sent • 72% open rate",
      conversions: "41 conversions",
      ctr: "3.3% CTR",
      icon: Gift,
      gradient: "from-accent to-primary",
    },
    {
      id: 3,
      name: "Re-engagement",
      stats: "432 sent • 45% open rate",
      conversions: "12 conversions",
      ctr: "2.8% CTR",
      icon: Heart,
      gradient: "from-purple-600 to-pink-500",
    },
  ];

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle>Top Campaigns</CardTitle>
          <Button variant="link" className="p-0 h-auto text-primary">
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {mockCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 bg-gradient-to-r ${campaign.gradient} rounded-lg flex items-center justify-center`}>
                  <campaign.icon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-foreground">{campaign.name}</p>
                  <p className="text-sm text-muted-foreground">{campaign.stats}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-accent">
                  {campaign.conversions}
                </p>
                <p className="text-xs text-muted-foreground">{campaign.ctr}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
