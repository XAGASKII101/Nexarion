import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Bot, Play, Pause, Edit, Trash2 } from "lucide-react";

export default function Automations() {
  const { data: automations, isLoading } = useQuery({
    queryKey: ["/api/automations"],
  });

  if (isLoading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <Header title="Automations" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
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
        <Header title="Automations" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in-up">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Automation Flows</h2>
                <p className="text-muted-foreground">
                  Create and manage automated workflows for your communications
                </p>
              </div>
              <Button className="nexarion-gradient text-white button-glow">
                <Plus className="mr-2 h-4 w-4" />
                Create Automation
              </Button>
            </div>

            {/* Automations Grid */}
            {!automations || (automations as any)?.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No Automations Yet
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Get started by creating your first automation flow. 
                    Set up automatic responses, follow-ups, and more.
                  </p>
                  <Button className="nexarion-gradient text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Automation
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {(automations as any)?.map((automation: any) => (
                  <Card key={automation.id} className="card-hover">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 nexarion-gradient rounded-lg flex items-center justify-center">
                            <Bot className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{automation.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {automation.description}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant={automation.isActive ? "default" : "secondary"}
                          className={automation.isActive ? "bg-accent" : ""}
                        >
                          {automation.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          Created {new Date(automation.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            {automation.isActive ? (
                              <Pause className="h-4 w-4 mr-1" />
                            ) : (
                              <Play className="h-4 w-4 mr-1" />
                            )}
                            {automation.isActive ? "Pause" : "Start"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
