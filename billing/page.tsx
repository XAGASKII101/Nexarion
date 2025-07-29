"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, CreditCard, Download } from "lucide-react"

const currentPlan = {
  name: "Pro",
  price: 29.99,
  billing: "monthly",
  features: [
    "10,000 messages/month",
    "All platform integrations",
    "Advanced analytics",
    "Priority support",
    "Custom automations",
  ],
  nextBilling: "2024-02-15",
}

const plans = [
  {
    name: "Starter",
    price: 9.99,
    yearlyPrice: 99.99,
    features: ["1,000 messages/month", "WhatsApp integration", "Basic analytics", "Email support", "5 automations"],
    popular: false,
  },
  {
    name: "Pro",
    price: 29.99,
    yearlyPrice: 299.99,
    features: [
      "10,000 messages/month",
      "All platform integrations",
      "Advanced analytics",
      "Priority support",
      "Unlimited automations",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: 59.99,
    yearlyPrice: 599.99,
    features: [
      "50,000 messages/month",
      "All platform integrations",
      "Custom analytics",
      "24/7 phone support",
      "White-label options",
    ],
    popular: false,
  },
]

const invoiceHistory = [
  {
    id: "INV-001",
    date: "2024-01-15",
    amount: 29.99,
    status: "paid",
    plan: "Pro Monthly",
  },
  {
    id: "INV-002",
    date: "2023-12-15",
    amount: 29.99,
    status: "paid",
    plan: "Pro Monthly",
  },
  {
    id: "INV-003",
    date: "2023-11-15",
    amount: 29.99,
    status: "paid",
    plan: "Pro Monthly",
  },
]

export default function BillingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Subscription</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your subscription, billing information, and payment history.
        </p>
      </div>

      <Tabs defaultValue="subscription" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You are currently subscribed to the {currentPlan.name} plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-2xl font-bold">{currentPlan.name} Plan</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    ${currentPlan.price}/{currentPlan.billing}
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Active</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Plan Features</h4>
                  <ul className="space-y-2">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Billing Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Next billing date:</span>
                      <span>{currentPlan.nextBilling}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment method:</span>
                      <span>•••• •••• •••• 4242</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Billing cycle:</span>
                      <span className="capitalize">{currentPlan.billing}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Update Payment Method
                </Button>
                <Button variant="outline">Cancel Subscription</Button>
              </div>
            </CardContent>
          </Card>

          {/* Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Current Usage</CardTitle>
              <CardDescription>Your usage for the current billing period.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Messages sent</span>
                    <span>3,247 / 10,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "32.47%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Active automations</span>
                    <span>8 / Unlimited</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          {/* Billing Toggle */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-4">
                <span className={!isYearly ? "font-medium" : "text-gray-600 dark:text-gray-400"}>Monthly</span>
                <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                <span className={isYearly ? "font-medium" : "text-gray-600 dark:text-gray-400"}>Yearly</span>
                <Badge variant="secondary" className="ml-2">
                  Save 17%
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Plans */}
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    ${isYearly ? plan.yearlyPrice : plan.price}
                    <span className="text-lg font-normal text-gray-600 dark:text-gray-400">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                  {isYearly && (
                    <div className="text-sm text-green-600">
                      Save ${(plan.price * 12 - plan.yearlyPrice).toFixed(2)} per year
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.name === currentPlan.name ? "outline" : "default"}
                    disabled={plan.name === currentPlan.name}
                  >
                    {plan.name === currentPlan.name ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>Download and view your past invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoiceHistory.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium">{invoice.id}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {invoice.date} • {invoice.plan}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">${invoice.amount}</div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
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
  )
}
