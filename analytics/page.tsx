"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, MessageSquare, Instagram, Mail, Eye, MousePointer } from "lucide-react"

const monthlyData = [
  { month: "Jan", messages: 1200, responses: 480, conversions: 96 },
  { month: "Feb", messages: 1800, responses: 720, conversions: 144 },
  { month: "Mar", messages: 2200, responses: 880, conversions: 176 },
  { month: "Apr", messages: 1900, responses: 760, conversions: 152 },
  { month: "May", messages: 2800, responses: 1120, conversions: 224 },
  { month: "Jun", messages: 3200, responses: 1280, conversions: 256 },
]

const platformData = [
  { name: "WhatsApp", value: 45, color: "#25D366" },
  { name: "Instagram", value: 30, color: "#E4405F" },
  { name: "Email", value: 25, color: "#0084FF" },
]

const campaignPerformance = [
  {
    name: "Summer Sale 2024",
    platform: "whatsapp",
    sent: 1250,
    delivered: 1180,
    opened: 890,
    clicked: 234,
    conversions: 47,
    revenue: 2350,
  },
  {
    name: "New Product Launch",
    platform: "instagram",
    sent: 2100,
    delivered: 2050,
    opened: 1650,
    clicked: 445,
    conversions: 89,
    revenue: 4450,
  },
  {
    name: "Newsletter Weekly",
    platform: "email",
    sent: 3200,
    delivered: 3100,
    opened: 1860,
    clicked: 372,
    conversions: 74,
    revenue: 1480,
  },
]

const platformIcons = {
  whatsapp: MessageSquare,
  instagram: Instagram,
  email: Mail,
}

export default function AnalyticsPage() {
  const totalMessages = monthlyData.reduce((sum, item) => sum + item.messages, 0)
  const totalResponses = monthlyData.reduce((sum, item) => sum + item.responses, 0)
  const totalConversions = monthlyData.reduce((sum, item) => sum + item.conversions, 0)
  const responseRate = ((totalResponses / totalMessages) * 100).toFixed(1)
  const conversionRate = ((totalConversions / totalResponses) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your campaign performance and engagement metrics across all platforms.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{responseRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="w-3 h-3 mr-1 text-red-600" />
              -0.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,280</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +18.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Message Performance</CardTitle>
                <CardDescription>Monthly message volume and engagement rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="messages" fill="#3b82f6" />
                    <Bar dataKey="responses" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Message distribution across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Trends</CardTitle>
              <CardDescription>Track conversion rates over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="conversions" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Detailed performance metrics for each campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {campaignPerformance.map((campaign, index) => {
                  const PlatformIcon = platformIcons[campaign.platform as keyof typeof platformIcons]
                  const deliveryRate = (campaign.delivered / campaign.sent) * 100
                  const openRate = (campaign.opened / campaign.delivered) * 100
                  const clickRate = (campaign.clicked / campaign.opened) * 100
                  const conversionRate = (campaign.conversions / campaign.clicked) * 100

                  return (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                            <PlatformIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{campaign.name}</h3>
                            <Badge variant="outline" className="mt-1">
                              {campaign.platform}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">${campaign.revenue.toLocaleString()}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Revenue</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-xl font-bold">{campaign.sent.toLocaleString()}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Sent</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold">{deliveryRate.toFixed(1)}%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Delivered</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold">{openRate.toFixed(1)}%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Opened</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold">{clickRate.toFixed(1)}%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Clicked</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Conversion Rate</span>
                          <span>{conversionRate.toFixed(1)}%</span>
                        </div>
                        <Progress value={conversionRate} className="h-2" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            {platformData.map((platform, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }} />
                    <span>{platform.name}</span>
                  </CardTitle>
                  <CardDescription>Platform-specific performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold" style={{ color: platform.color }}>
                        {platform.value}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">of total messages</div>
                    </div>
                    <Progress value={platform.value} className="h-2" />
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold">
                          {Math.round((totalMessages * platform.value) / 100).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Messages</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">
                          {Math.round((totalResponses * platform.value) / 100).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Responses</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
