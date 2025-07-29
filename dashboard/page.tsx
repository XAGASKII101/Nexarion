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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your campaigns.</p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CampaignPerformance />
          <RecentActivity />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <ConnectedPlatforms />
          <AffiliateSummary />
        </div>
      </div>
    </div>
  )
}
