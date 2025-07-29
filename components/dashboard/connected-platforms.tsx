"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Instagram, Mail, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function ConnectedPlatforms() {
  const router = useRouter()

  const platforms = [
    {
      name: "WhatsApp Business",
      icon: MessageSquare,
      status: "connected",
      lastSync: "2 minutes ago",
      color: "text-green-600",
    },
    {
      name: "Instagram Business",
      icon: Instagram,
      status: "connected",
      lastSync: "5 minutes ago",
      color: "text-pink-600",
    },
    {
      name: "Email Marketing",
      icon: Mail,
      status: "disconnected",
      lastSync: "Never",
      color: "text-blue-600",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Connected Platforms</CardTitle>
        <Button variant="outline" size="sm" onClick={() => router.push("/integrations")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Platform
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {platforms.map((platform, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <platform.icon className={`w-5 h-5 ${platform.color}`} />
                <div>
                  <p className="text-sm font-medium">{platform.name}</p>
                  <p className="text-xs text-muted-foreground">Last sync: {platform.lastSync}</p>
                </div>
              </div>
              <Badge variant={platform.status === "connected" ? "default" : "secondary"}>{platform.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
