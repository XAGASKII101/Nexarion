"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Eye, Edit, Trash2, MessageSquare, Instagram, Mail, Users, Send, TrendingUp } from "lucide-react"

const campaigns = [
  {
    id: 1,
    name: "Summer Sale 2024",
    description: "Promote summer collection with 30% discount",
    platform: "whatsapp",
    status: "active",
    sent: 1250,
    delivered: 1180,
    opened: 890,
    clicked: 234,
    budget: 500,
    spent: 320,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "New Product Launch",
    description: "Introduce our latest product line",
    platform: "instagram",
    status: "completed",
    sent: 2100,
    delivered: 2050,
    opened: 1650,
    clicked: 445,
    budget: 800,
    spent: 780,
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "Newsletter Weekly",
    description: "Weekly newsletter with tips and updates",
    platform: "email",
    status: "scheduled",
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    budget: 200,
    spent: 0,
    createdAt: "2024-01-20",
  },
]

const platformIcons = {
  whatsapp: MessageSquare,
  instagram: Instagram,
  email: Mail,
}

const platformColors = {
  whatsapp: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  instagram: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
  email: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
}

export default function CampaignsPage() {
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredCampaigns =
    selectedTab === "all" ? campaigns : campaigns.filter((campaign) => campaign.status === selectedTab)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campaigns</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage your marketing campaigns across all platforms.
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-6">
          <div className="grid gap-6">
            {filteredCampaigns.map((campaign) => {
              const PlatformIcon = platformIcons[campaign.platform as keyof typeof platformIcons]
              const deliveryRate = campaign.sent > 0 ? (campaign.delivered / campaign.sent) * 100 : 0
              const openRate = campaign.delivered > 0 ? (campaign.opened / campaign.delivered) * 100 : 0
              const clickRate = campaign.opened > 0 ? (campaign.clicked / campaign.opened) * 100 : 0
              const budgetUsed = campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0

              return (
                <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${platformColors[campaign.platform as keyof typeof platformColors]}`}
                        >
                          <PlatformIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{campaign.name}</CardTitle>
                          <CardDescription>{campaign.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={
                            campaign.status === "active"
                              ? "default"
                              : campaign.status === "completed"
                                ? "secondary"
                                : campaign.status === "scheduled"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {campaign.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Send className="w-4 h-4 text-blue-600 mr-1" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{campaign.sent.toLocaleString()}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Sent</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Users className="w-4 h-4 text-green-600 mr-1" />
                        </div>
                        <div className="text-2xl font-bold text-green-600">{deliveryRate.toFixed(1)}%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Delivered</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Eye className="w-4 h-4 text-purple-600 mr-1" />
                        </div>
                        <div className="text-2xl font-bold text-purple-600">{openRate.toFixed(1)}%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Opened</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <TrendingUp className="w-4 h-4 text-orange-600 mr-1" />
                        </div>
                        <div className="text-2xl font-bold text-orange-600">{clickRate.toFixed(1)}%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Clicked</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Budget Used</span>
                        <span>
                          ${campaign.spent} / ${campaign.budget}
                        </span>
                      </div>
                      <Progress value={budgetUsed} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
