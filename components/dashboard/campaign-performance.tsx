"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown } from "lucide-react"

export function CampaignPerformance() {
  const campaigns = [
    {
      name: "Summer Sale 2024",
      platform: "WhatsApp",
      sent: 1250,
      delivered: 1180,
      opened: 890,
      clicked: 234,
      status: "active",
      performance: 18.7,
      trend: "up",
    },
    {
      name: "Product Launch",
      platform: "Instagram",
      sent: 2100,
      delivered: 2050,
      opened: 1650,
      clicked: 445,
      status: "completed",
      performance: 21.2,
      trend: "up",
    },
    {
      name: "Newsletter Weekly",
      platform: "Email",
      sent: 890,
      delivered: 845,
      opened: 567,
      clicked: 89,
      status: "active",
      performance: 10.0,
      trend: "down",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {campaigns.map((campaign, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{campaign.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {campaign.platform} • {campaign.sent.toLocaleString()} sent
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={campaign.status === "active" ? "default" : "secondary"}>{campaign.status}</Badge>
                  <div className="flex items-center space-x-1">
                    {campaign.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm font-medium">{campaign.performance}%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Delivered</p>
                  <p className="font-medium">{((campaign.delivered / campaign.sent) * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Opened</p>
                  <p className="font-medium">{((campaign.opened / campaign.delivered) * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Clicked</p>
                  <p className="font-medium">{((campaign.clicked / campaign.opened) * 100).toFixed(1)}%</p>
                </div>
              </div>
              <Progress value={(campaign.clicked / campaign.sent) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
