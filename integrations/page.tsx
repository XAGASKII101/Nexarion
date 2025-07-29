"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { MessageSquare, Instagram, Mail, Settings, Plus, CheckCircle, AlertCircle } from "lucide-react"

const integrations = [
  {
    id: 1,
    name: "WhatsApp Business",
    description: "Send automated messages and manage conversations",
    platform: "whatsapp",
    status: "connected",
    isActive: true,
    lastSync: "2 minutes ago",
    features: ["Automated Messages", "Chatbots", "Contact Management", "Analytics"],
  },
  {
    id: 2,
    name: "Instagram Business",
    description: "Automate DMs and story responses",
    platform: "instagram",
    status: "connected",
    isActive: true,
    lastSync: "5 minutes ago",
    features: ["Direct Messages", "Story Replies", "Comment Automation", "Follower Insights"],
  },
  {
    id: 3,
    name: "Email Marketing",
    description: "Send beautiful email campaigns",
    platform: "email",
    status: "disconnected",
    isActive: false,
    lastSync: "Never",
    features: ["Email Campaigns", "Segmentation", "A/B Testing", "Analytics"],
  },
  {
    id: 4,
    name: "Telegram Bot",
    description: "Automate Telegram channel and group messages",
    platform: "telegram",
    status: "available",
    isActive: false,
    lastSync: "Never",
    features: ["Channel Posts", "Group Management", "Bot Commands", "File Sharing"],
  },
]

const platformIcons = {
  whatsapp: MessageSquare,
  instagram: Instagram,
  email: Mail,
  telegram: MessageSquare,
}

const platformColors = {
  whatsapp: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  instagram: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
  email: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  telegram: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
}

export default function IntegrationsPage() {
  const [integrationList, setIntegrationList] = useState(integrations)

  const toggleIntegration = (id: number) => {
    setIntegrationList((prev) =>
      prev.map((integration) =>
        integration.id === id ? { ...integration, isActive: !integration.isActive } : integration,
      ),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "disconnected":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Plus className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Connected</Badge>
      case "disconnected":
        return <Badge variant="destructive">Disconnected</Badge>
      default:
        return <Badge variant="outline">Available</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Integrations</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect your favorite platforms to automate your marketing workflows.
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Browse Integrations
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {integrationList.map((integration) => {
          const PlatformIcon = platformIcons[integration.platform as keyof typeof platformIcons]

          return (
            <Card key={integration.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 rounded-lg ${platformColors[integration.platform as keyof typeof platformColors]}`}
                    >
                      <PlatformIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <span>{integration.name}</span>
                        {getStatusIcon(integration.status)}
                      </CardTitle>
                      <CardDescription>{integration.description}</CardDescription>
                    </div>
                  </div>
                  {integration.status === "connected" && (
                    <Switch checked={integration.isActive} onCheckedChange={() => toggleIntegration(integration.id)} />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {getStatusBadge(integration.status)}
                    <span className="text-sm text-gray-600 dark:text-gray-400">Last sync: {integration.lastSync}</span>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {integration.features.map((feature, index) => (
                        <div key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    {integration.status === "connected" ? (
                      <>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          Disconnect
                        </Button>
                      </>
                    ) : integration.status === "disconnected" ? (
                      <Button size="sm" className="flex-1">
                        Reconnect
                      </Button>
                    ) : (
                      <Button size="sm" className="flex-1">
                        <Plus className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
