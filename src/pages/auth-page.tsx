import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Zap, Bot, MessageSquare, TrendingUp, Users } from "lucide-react";

// Form schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  referralCode: z.string().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [referralCode, setReferralCode] = useState("");

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      referralCode: "",
    },
  });

  // Check for referral code in URL and redirect if already authenticated
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get("ref");
    if (refCode) {
      setReferralCode(refCode);
      registerForm.setValue("referralCode", refCode);
      setIsLogin(false); // Switch to register mode for referrals
    }

    if (user) {
      setLocation("/");
    }
  }, [user, setLocation, registerForm]);

  const onLoginSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: RegisterForm) => {
    registerMutation.mutate(data as any);
  };

  const features = [
    {
      icon: Bot,
      title: "Smart Automation",
      description: "Automate WhatsApp, Instagram, and Email communications with AI-powered responses"
    },
    {
      icon: MessageSquare,
      title: "Multi-Platform",
      description: "Connect and manage all your messaging platforms from one unified dashboard"
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Track performance, response rates, and conversions with detailed analytics"
    },
    {
      icon: Users,
      title: "Affiliate Program",
      description: "Earn 20% commission for every customer you refer to our platform"
    }
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Column - Forms */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 nexarion-gradient rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold text-foreground">Nexarion AI</span>
            </div>
            <p className="text-muted-foreground">
              {isLogin ? "Welcome back" : "Create your account"}
            </p>
          </div>

          {referralCode && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
              <p className="text-sm text-accent font-medium">
                🎉 You've been referred! Sign up to get started with Nexarion AI
              </p>
            </div>
          )}

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                {isLogin ? "Sign In" : "Create Account"}
              </CardTitle>
              <CardDescription className="text-center">
                {isLogin 
                  ? "Enter your credentials to access your dashboard" 
                  : "Start automating your communications today"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLogin ? (
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...loginForm.register("email")}
                      className={loginForm.formState.errors.email ? "border-destructive" : ""}
                    />
                    {loginForm.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {loginForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Your password"
                      {...loginForm.register("password")}
                      className={loginForm.formState.errors.password ? "border-destructive" : ""}
                    />
                    {loginForm.formState.errors.password && (
                      <p className="text-sm text-destructive">
                        {loginForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full nexarion-gradient text-white button-glow"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="johndoe"
                      {...registerForm.register("username")}
                      className={registerForm.formState.errors.username ? "border-destructive" : ""}
                    />
                    {registerForm.formState.errors.username && (
                      <p className="text-sm text-destructive">
                        {registerForm.formState.errors.username.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...registerForm.register("email")}
                      className={registerForm.formState.errors.email ? "border-destructive" : ""}
                    />
                    {registerForm.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {registerForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      {...registerForm.register("password")}
                      className={registerForm.formState.errors.password ? "border-destructive" : ""}
                    />
                    {registerForm.formState.errors.password && (
                      <p className="text-sm text-destructive">
                        {registerForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>
                  {referralCode && (
                    <div className="space-y-2">
                      <Label htmlFor="referralCode">Referral Code</Label>
                      <Input
                        id="referralCode"
                        placeholder="Referral code"
                        value={referralCode}
                        {...registerForm.register("referralCode")}
                        readOnly
                      />
                    </div>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full nexarion-gradient text-white button-glow"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              )}

              <Separator />

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Column - Hero Section */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary/10 via-purple-500/10 to-accent/10 relative overflow-hidden">
        <div className="flex flex-col justify-center p-12 relative z-10">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Automate Your Communications
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Connect WhatsApp, Instagram, and Email in one powerful platform. 
              Automate responses, grow your audience, and earn with our affiliate program.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 nexarion-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-20 h-20 bg-primary rounded-full animate-pulse-subtle"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-accent rounded-full animate-pulse-subtle" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 right-5 w-12 h-12 bg-purple-500 rounded-full animate-pulse-subtle" style={{ animationDelay: "2s" }}></div>
        </div>
      </div>
    </div>
  );
}
