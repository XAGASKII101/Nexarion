import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { ConnectedPlatforms } from "@/components/dashboard/connected-platforms";
import { CampaignPerformance } from "@/components/dashboard/campaign-performance";
import { AffiliateSummary } from "@/components/dashboard/affiliate-summary";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-hidden">
        <Header title="Dashboard" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in-up">
            {/* Stats Overview */}
            <StatsCards />

            {/* Quick Actions */}
            <QuickActions />

            {/* Recent Activity & Connected Platforms */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <RecentActivity />
              <ConnectedPlatforms />
            </div>

            {/* Campaign Performance & Affiliate Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <CampaignPerformance />
              <AffiliateSummary />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
