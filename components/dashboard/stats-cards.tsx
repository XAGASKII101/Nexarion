"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, TrendingUp, Users, DollarSign } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

export function StatsCards() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard/stats", {
        credentials: "include",
      })
      if (!response.ok) throw new Error("Failed to fetch stats")
      return response.json()
    },
  })

  const statsData = [
    {
      title: "Messages Sent",
      value: stats?.messagesSent || 0,
      icon: MessageSquare,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Response Rate",
      value: `${stats?.responseRate || 0}%`,
      icon: TrendingUp,
      change: "+5.2%",
      changeType: "positive" as const,
    },
    {
      title: "Active Automations",
      value: stats?.activeAutomations || 0,
      icon: Users,
      change: "+2",
      changeType: "positive" as const,
    },
    {
      title: "Affiliate Earnings",
      value: `$${stats?.affiliateEarnings || 0}`,
      icon: DollarSign,
      change: "+$125",
      changeType: "positive" as const,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>{stat.change}</span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
