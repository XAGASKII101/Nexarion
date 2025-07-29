"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Send, Reply, Users, Bot } from "lucide-react"

export function StatsCards() {
  // Mock stats data
  const stats = {
    messagesSent: 1247,
    responseRate: 68,
    affiliateEarnings: 127.5,
    activeAutomations: 5,
  }

  const statCards = [
    {
      title: "Messages Sent",
      value: stats.messagesSent.toLocaleString(),
      icon: Send,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      change: "+12%",
      changeLabel: "from last month",
    },
    {
      title: "Response Rate",
      value: `${stats.responseRate}%`,
      icon: Reply,
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
      change: "+5.2%",
      changeLabel: "from last week",
    },
    {
      title: "Affiliate Earnings",
      value: `$${stats.affiliateEarnings}`,
      icon: Users,
      iconBg: "bg-purple-100 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      change: "+18%",
      changeLabel: "this month",
    },
    {
      title: "Active Automations",
      value: stats.activeAutomations.toString(),
      icon: Bot,
      iconBg: "bg-orange-100 dark:bg-orange-900/20",
      iconColor: "text-orange-600 dark:text-orange-400",
      change: "+3",
      changeLabel: "new this week",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <Card key={index} className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-accent font-medium">{stat.change}</span>
              <span className="text-muted-foreground ml-1">{stat.changeLabel}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
