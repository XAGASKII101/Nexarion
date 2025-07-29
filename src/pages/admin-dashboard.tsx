import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { 
  Users, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  Shield, 
  AlertTriangle,
  UserCheck,
  UserX,
  Crown,
  Ban
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if not admin
  if (user && user.role !== 'admin') {
    setLocation('/');
    return null;
  }

  const { data: adminUsers, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],
  });

  // Mock admin stats - in a real app these would come from dedicated admin endpoints
  const adminStats = [
    {
      title: "Total Users",
      value: "1,247",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
      change: "+89 this month",
    },
    {
      title: "Revenue",
      value: "$23,450",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/10",
      change: "+12% vs last month",
    },
    {
      title: "Active Campaigns",
      value: "342",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/10",
      change: "67 created today",
    },
    {
      title: "Affiliate Payouts",
      value: "$4,890",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/10",
      change: "23 pending",
    },
  ];

  // Mock user data
  const mockUsers = [
    {
      id: "1",
      username: "johndoe",
      email: "john@example.com",
      role: "user",
      plan: "pro",
      isActive: true,
      createdAt: "2024-01-15T10:30:00Z",
      lastActive: "2024-01-25T14:20:00Z",
    },
    {
      id: "2",
      username: "sarahsmith",
      email: "sarah@example.com",
      role: "affiliate",
      plan: "business",
      isActive: true,
      createdAt: "2024-01-10T09:15:00Z",
      lastActive: "2024-01-25T16:45:00Z",
    },
    {
      id: "3",
      username: "mikejohnson",
      email: "mike@example.com",
      role: "user",
      plan: "starter",
      isActive: false,
      createdAt: "2024-01-20T11:45:00Z",
      lastActive: "2024-01-23T08:30:00Z",
    },
  ];

  if (usersLoading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <Header title="Admin Dashboard" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-24" />
                ))}
              </div>
              <Skeleton className="h-96" />
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
        <Header title="Admin Dashboard" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in-up">
            {/* Admin Warning */}
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-yellow-600" />
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Admin Access - You have administrative privileges to manage users and system settings
                </p>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {adminStats.map((stat, index) => (
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

            <Tabs defaultValue="users" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>User Management</CardTitle>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Export</Button>
                        <Button size="sm" className="nexarion-gradient text-white">
                          Add User
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium">
                                {user.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-medium">{user.username}</p>
                                {user.role === 'admin' && (
                                  <Crown className="h-4 w-4 text-yellow-600" />
                                )}
                                {user.role === 'affiliate' && (
                                  <Badge variant="secondary">Affiliate</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {user.plan}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  Last active: {new Date(user.lastActive).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={user.isActive ? 'default' : 'secondary'}
                              className={user.isActive ? 'bg-accent' : ''}
                            >
                              {user.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                            <Button variant="outline" size="sm">
                              {user.isActive ? (
                                <UserX className="h-4 w-4 mr-1" />
                              ) : (
                                <UserCheck className="h-4 w-4 mr-1" />
                              )}
                              {user.isActive ? 'Suspend' : 'Activate'}
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="revenue" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue by Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Business Plan</span>
                          <span className="font-bold text-green-600">$12,450</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Pro Plan</span>
                          <span className="font-bold text-blue-600">$8,730</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Starter Plan</span>
                          <span className="font-bold text-purple-600">$2,270</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Recurring Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-foreground mb-2">$23,450</p>
                        <p className="text-sm text-muted-foreground mb-4">+12% from last month</p>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Annual Run Rate: $281,400</p>
                          <p>Churn Rate: 3.2%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Transaction data would be displayed here
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="affiliates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Affiliate Program Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">127</p>
                        <p className="text-sm text-muted-foreground">Active Affiliates</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">$4,890</p>
                        <p className="text-sm text-muted-foreground">Pending Payouts</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">20%</p>
                        <p className="text-sm text-muted-foreground">Commission Rate</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Top Performing Affiliates</h4>
                      {[
                        { name: "Sarah Smith", earnings: "$890.50", referrals: 23 },
                        { name: "Mike Johnson", earnings: "$675.20", referrals: 18 },
                        { name: "Emily Davis", earnings: "$542.10", referrals: 15 },
                      ].map((affiliate, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">{affiliate.name}</p>
                            <p className="text-sm text-muted-foreground">{affiliate.referrals} referrals</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">{affiliate.earnings}</p>
                            <p className="text-xs text-muted-foreground">Total earned</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                        System Health
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-4">Service Status</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span>API Server</span>
                              <Badge className="bg-green-500 text-white">Operational</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Database</span>
                              <Badge className="bg-green-500 text-white">Operational</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>WhatsApp Integration</span>
                              <Badge className="bg-green-500 text-white">Operational</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Email Service</span>
                              <Badge className="bg-yellow-500 text-white">Degraded</Badge>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-4">System Metrics</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span>CPU Usage</span>
                              <span className="font-medium">34%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Memory Usage</span>
                              <span className="font-medium">67%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Disk Usage</span>
                              <span className="font-medium">45%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Active Connections</span>
                              <span className="font-medium">1,247</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
                          <Ban className="h-6 w-6" />
                          <span>System Maintenance</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
                          <Activity className="h-6 w-6" />
                          <span>View Logs</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
                          <Users className="h-6 w-6" />
                          <span>Bulk User Actions</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
