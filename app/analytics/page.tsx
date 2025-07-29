"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, MessageSquare, Eye, MousePointerClickIcon as Click } from "lucide-react"
import { Header } from "@/components/layout/header"

export default function AnalyticsPage() {
  const overviewStats = [
    {
      title: "Total Messages",
      value: "12,543",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: MessageSquare,
    },
    {
      title: "Delivery Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: "Open Rate",
      value: "68.7%",
      change: "-1.2%",
      changeType: "negative" as const,
      icon: Eye,
    },
    {
      title: "Click Rate",
      value: "23.4%",
      change: "+5.3%",
      changeType: "positive" as const,
      icon: Click,
    },
  ]

  const platformPerformance = [
    {
      platform: "WhatsApp",
      messages: 5420,
      delivered: 5102,
      opened: 3876,
      clicked: 1240,
      color: "bg-green-500",
    },
    {
      platform: "Instagram",
      messages: 4230,
      delivered: 3987,
      opened: 2890,
      clicked: 890,
      color: "bg-pink-500",
    },
    {
      platform: "Email",
      messages: 2893,
      delivered: 2734,
      opened: 1876,
      clicked: 567,
      color: "bg-blue-500",
    },
  ]

  const topCampaigns = [
    {
      name: "Summer Sale 2024",
      platform: "WhatsApp",
      sent: 1250,
      opened: 890,
      clicked: 234,
      conversion: 18.7,
    },
    {
      name: "Product Launch",
      platform: "Instagram",
      sent: 2100,
      opened: 1650,
      clicked: 445,
      conversion: 21.2,
    },
    {
      name: "Newsletter Weekly",
      platform: "Email",
      sent: 890,
      opened: 567,
      clicked: 89,
      conversion: 10.0,
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Analytics" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
              <p className="text-muted-foreground">Track your campaign performance and engagement metrics.</p>
            </div>

            {/* Overview Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {overviewStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                        {stat.change}
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="platforms">Platforms</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Performance</CardTitle>
                      <CardDescription>Message delivery and engagement by platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {platformPerformance.map((platform, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                                <span className="font-medium">{platform.platform}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {platform.messages.toLocaleString()} sent
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Delivered</p>
                                <p className="font-medium">
                                  {((platform.delivered / platform.messages) * 100).toFixed(1)}%
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Opened</p>
                                <p className="font-medium">
                                  {((platform.opened / platform.delivered) * 100).toFixed(1)}%
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Clicked</p>
                                <p className="font-medium">
                                  {((platform.clicked / platform.opened) * 100).toFixed(1)}%
                                </p>
                              </div>
                            </div>
                            <Progress value={(platform.clicked / platform.messages) * 100} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Campaigns</CardTitle>
                      <CardDescription>Your best campaigns by conversion rate</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topCampaigns.map((campaign, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{campaign.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {campaign.platform} • {campaign.sent.toLocaleString()} sent
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline">{campaign.conversion}% conversion</Badge>
                              <p className="text-sm text-muted-foreground mt-1">{campaign.clicked} clicks</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="campaigns" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Analytics</CardTitle>
                    <CardDescription>Detailed performance metrics for all campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Campaign analytics coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="platforms" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Comparison</CardTitle>
                    <CardDescription>Compare performance across different platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Platform comparison coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audience" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Audience Insights</CardTitle>
                    <CardDescription>Understand your audience demographics and behavior</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Audience insights coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
