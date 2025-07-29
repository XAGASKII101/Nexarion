"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, CreditCard, Download } from "lucide-react"
import { Header } from "@/components/layout/header"

export default function BillingPage() {
  const [currentPlan] = useState("starter")

  const plans = [
    {
      name: "Starter",
      price: 29,
      description: "Perfect for small businesses getting started",
      features: [
        "1,000 messages/month",
        "2 platform integrations",
        "Basic automation",
        "Email support",
        "Basic analytics",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: 79,
      description: "Best for growing businesses",
      features: [
        "10,000 messages/month",
        "All platform integrations",
        "Advanced automation",
        "Priority support",
        "Advanced analytics",
        "A/B testing",
        "Custom templates",
      ],
      popular: true,
    },
    {
      name: "Business",
      price: 199,
      description: "For large teams and enterprises",
      features: [
        "Unlimited messages",
        "All platform integrations",
        "Advanced automation",
        "24/7 phone support",
        "Advanced analytics",
        "A/B testing",
        "Custom templates",
        "White-label options",
        "API access",
      ],
      popular: false,
    },
  ]

  const usage = {
    messages: {
      used: 750,
      limit: 1000,
      percentage: 75,
    },
    integrations: {
      used: 2,
      limit: 2,
      percentage: 100,
    },
  }

  const invoices = [
    {
      id: "INV-001",
      date: "2024-01-01",
      amount: 29.0,
      status: "paid",
      plan: "Starter",
    },
    {
      id: "INV-002",
      date: "2023-12-01",
      amount: 29.0,
      status: "paid",
      plan: "Starter",
    },
    {
      id: "INV-003",
      date: "2023-11-01",
      amount: 29.0,
      status: "paid",
      plan: "Starter",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Billing" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Billing & Subscription</h1>
              <p className="text-muted-foreground">Manage your subscription, usage, and billing information.</p>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="plans">Plans</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Plan</CardTitle>
                      <CardDescription>Your current subscription details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold capitalize">{currentPlan} Plan</h3>
                            <p className="text-sm text-muted-foreground">Billed monthly • Next billing: Feb 1, 2024</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">$29</p>
                            <p className="text-sm text-muted-foreground">/month</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" className="flex-1 bg-transparent">
                            Change Plan
                          </Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Usage This Month</CardTitle>
                      <CardDescription>Track your current usage against plan limits</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Messages</span>
                            <span>
                              {usage.messages.used.toLocaleString()} / {usage.messages.limit.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={usage.messages.percentage} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Integrations</span>
                            <span>
                              {usage.integrations.used} / {usage.integrations.limit}
                            </span>
                          </div>
                          <Progress value={usage.integrations.percentage} className="h-2" />
                        </div>
                        {usage.messages.percentage > 80 && (
                          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                            <p className="text-sm text-orange-800 dark:text-orange-200">
                              You're approaching your message limit. Consider upgrading to avoid service interruption.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="plans" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-3">
                  {plans.map((plan, index) => (
                    <Card key={index} className={`relative ${plan.popular ? "border-primary" : ""}`}>
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="nexarion-gradient text-white">Most Popular</Badge>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{plan.name}</span>
                          {plan.name.toLowerCase() === currentPlan && <Badge variant="outline">Current</Badge>}
                        </CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="text-3xl font-bold">
                          ${plan.price}
                          <span className="text-sm font-normal text-muted-foreground">/month</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <ul className="space-y-2">
                            {plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center space-x-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            className={`w-full ${plan.popular ? "nexarion-gradient text-white" : ""}`}
                            variant={plan.popular ? "default" : "outline"}
                            disabled={plan.name.toLowerCase() === currentPlan}
                          >
                            {plan.name.toLowerCase() === currentPlan ? "Current Plan" : "Upgrade"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="invoices" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Invoice History</CardTitle>
                    <CardDescription>Download and view your past invoices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {invoices.map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{invoice.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(invoice.date).toLocaleDateString()} • {invoice.plan} Plan
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                              <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>
                                {invoice.status}
                              </Badge>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
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
