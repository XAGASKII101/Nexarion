"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Bot, MessageSquare, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      title: "Create Campaign",
      description: "Launch a new marketing campaign",
      icon: Plus,
      action: () => router.push("/campaigns"),
    },
    {
      title: "New Automation",
      description: "Set up automated workflows",
      icon: Bot,
      action: () => router.push("/automations"),
    },
    {
      title: "Send Message",
      description: "Send instant messages",
      icon: MessageSquare,
      action: () => router.push("/campaigns"),
    },
    {
      title: "View Analytics",
      description: "Check performance metrics",
      icon: BarChart3,
      action: () => router.push("/analytics"),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start h-auto p-4 bg-transparent"
            onClick={action.action}
          >
            <action.icon className="h-4 w-4 mr-3" />
            <div className="text-left">
              <div className="font-medium">{action.title}</div>
              <div className="text-sm text-muted-foreground">{action.description}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
