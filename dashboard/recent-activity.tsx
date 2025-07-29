import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, UserPlus, Instagram } from "lucide-react"

export function RecentActivity() {
  // Mock activities - in a real app, this would come from an API
  const activities = [
    {
      id: 1,
      type: "campaign",
      title: 'Campaign "Welcome Series" sent 47 messages',
      timestamp: "2 hours ago",
      icon: Send,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      id: 2,
      type: "referral",
      title: "New referral signup: sarah@example.com",
      timestamp: "4 hours ago",
      icon: UserPlus,
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
    },
    {
      id: 3,
      type: "integration",
      title: "Instagram integration updated",
      timestamp: "6 hours ago",
      icon: Instagram,
      iconBg: "bg-purple-100 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ]

  return (
    <Card>
      <CardHeader className="border-b border-border">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 ${activity.iconBg} rounded-full flex items-center justify-center`}>
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="link" className="mt-4 p-0 h-auto text-primary">
          View all activity
        </Button>
      </CardContent>
    </Card>
  )
}
