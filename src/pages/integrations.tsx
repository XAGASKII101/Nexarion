import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Link as LinkIcon, Settings, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";

interface Integration {
  id: string;
  platform: "whatsapp" | "instagram" | "email";
  isActive: boolean;
  credentials: any;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export default function Integrations() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  const { data: integrations, isLoading } = useQuery<Integration[]>({
    queryKey: ["/api/integrations"],
  });

  const addIntegrationMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/integrations", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/integrations"] });
      toast({
        title: "Integration added",
        description: "Platform has been successfully connected",
      });
      setIsAddDialogOpen(false);
      setSelectedPlatform("");
    },
    onError: (error: Error) => {
      toast({
        title: "Connection failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteIntegrationMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/integrations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/integrations"] });
      toast({
        title: "Integration removed",
        description: "Platform has been disconnected",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const platforms = [
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      description: "Connect your WhatsApp Business account to send automated messages",
      icon: FaWhatsapp,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/10",
      borderColor: "border-green-200 dark:border-green-800",
      fields: [
        { name: "accessToken", label: "Access Token", type: "password", required: true },
        { name: "phoneNumberId", label: "Phone Number ID", type: "text", required: true },
        { name: "webhookVerifyToken", label: "Webhook Verify Token", type: "password", required: true },
      ],
    },
    {
      id: "instagram",
      name: "Instagram Business",
      description: "Connect your Instagram Business account for automated DMs",
      icon: FaInstagram,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/10",
      borderColor: "border-purple-200 dark:border-purple-800",
      fields: [
        { name: "accessToken", label: "Access Token", type: "password", required: true },
        { name: "instagramAccountId", label: "Instagram Account ID", type: "text", required: true },
      ],
    },
    {
      id: "email",
      name: "Email (SendGrid)",
      description: "Connect SendGrid for automated email campaigns",
      icon: FaEnvelope,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
      borderColor: "border-blue-200 dark:border-blue-800",
      fields: [
        { name: "apiKey", label: "SendGrid API Key", type: "password", required: true },
        { name: "fromEmail", label: "From Email Address", type: "email", required: true },
        { name: "fromName", label: "From Name", type: "text", required: true },
      ],
    },
  ];

  const handleAddIntegration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const credentials: any = {};
    
    const platform = platforms.find(p => p.id === selectedPlatform);
    if (!platform) return;

    platform.fields.forEach(field => {
      credentials[field.name] = formData.get(field.name);
    });

    addIntegrationMutation.mutate({
      platform: selectedPlatform,
      credentials,
      isActive: true,
    });
  };

  const connectedPlatforms = integrations?.filter(integration => integration.isActive) || [];
  const availablePlatforms = platforms.filter(
    platform => !connectedPlatforms.some(integration => integration.platform === platform.id)
  );

  if (isLoading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <Header title="Integrations" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-24 w-full" />
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
        <Header title="Integrations" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in-up">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Platform Integrations</h2>
                <p className="text-muted-foreground">
                  Connect your messaging platforms to start automating communications
                </p>
              </div>
              {availablePlatforms.length > 0 && (
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="nexarion-gradient text-white button-glow">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Integration
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Integration</DialogTitle>
                    </DialogHeader>
                    {!selectedPlatform ? (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Choose a platform to connect:
                        </p>
                        {availablePlatforms.map((platform) => (
                          <Button
                            key={platform.id}
                            variant="outline"
                            className="w-full justify-start p-4 h-auto"
                            onClick={() => setSelectedPlatform(platform.id)}
                          >
                            <platform.icon className={`mr-3 text-lg ${platform.color}`} />
                            <div className="text-left">
                              <p className="font-medium">{platform.name}</p>
                              <p className="text-xs text-muted-foreground">{platform.description}</p>
                            </div>
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <form onSubmit={handleAddIntegration} className="space-y-4">
                        {platforms.find(p => p.id === selectedPlatform)?.fields.map((field) => (
                          <div key={field.name} className="space-y-2">
                            <Label htmlFor={field.name}>
                              {field.label} {field.required && <span className="text-destructive">*</span>}
                            </Label>
                            <Input
                              id={field.name}
                              name={field.name}
                              type={field.type}
                              required={field.required}
                              placeholder={`Enter your ${field.label.toLowerCase()}`}
                            />
                          </div>
                        ))}
                        <div className="flex justify-between pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setSelectedPlatform("")}
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            className="nexarion-gradient text-white"
                            disabled={addIntegrationMutation.isPending}
                          >
                            {addIntegrationMutation.isPending ? "Connecting..." : "Connect"}
                          </Button>
                        </div>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* Connected Integrations */}
            {connectedPlatforms.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Connected Platforms</h3>
                <div className="grid gap-4">
                  {connectedPlatforms.map((integration) => {
                    const platform = platforms.find(p => p.id === integration.platform);
                    if (!platform) return null;

                    return (
                      <Card key={integration.id} className={`${platform.bgColor} border ${platform.borderColor}`}>
                        <CardContent className="flex items-center justify-between p-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                              <platform.icon className={`text-xl ${platform.color}`} />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{platform.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Connected • Active since {new Date(integration.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className={`${platform.color} bg-white dark:bg-gray-800`}>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4 mr-1" />
                              Settings
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteIntegrationMutation.mutate(integration.id)}
                              disabled={deleteIntegrationMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Available Integrations */}
            {availablePlatforms.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Available Integrations</h3>
                <div className="grid gap-4">
                  {availablePlatforms.map((platform) => (
                    <Card key={platform.id} className="border-dashed">
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 ${platform.bgColor} rounded-lg flex items-center justify-center`}>
                            <platform.icon className={`text-xl ${platform.color}`} />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{platform.name}</h4>
                            <p className="text-sm text-muted-foreground">{platform.description}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedPlatform(platform.id);
                            setIsAddDialogOpen(true);
                          }}
                        >
                          <LinkIcon className="w-4 h-4 mr-2" />
                          Connect
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {connectedPlatforms.length === 0 && availablePlatforms.length === 0 && (
              <Card className="text-center py-16">
                <CardContent>
                  <LinkIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    All Platforms Connected
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    You've connected all available platforms. You can manage your integrations
                    or check back later for new platform support.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
