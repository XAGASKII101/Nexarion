import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Share, Copy, DollarSign, Users, TrendingUp, Eye, MousePointer } from "lucide-react";

export default function Affiliates() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: affiliateStats, isLoading: statsLoading } = useQuery({
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

  const shareOnSocial = (platform: string) => {
    const text = "Join me on Nexarion AI - the ultimate automation platform for WhatsApp, Instagram, and Email! 🚀";
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  if (statsLoading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <Header title="Affiliates" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6">
              <Skeleton className="h-32 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24" />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const totalEarnings = Number((affiliateStats as any)?.totalEarnings || 0);
  const totalReferrals = Number((affiliateStats as any)?.totalReferrals || 0);
  const totalConversions = Number((affiliateStats as any)?.totalConversions || 0);
  
  const conversionRate = totalReferrals > 0 
    ? ((totalConversions / totalReferrals) * 100).toFixed(1)
    : "0.0";

  const stats = [
    {
      title: "Total Earnings",
      value: `$${totalEarnings.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/10",
      change: "+$127.50 this month",
    },
    {
      title: "Referrals",
      value: totalReferrals,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
      change: "+12 this month",
    },
    {
      title: "Conversions",
      value: totalConversions,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/10",
      change: `${conversionRate}% conversion rate`,
    },
  ];

  // Mock referral data - in a real app this would come from the API
  const recentReferrals = [
    { id: 1, email: "john@example.com", status: "converted", date: "2024-01-15", commission: 24.99 },
    { id: 2, email: "sarah@example.com", status: "pending", date: "2024-01-14", commission: 0 },
    { id: 3, email: "mike@example.com", status: "converted", date: "2024-01-12", commission: 49.99 },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-hidden">
        <Header title="Affiliate Program" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in-up">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Affiliate Dashboard</h2>
              <p className="text-muted-foreground">
                Earn 20% commission for every customer you refer to Nexarion AI
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-sm text-muted-foreground">{stat.change}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="referrals">Referrals</TabsTrigger>
                <TabsTrigger value="payouts">Payouts</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Referral Link Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Share className="h-5 w-5 mr-2" />
                      Your Referral Link
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={referralLink}
                        readOnly
                        className="flex-1"
                      />
                      <Button onClick={copyReferralLink} variant="outline">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => shareOnSocial('twitter')}
                        className="flex items-center space-x-2"
                      >
                        <span>🐦</span>
                        <span>Twitter</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => shareOnSocial('facebook')}
                        className="flex items-center space-x-2"
                      >
                        <span>📘</span>
                        <span>Facebook</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => shareOnSocial('linkedin')}
                        className="flex items-center space-x-2"
                      >
                        <span>💼</span>
                        <span>LinkedIn</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* How It Works */}
                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 nexarion-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                          <Share className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">1. Share Your Link</h3>
                        <p className="text-sm text-muted-foreground">
                          Share your unique referral link with friends, colleagues, or on social media
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 nexarion-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">2. They Sign Up</h3>
                        <p className="text-sm text-muted-foreground">
                          When someone signs up using your link, they're tracked as your referral
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 nexarion-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                          <DollarSign className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">3. Earn Commission</h3>
                        <p className="text-sm text-muted-foreground">
                          Earn 20% recurring commission when they upgrade to a paid plan
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="referrals" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Referrals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentReferrals.length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          No Referrals Yet
                        </h3>
                        <p className="text-muted-foreground">
                          Start sharing your referral link to see your referrals here
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentReferrals.map((referral) => (
                          <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium">
                                  {referral.email.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{referral.email}</p>
                                <p className="text-sm text-muted-foreground">
                                  Signed up on {new Date(referral.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge variant={referral.status === 'converted' ? 'default' : 'secondary'}>
                                {referral.status === 'converted' ? 'Converted' : 'Pending'}
                              </Badge>
                              <div className="text-right">
                                <p className="font-medium">
                                  ${referral.commission.toFixed(2)}
                                </p>
                                <p className="text-xs text-muted-foreground">Commission</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payouts" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Available for Payout</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-foreground mb-2">
                          ${totalEarnings.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Minimum payout: $50.00
                        </p>
                        <Button 
                          className="nexarion-gradient text-white w-full"
                          disabled={totalEarnings < 50}
                        >
                          Request Payout
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payout Methods</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">PayPal</h4>
                        <p className="text-sm text-muted-foreground">
                          Fast and secure payments worldwide
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Bank Transfer</h4>
                        <p className="text-sm text-muted-foreground">
                          Direct deposit to your bank account
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Paystack (Nigeria)</h4>
                        <p className="text-sm text-muted-foreground">
                          Local payments for Nigerian affiliates
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Payout History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No Payouts Yet
                      </h3>
                      <p className="text-muted-foreground">
                        Your payout history will appear here once you request your first payout
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
  );
}
