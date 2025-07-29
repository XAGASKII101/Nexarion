import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  CreditCard, 
  Download, 
  CheckCircle, 
  Zap, 
  Users, 
  Infinity,
  Calendar,
  DollarSign
} from "lucide-react";

export default function Billing() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState("");

  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ["/api/payments"],
  });

  const upgradeMutation = useMutation({
    mutationFn: async (planData: any) => {
      const res = await apiRequest("POST", "/api/payments", planData);
      return await res.json();
    },
    onSuccess: (payment) => {
      queryClient.invalidateQueries({ queryKey: ["/api/payments"] });
      toast({
        title: "Payment initiated",
        description: "Redirecting to payment gateway...",
      });
      // In a real app, redirect to payment gateway
      console.log("Redirecting to payment gateway:", payment);
    },
    onError: (error: Error) => {
      toast({
        title: "Payment failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: { usd: 29, ngn: 29000 },
      description: "Perfect for small businesses getting started",
      features: [
        "1 Platform Integration",
        "500 Messages/month",
        "Basic Automation",
        "Email Support",
        "Analytics Dashboard",
      ],
      limitations: ["Limited to WhatsApp OR Instagram OR Email"],
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: { usd: 79, ngn: 79000 },
      description: "Great for growing businesses",
      features: [
        "3 Platform Integrations",
        "5,000 Messages/month",
        "Advanced Automation",
        "Priority Support",
        "Advanced Analytics",
        "A/B Testing",
        "Custom Templates",
      ],
      popular: true,
    },
    {
      id: "business",
      name: "Business",
      price: { usd: 199, ngn: 199000 },
      description: "For large teams and enterprises",
      features: [
        "Unlimited Integrations",
        "Unlimited Messages",
        "Advanced AI Features",
        "24/7 Phone Support",
        "Custom Integrations",
        "Team Management",
        "White-label Options",
        "API Access",
      ],
      enterprise: true,
    },
  ];

  const handleUpgrade = (planId: string, currency: 'usd' | 'ngn') => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    upgradeMutation.mutate({
      amount: plan.price[currency],
      currency: currency.toUpperCase(),
      gateway: currency === 'ngn' ? 'paystack' : 'paystack', // or flutterwave
      metadata: {
        plan: planId,
        type: 'subscription',
      },
    });
  };

  if (paymentsLoading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <Header title="Billing" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6">
              <Skeleton className="h-32 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-96" />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-hidden">
        <Header title="Billing & Plans" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in-up">
            {/* Current Plan */}
            <Card className="mb-8 nexarion-gradient text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Current Plan: {user?.plan?.charAt(0).toUpperCase() + user?.plan?.slice(1)}</h3>
                    <p className="text-white/80">
                      {user?.plan === 'starter' && "You're on the Starter plan with basic features"}
                      {user?.plan === 'pro' && "You're on the Pro plan with advanced features"}
                      {user?.plan === 'business' && "You're on the Business plan with all features"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {user?.plan === 'starter' && '$29'}
                      {user?.plan === 'pro' && '$79'}
                      {user?.plan === 'business' && '$199'}
                      /month
                    </p>
                    <p className="text-white/80 text-sm">Billed monthly</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="plans" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="plans">Plans & Pricing</TabsTrigger>
                <TabsTrigger value="usage">Usage & Limits</TabsTrigger>
                <TabsTrigger value="history">Payment History</TabsTrigger>
              </TabsList>

              <TabsContent value="plans" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Plan</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Scale your automation with plans designed for every business size. 
                    All plans include our affiliate program with 20% commission.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card 
                      key={plan.id} 
                      className={`relative ${
                        plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''
                      } ${user?.plan === plan.id ? 'bg-muted/50' : ''}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="nexarion-gradient text-white">Most Popular</Badge>
                        </div>
                      )}
                      
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 nexarion-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                          {plan.id === 'starter' && <Zap className="h-6 w-6 text-white" />}
                          {plan.id === 'pro' && <Users className="h-6 w-6 text-white" />}
                          {plan.id === 'business' && <Infinity className="h-6 w-6 text-white" />}
                        </div>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <div className="text-3xl font-bold text-foreground">
                          ${plan.price.usd}
                          <span className="text-sm font-normal text-muted-foreground">/month</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ₦{plan.price.ngn.toLocaleString()}/month
                        </div>
                        <p className="text-muted-foreground">{plan.description}</p>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {plan.limitations && (
                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground">
                              {plan.limitations[0]}
                            </p>
                          </div>
                        )}

                        <div className="pt-4 space-y-2">
                          {user?.plan === plan.id ? (
                            <Button className="w-full" disabled>
                              Current Plan
                            </Button>
                          ) : (
                            <>
                              <Button 
                                className="w-full nexarion-gradient text-white button-glow"
                                onClick={() => handleUpgrade(plan.id, 'usd')}
                                disabled={upgradeMutation.isPending}
                              >
                                {upgradeMutation.isPending ? "Processing..." : `Upgrade - $${plan.price.usd}/mo`}
                              </Button>
                              <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={() => handleUpgrade(plan.id, 'ngn')}
                                disabled={upgradeMutation.isPending}
                              >
                                Pay in Naira - ₦{plan.price.ngn.toLocaleString()}/mo
                              </Button>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-r from-purple-500/10 to-primary/10 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-foreground mb-2">Need a Custom Solution?</h3>
                    <p className="text-muted-foreground mb-4">
                      We offer enterprise plans with custom integrations, dedicated support, and volume discounts.
                    </p>
                    <Button variant="outline">Contact Sales</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="usage" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Messages Used</span>
                        <span className="text-sm text-muted-foreground">This Month</span>
                      </div>
                      <div className="text-2xl font-bold">247</div>
                      <div className="text-sm text-muted-foreground">
                        of {user?.plan === 'starter' ? '500' : user?.plan === 'pro' ? '5,000' : '∞'} messages
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div 
                          className="nexarion-gradient h-2 rounded-full" 
                          style={{ 
                            width: user?.plan === 'starter' ? '49.4%' : user?.plan === 'pro' ? '4.9%' : '0%' 
                          }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Integrations</span>
                        <span className="text-sm text-muted-foreground">Active</span>
                      </div>
                      <div className="text-2xl font-bold">2</div>
                      <div className="text-sm text-muted-foreground">
                        of {user?.plan === 'starter' ? '1' : user?.plan === 'pro' ? '3' : '∞'} integrations
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Automations</span>
                        <span className="text-sm text-muted-foreground">Running</span>
                      </div>
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-sm text-muted-foreground">
                        {user?.plan === 'starter' ? 'Basic features' : user?.plan === 'pro' ? 'Advanced features' : 'All features'}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Support Level</span>
                        <span className="text-sm text-muted-foreground">Current</span>
                      </div>
                      <div className="text-lg font-bold">
                        {user?.plan === 'starter' ? 'Email' : user?.plan === 'pro' ? 'Priority' : '24/7 Phone'}
                      </div>
                      <div className="text-sm text-muted-foreground">Response time: 
                        {user?.plan === 'starter' ? ' 24h' : user?.plan === 'pro' ? ' 4h' : ' 1h'}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing Cycle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Next billing date</p>
                          <p className="text-sm text-muted-foreground">February 15, 2024</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {user?.plan === 'starter' && '$29.00'}
                          {user?.plan === 'pro' && '$79.00'}
                          {user?.plan === 'business' && '$199.00'}
                        </p>
                        <p className="text-sm text-muted-foreground">Monthly</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!payments || (payments as any)?.length === 0 ? (
                      <div className="text-center py-8">
                        <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          No Payment History
                        </h3>
                        <p className="text-muted-foreground">
                          Your payment history will appear here once you make your first payment
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {(payments as any)?.map((payment: any) => (
                          <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                                <CreditCard className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {payment.metadata?.plan?.charAt(0).toUpperCase() + payment.metadata?.plan?.slice(1)} Plan
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(payment.createdAt).toLocaleDateString()} • {payment.gateway}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <p className="font-medium">
                                  {payment.currency === 'USD' ? '$' : '₦'}{payment.amount}
                                </p>
                                <Badge 
                                  variant={payment.status === 'completed' ? 'default' : 'secondary'}
                                  className={payment.status === 'completed' ? 'bg-accent' : ''}
                                >
                                  {payment.status}
                                </Badge>
                              </div>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Receipt
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
