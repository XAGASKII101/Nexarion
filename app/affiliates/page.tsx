"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, DollarSign, Users, TrendingUp, Share, Eye, Calendar } from "lucide-react"
import { Header } from "@/components/layout/header"
import { useToast } from "@/hooks/use-toast"

export default function AffiliatesPage() {
  const { toast } = useToast()
  const [affiliateCode] = useState("NEXARION2024")
  const [referralLink] = useState(`https://nexarion.ai/auth?ref=${affiliateCode}`)

  const stats = {
    totalEarnings: 1250.5,
    totalReferrals: 23,
    conversionRate: 12.5,
    pendingCommission: 340.25,
    clicksThisMonth: 156,
    signupsThisMonth: 8,
  }

  const recentReferrals = [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      signupDate: "2024-01-15",
      status: "active",
      commission: 25.0,
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane@example.com",
      signupDate: "2024-01-12",
      status: "active",
      commission: 25.0,
    },
    {
      id: 3,
      username: "mike_wilson",
      email: "mike@example.com",
      signupDate: "2024-01-10",
      status: "pending",
      commission: 25.0,
    },
  ]

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    })
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Affiliate Program" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Affiliate Program</h1>
                <p className="text-muted-foreground">
                  Earn 20% commission for every customer you refer to Nexarion AI.
                </p>
              </div>
              <Button>
                <Share className="w-4 h-4 mr-2" />
                Share Link
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">${stats.totalEarnings}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+$125</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalReferrals}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+3</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{stats.conversionRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+2.1%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Commission</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">${stats.pendingCommission}</div>
                  <p className="text-xs text-muted-foreground">Payout in 7 days</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="referrals">Referrals</TabsTrigger>
                <TabsTrigger value="payouts">Payouts</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Referral Link</CardTitle>
                      <CardDescription>Share this link to earn 20% commission on every signup</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="affiliate-code">Affiliate Code</Label>
                        <div className="flex space-x-2">
                          <Input id="affiliate-code" value={affiliateCode} readOnly className="flex-1" />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(affiliateCode, "Affiliate code")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="referral-link">Referral Link</Label>
                        <div className="flex space-x-2">
                          <Input id="referral-link" value={referralLink} readOnly className="flex-1" />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(referralLink, "Referral link")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>This Month's Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">Clicks</span>
                          </div>
                          <span className="font-semibold">{stats.clicksThisMonth}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-green-600" />
                            <span className="text-sm">Signups</span>
                          </div>
                          <span className="font-semibold">{stats.signupsThisMonth}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-purple-600" />
                            <span className="text-sm">Earnings</span>
                          </div>
                          <span className="font-semibold">${(stats.signupsThisMonth * 25).toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="referrals" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Referrals</CardTitle>
                    <CardDescription>Your latest referrals and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentReferrals.map((referral) => (
                        <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">{referral.username}</p>
                            <p className="text-sm text-muted-foreground">{referral.email}</p>
                            <p className="text-xs text-muted-foreground">
                              Signed up on {new Date(referral.signupDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right space-y-1">
                            <Badge variant={referral.status === "active" ? "default" : "secondary"}>
                              {referral.status}
                            </Badge>
                            <p className="text-sm font-medium">${referral.commission}</p>
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
                    <CardDescription>Your commission payouts and pending payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No payouts yet</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Payouts are processed monthly when you reach $50 minimum
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
