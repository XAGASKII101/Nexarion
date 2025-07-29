"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Play, Pause, Settings, MessageSquare, Instagram, Mail } from "lucide-react"

const automations = [
  {
    id: 1,
    name: "Welcome Series",
    description: "Automated welcome messages for new subscribers",
    platform: "whatsapp",
    status: "active",
    triggers: 45,
    responses: 38,
    isActive: true,
  },
  {
    id: 2,
    name: "Instagram Follow-up",
    description: "Follow-up messages for Instagram story interactions",
    platform: "instagram",
    status: "active",
    triggers: 23,
    responses: 19,
    isActive: true,
  },
  {
    id: 3,
    name: "Email Nurture Campaign",
    description: "5-part email series for lead nurturing",
    platform: "email",
    status: "paused",
    triggers: 12,
    responses: 8,
    isActive: false,
  },
  {
    id: 4,
    name: "Abandoned Cart Recovery",
    description: "Recover abandoned carts with targeted messages",
    platform: "whatsapp",
    status: "draft",
    triggers: 0,
    responses: 0,
    isActive: false,
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

export default function AutomationsPage() {
  const [automationList, setAutomationList] = useState(automations)

  const toggleAutomation = (id: number) => {
    setAutomationList((prev) =>
      prev.map((automation) =>
        automation.id === id
          ? { ...automation, isActive: !automation.isActive, status: automation.isActive ? "paused" : "active" }
          : automation,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Automations</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage automated workflows across all platforms.
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      <div className="grid gap-6">
        {automationList.map((automation) => {
          const PlatformIcon = platformIcons[automation.platform as keyof typeof platformIcons]

          return (
            <Card key={automation.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${platformColors[automation.platform as keyof typeof platformColors]}`}
                    >
                      <PlatformIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{automation.name}</CardTitle>
                      <CardDescription>{automation.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={
                        automation.status === "active"
                          ? "default"
                          : automation.status === "paused"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {automation.status}
                    </Badge>
                    <Switch checked={automation.isActive} onCheckedChange={() => toggleAutomation(automation.id)} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{automation.triggers}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Triggers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{automation.responses}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Responses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {automation.triggers > 0 ? Math.round((automation.responses / automation.triggers) * 100) : 0}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      {automation.isActive ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </>
                      )}
                    </Button>
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
