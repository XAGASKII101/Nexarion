"use client"

import { StatsCards } from "@/components/dashboard/stats-cards"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ConnectedPlatforms } from "@/components/dashboard/connected-platforms"
import { CampaignPerformance } from "@/components/dashboard/campaign-performance"
import { AffiliateSummary } from "@/components/dashboard/affiliate-summary"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground">Here's what's happening with your automation campaigns today.</p>
      </div>

      <StatsCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CampaignPerformance />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity />
        <ConnectedPlatforms />
      </div>

      <AffiliateSummary />
    </div>
  )
}
