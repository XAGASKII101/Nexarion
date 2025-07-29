"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Instagram, Mail, Bot } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "campaign",
      title: "Summer Sale Campaign",
      description: "Sent to 1,250 contacts",
      platform: "whatsapp",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "automation",
      title: "Welcome Series",
      description: "Triggered 45 times",
      platform: "email",
      time: "4 hours ago",
      status: "active",
    },
    {
      id: 3,
      type: "campaign",
      title: "Product Launch",
      description: "Sent to 890 followers",
      platform: "instagram",
      time: "6 hours ago",
      status: "completed",
    },
    {
      id: 4,
      type: "automation",
      title: "Follow-up Sequence",
      description: "23 new responses",
      platform: "whatsapp",
      time: "8 hours ago",
      status: "active",
    },
  ]

  const platformIcons = {
    whatsapp: MessageSquare,
    instagram: Instagram,
    email: Mail,
  }

  const typeIcons = {
    campaign: MessageSquare,
    automation: Bot,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const PlatformIcon = platformIcons[activity.platform as keyof typeof platformIcons]
            const TypeIcon = typeIcons[activity.type as keyof typeof typeIcons]

            return (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TypeIcon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                    <PlatformIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <Badge variant={activity.status === "active" ? "default" : "secondary"}>{activity.status}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
