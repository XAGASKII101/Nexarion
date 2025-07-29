"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, DollarSign, Users, TrendingUp, Share2, Eye, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const affiliateStats = {
  totalEarnings: 2450.5,
  pendingPayouts: 320.75,
  totalReferrals: 45,
  activeReferrals: 28,
  conversionRate: 12.5,
  clickThroughRate: 8.3,
}

const recentReferrals = [
  {
    id: 1,
    email: "john.doe@example.com",
    plan: "Pro",
    commission: 29.99,
    status: "active",
    joinedAt: "2024-01-15",
    lastActive: "2024-01-20",
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    plan: "Business",
    commission: 59.99,
    status: "pending",
    joinedAt: "2024-01-18",
    lastActive: "2024-01-19",
  },
  {
    id: 3,
    email: "mike.johnson@example.com",
    plan: "Starter",
    commission: 9.99,
    status: "active",
    joinedAt: "2024-01-12",
    lastActive: "2024-01-20",
  },
]

const payoutHistory = [
  {
    id: 1,
    amount: 450.25,
    date: "2024-01-01",
    status: "completed",
    method: "PayPal",
  },
  {
    id: 2,
    amount: 320.5,
    date: "2023-12-01",
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: 3,
    amount: 180.75,
    date: "2023-11-01",
    status: "completed",
    method: "PayPal",
  },
]

export default function AffiliatesPage() {
  const { toast } = useToast()
  const affiliateCode = "NEX-AF-12345"
  const affiliateLink = `https://nexarion.com/signup?ref=${affiliateCode}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The affiliate link has been copied to your clipboard.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Affiliate Program</h1>
        <p className="text-gray-600 dark:text-gray-400">Earn 20% commission for every user you refer to Nexarion.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${affiliateStats.totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${affiliateStats.pendingPayouts.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Next payout: Feb 1st</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{affiliateStats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">{affiliateStats.activeReferrals} active subscribers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{affiliateStats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">{affiliateStats.clickThroughRate}% click-through rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Affiliate Link */}
      <Card>
        <CardHeader>
          <CardTitle>Your Affiliate Link</CardTitle>
          <CardDescription>Share this link to earn 20% commission on every successful referral.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <div className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-md font-mono text-sm">{affiliateLink}</div>
            <Button onClick={() => copyToClipboard(affiliateLink)}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="referrals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="payouts">Payout History</TabsTrigger>
          <TabsTrigger value="resources">Marketing Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Referrals</CardTitle>
              <CardDescription>Track your recent referrals and their subscription status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReferrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-medium">{referral.email}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Joined {referral.joinedAt} • Last active {referral.lastActive}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{referral.plan}</Badge>
                      <Badge variant={referral.status === "active" ? "default" : "secondary"}>{referral.status}</Badge>
                      <div className="text-right">
                        <div className="font-medium">${referral.commission}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Commission</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>View your commission payout history and payment methods.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payoutHistory.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">${payout.amount.toFixed(2)}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {payout.date} • {payout.method}
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      {payout.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Materials</CardTitle>
                <CardDescription>Download banners, logos, and promotional content.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    Banner Pack (PNG, JPG)
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    Logo Assets
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    Social Media Templates
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Commission Structure</CardTitle>
                <CardDescription>Understand how you earn commissions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Starter Plan</span>
                    <span className="font-medium">$2.00 (20%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pro Plan</span>
                    <span className="font-medium">$6.00 (20%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Business Plan</span>
                    <span className="font-medium">$12.00 (20%)</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Commissions are paid monthly for active subscriptions.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
