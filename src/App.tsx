import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import Automations from "@/pages/automations";
import Campaigns from "@/pages/campaigns";
import Integrations from "@/pages/integrations";
import Affiliates from "@/pages/affiliates";
import Analytics from "@/pages/analytics";
import Billing from "@/pages/billing";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/automations" component={Automations} />
      <ProtectedRoute path="/campaigns" component={Campaigns} />
      <ProtectedRoute path="/integrations" component={Integrations} />
      <ProtectedRoute path="/affiliates" component={Affiliates} />
      <ProtectedRoute path="/analytics" component={Analytics} />
      <ProtectedRoute path="/billing" component={Billing} />
      <ProtectedRoute path="/admin" component={AdminDashboard} />
      <Route path="/auth">{() => <AuthPage />}</Route>
      <Route>{() => <NotFound />}</Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
