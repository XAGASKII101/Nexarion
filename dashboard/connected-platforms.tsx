import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

export function ConnectedPlatforms() {
  // Mock connected platforms
  const connectedPlatforms = [
    {
      name: "WhatsApp Business",
      icon: "🟢",
      status: "Active",
      contacts: 2847,
      bgColor: "bg-green-50 dark:bg-green-900/10",
      borderColor: "border-green-200 dark:border-green-800",
      statusColor: "text-green-600 dark:text-green-400",
      dotColor: "bg-green-500",
    },
    {
      name: "Instagram Business",
      icon: "🟣",
      status: "Active",
      contacts: 1523,
      bgColor: "bg-purple-50 dark:bg-purple-900/10",
      borderColor: "border-purple-200 dark:border-purple-800",
      statusColor: "text-purple-600 dark:text-purple-400",
      dotColor: "bg-purple-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Platforms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {connectedPlatforms.map((platform, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 ${platform.bgColor} rounded-lg border ${platform.borderColor}`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-lg">{platform.icon}</span>
              </div>
              <div className="ml-3">
                <p className="font-medium text-foreground">{platform.name}</p>
                <p className="text-sm text-muted-foreground">
                  Connected • {platform.contacts.toLocaleString()} contacts
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`w-2 h-2 ${platform.dotColor} rounded-full mr-2`}></span>
              <Badge variant="secondary" className={platform.statusColor}>
                {platform.status}
              </Badge>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          className="w-full py-2 px-4 border-2 border-dashed border-muted-foreground/25 hover:border-primary hover:text-primary transition-colors bg-transparent"
        >
          <Plus className="mr-2 h-4 w-4" />
          Connect New Platform
        </Button>
      </CardContent>
    </Card>
  )
}
