import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Share, Copy } from "lucide-react";

export function AffiliateSummary() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: affiliateStats = {}, isLoading } = useQuery({
    queryKey: ["/api/affiliate/stats"],
  });

  const referralLink = user?.affiliateCode 
    ? `${window.location.origin}/auth?ref=${user.affiliateCode}`
    : "";

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy referral link",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Affiliate Program</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-24 mx-auto mb-2" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
          <div className="space-y-4 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalEarnings = Number(affiliateStats?.totalEarnings || 0);
  const totalReferrals = Number(affiliateStats?.totalReferrals || 0);
  const totalConversions = Number(affiliateStats?.totalConversions || 0);
  
  const conversionRate = totalReferrals > 0 
    ? ((totalConversions / totalReferrals) * 100).toFixed(1)
    : "0.0";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Affiliate Program</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Share className="h-8 w-8 text-white" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            ${totalEarnings.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">Total Earnings</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Referrals</span>
            <span className="font-semibold text-foreground">
              {totalReferrals}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Conversions</span>
            <span className="font-semibold text-foreground">
              {totalConversions}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Conversion Rate</span>
            <span className="font-semibold text-accent">{conversionRate}%</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600/10 to-primary/10 rounded-lg p-4 mb-4">
          <p className="text-sm text-muted-foreground mb-2">Your Referral Link</p>
          <div className="flex items-center space-x-2">
            <Input
              value={referralLink}
              readOnly
              className="text-xs flex-1"
            />
            <Button 
              size="icon" 
              variant="outline"
              onClick={copyReferralLink}
              className="flex-shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button className="w-full nexarion-gradient text-white font-medium button-glow">
          Request Payout
        </Button>
      </CardContent>
    </Card>
  );
}
