import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Send, 
  Eye, 
  MousePointer, 
  MessageSquare,
  Target
} from "lucide-react";

export default function Analytics() {
  const { data: dashboardStats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: campaigns, isLoading: campaignsLoading } = useQuery({
    queryKey: ["/api/campaigns"],
  });

  // Mock analytics data - in a real app this would come from dedicated analytics endpoints
  const performanceMetrics = [
    {
      title: "Messages Sent",
      value: (dashboardStats as any)?.messagesSent || 0,
      icon: Send,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Open Rate",
      value: `${(dashboardStats as any)?.responseRate || 0}%`,
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/10",
      change: "+5.2%",
      changeType: "positive",
    },
    {
      title: "Click Rate",
      value: "3.4%",
      icon: MousePointer,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/10",
      change: "+1.8%",
      changeType: "positive",
    },
    {
      title: "Conversions",
      value: "47",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/10",
      change: "+23%",
      changeType: "positive",
    },
  ];

  const platformData = [
    {
      platform: "WhatsApp",
      sent: 1247,
      delivered: 1198,
      read: 1056,
      responded: 89,
      icon: "🟢",
    },
    {
      platform: "Instagram",
      sent: 890,
      delivered: 856,
      read: 723,
      responded: 67,
      icon: "🟣",
    },
    {
      platform: "Email",
      sent: 2103,
      delivered: 2087,
      read: 1456,
      responded: 134,
      icon: "📧",
    },
  ];

  if (statsLoading || campaignsLoading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <Header title="Analytics" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-24" />
                ))}
              </div>
              <Skeleton className="h-96" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-hidden">
        <Header title="Analytics" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in-up">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
                <p className="text-muted-foreground">
                  Track your campaign performance and engagement metrics
                </p>
              </div>
              <Select defaultValue="30d">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {performanceMetrics.map((metric, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                        <metric.icon className={`h-6 w-6 ${metric.color}`} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          {metric.title}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {metric.value}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="text-accent font-medium">{metric.change}</span>
                      <span className="text-muted-foreground ml-1">vs last period</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="platforms">Platforms</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Chart placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Message Performance Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Interactive charts would be displayed here
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Showing message volume, engagement rates, and conversion trends
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Top Performing Content */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { content: "Welcome to our community! 🎉", responses: 89, rate: "12.4%" },
                          { content: "Don't miss our limited offer", responses: 67, rate: "9.8%" },
                          { content: "Your free guide is ready", responses: 54, rate: "8.2%" },
                        ].map((message, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium text-sm truncate">{message.content}</p>
                              <p className="text-xs text-muted-foreground">{message.responses} responses</p>
                            </div>
                            <Badge variant="secondary">{message.rate}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Engagement Funnel */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Engagement Funnel</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { stage: "Messages Sent", count: 4240, percentage: 100 },
                          { stage: "Delivered", count: 4141, percentage: 97.7 },
                          { stage: "Opened", count: 2879, percentage: 67.9 },
                          { stage: "Clicked", count: 289, percentage: 6.8 },
                          { stage: "Converted", count: 47, percentage: 1.1 },
                        ].map((stage, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm font-medium">{stage.stage}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">{stage.count}</span>
                              <Badge variant="outline">{stage.percentage}%</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="campaigns" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!campaigns || (campaigns as any)?.length === 0 ? (
                      <div className="text-center py-8">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          No Campaign Data
                        </h3>
                        <p className="text-muted-foreground">
                          Create and run campaigns to see detailed analytics here
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {(campaigns as any)?.slice(0, 5).map((campaign: any) => (
                          <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 nexarion-gradient rounded-lg flex items-center justify-center">
                                <BarChart3 className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <p className="font-medium">{campaign.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {campaign.platform} • {campaign.status}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-6 text-center">
                              <div>
                                <p className="text-sm font-medium">0</p>
                                <p className="text-xs text-muted-foreground">Sent</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">0%</p>
                                <p className="text-xs text-muted-foreground">Open</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">0%</p>
                                <p className="text-xs text-muted-foreground">Click</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">0</p>
                                <p className="text-xs text-muted-foreground">Convert</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="platforms" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {platformData.map((platform, index) => (
                        <div key={index} className="p-6 border rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{platform.icon}</span>
                              <h3 className="font-semibold text-lg">{platform.platform}</h3>
                            </div>
                            <Badge variant="secondary">
                              {((platform.responded / platform.sent) * 100).toFixed(1)}% response rate
                            </Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-4">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-foreground">{platform.sent}</p>
                              <p className="text-sm text-muted-foreground">Sent</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-accent">{platform.delivered}</p>
                              <p className="text-sm text-muted-foreground">Delivered</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-blue-600">{platform.read}</p>
                              <p className="text-sm text-muted-foreground">Read</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-purple-600">{platform.responded}</p>
                              <p className="text-sm text-muted-foreground">Responded</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audience" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Audience Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                        <div className="text-center">
                          <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Audience growth chart</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Audience Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Contacts</span>
                        <span className="font-bold">9,713</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Active Users</span>
                        <span className="font-bold text-accent">7,241</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">New This Month</span>
                        <span className="font-bold text-blue-600">+847</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Engagement Rate</span>
                        <Badge variant="secondary">74.5%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
