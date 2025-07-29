import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, BellRing, BarChart3, Users, Send } from "lucide-react";

export default function Campaigns() {
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["/api/campaigns"],
  });

  if (isLoading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <Header title="Campaigns" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-24 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-accent text-accent-foreground";
      case "paused":
        return "bg-yellow-500 text-white";
      case "completed":
        return "bg-blue-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "whatsapp":
        return "🟢";
      case "instagram":
        return "🟣";
      case "email":
        return "📧";
      default:
        return "📱";
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-hidden">
        <Header title="Campaigns" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in-up">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Marketing Campaigns</h2>
                <p className="text-muted-foreground">
                  Create, manage, and track your marketing campaigns
                </p>
              </div>
              <Button className="nexarion-gradient text-white button-glow">
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </div>

            {/* Campaigns Grid */}
            {!campaigns || (campaigns as any)?.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <BellRing className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No Campaigns Yet
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Start reaching your audience by creating your first marketing campaign. 
                    Send targeted messages across WhatsApp, Instagram, and Email.
                  </p>
                  <Button className="nexarion-gradient text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Campaign
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {(campaigns as any)?.map((campaign: any) => (
                  <Card key={campaign.id} className="card-hover">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 nexarion-gradient rounded-lg flex items-center justify-center">
                            <BellRing className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg flex items-center">
                              {campaign.name}
                              <span className="ml-2 text-lg">
                                {getPlatformIcon(campaign.platform)}
                              </span>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {campaign.description || "No description"}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Send className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">0</p>
                            <p className="text-xs text-muted-foreground">Sent</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">0%</p>
                            <p className="text-xs text-muted-foreground">Open Rate</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">0</p>
                            <p className="text-xs text-muted-foreground">Responses</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">0</p>
                            <p className="text-xs text-muted-foreground">Conversions</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          Created {new Date(campaign.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Duplicate
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
