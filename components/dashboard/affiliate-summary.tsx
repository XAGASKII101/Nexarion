"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, TrendingUp, Share } from "lucide-react"
import { useRouter } from "next/navigation"

export function AffiliateSummary() {
  const router = useRouter()

  const affiliateStats = {
    totalEarnings: 1250.5,
    totalReferrals: 23,
    conversionRate: 12.5,
    pendingCommission: 340.25,
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Affiliate Program</CardTitle>
        <Button variant="outline" size="sm" onClick={() => router.push("/affiliates")}>
          <Share className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">${affiliateStats.totalEarnings}</div>
            <div className="text-sm text-muted-foreground">Total Earnings</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{affiliateStats.totalReferrals}</div>
            <div className="text-sm text-muted-foreground">Referrals</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{affiliateStats.conversionRate}%</div>
            <div className="text-sm text-muted-foreground">Conversion Rate</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Badge variant="outline" className="mb-2">
                Pending
              </Badge>
            </div>
            <div className="text-2xl font-bold text-orange-600">${affiliateStats.pendingCommission}</div>
            <div className="text-sm text-muted-foreground">Pending Commission</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
