import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Lock, Mail, UserPlus } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const checkAdminAndRedirect = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      toast({
        title: "অ্যাক্সেস নিষিদ্ধ",
        description: "আপনার অ্যাডমিন অ্যাক্সেস নেই। সাইনআপের পর অ্যাডমিন রোল অ্যাসাইন করতে হবে।",
        variant: "destructive",
      });
      return false;
    }

    navigate("/admin");
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "লগইন ব্যর্থ", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    await checkAdminAndRedirect();
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে", variant: "destructive" });
      return;
    }
    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast({ title: "সাইনআপ ব্যর্থ", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    toast({
      title: "অ্যাকাউন্ট তৈরি হয়েছে!",
      description: "এখন লগইন করুন। অ্যাডমিন রোল অ্যাসাইন করার পর অ্যাক্সেস পাবেন।",
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="font-display text-2xl">অ্যাডমিন প্যানেল</CardTitle>
          <CardDescription>JU-52 অ্যাডমিন প্যানেলে প্রবেশ করুন</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">লগইন</TabsTrigger>
              <TabsTrigger value="signup">সাইনআপ</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">ইমেইল</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="login-email" type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">পাসওয়ার্ড</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="login-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9" required />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "লগইন হচ্ছে..." : "লগইন"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">ইমেইল</Label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-email" type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9" required minLength={6} />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "সাইনআপ হচ্ছে..." : "সাইনআপ করুন"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  সাইনআপের পর অ্যাডমিন রোল অ্যাসাইন করতে হবে।
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
