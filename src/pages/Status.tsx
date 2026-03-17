import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Clock, CheckCircle, XCircle, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

type Status = "idle" | "pending" | "verified" | "rejected" | "not_found";

const statusConfig: Record<Exclude<Status, "idle">, { icon: React.ElementType; label: string; color: string; bg: string }> = {
  pending: { icon: Clock, label: "পেমেন্ট পেন্ডিং", color: "text-accent", bg: "bg-accent/10" },
  verified: { icon: CheckCircle, label: "পেমেন্ট ভেরিফাইড ✅", color: "text-secondary", bg: "bg-secondary/10" },
  rejected: { icon: XCircle, label: "পেমেন্ট রিজেক্টেড", color: "text-destructive", bg: "bg-destructive/10" },
  not_found: { icon: Search, label: "এই রোলে কোনো রেজিস্ট্রেশন পাওয়া যায়নি", color: "text-muted-foreground", bg: "bg-muted" },
};

// Mock data for demo
const MOCK_DATA: Record<string, { name: string; dept: string; hall: string; status: "pending" | "verified" | "rejected" }> = {
  "1234": { name: "রাকিব হাসান", dept: "কম্পিউটার সায়েন্স ও ইঞ্জিনিয়ারিং", hall: "আল-বেরুনী হল", status: "verified" },
  "5678": { name: "নুসরাত জাহান", dept: "ফার্মেসি", hall: "প্রীতিলতা হল", status: "pending" },
};

export default function StatusPage() {
  const [roll, setRoll] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [userData, setUserData] = useState<typeof MOCK_DATA["1234"] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const data = MOCK_DATA[roll];
    if (data) {
      setUserData(data);
      setStatus(data.status);
    } else {
      setUserData(null);
      setStatus("not_found");
    }
  };

  return (
    <div className="container max-w-lg py-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold mb-1">স্ট্যাটাস চেক</h1>
        <p className="text-muted-foreground text-sm mb-6">তোমার রোল নম্বর দিয়ে রেজিস্ট্রেশন স্ট্যাটাস দেখো</p>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              placeholder="রোল নম্বর লিখো"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm transition-transform hover:scale-105"
          >
            খোঁজো
          </button>
        </form>

        {status !== "idle" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {status !== "not_found" && userData ? (
              <div className="space-y-4">
                {/* Status badge */}
                <div className={`flex items-center gap-3 p-4 rounded-xl ${statusConfig[status].bg}`}>
                  {(() => {
                    const Icon = statusConfig[status].icon;
                    return <Icon className={`h-6 w-6 ${statusConfig[status].color}`} />;
                  })()}
                  <span className={`font-display font-bold ${statusConfig[status].color}`}>
                    {statusConfig[status].label}
                  </span>
                </div>

                {/* Info card */}
                <div className="rounded-2xl bg-surface p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">নাম</span>
                    <span className="font-semibold">{userData.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">রোল</span>
                    <span className="font-semibold">{roll}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ডিপার্টমেন্ট</span>
                    <span className="font-semibold text-right">{userData.dept}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">হল</span>
                    <span className="font-semibold text-right">{userData.hall}</span>
                  </div>
                </div>

                {/* ID Card preview (only if verified) */}
                {status === "verified" && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="rounded-2xl bg-primary p-6 text-primary-foreground text-center space-y-4"
                  >
                    <p className="text-xs uppercase tracking-widest opacity-70">ডিজিটাল আইডি কার্ড</p>
                    <h3 className="font-display text-xl font-extrabold">JU-52 ব্যাচ ডে</h3>
                    <div className="mx-auto w-fit bg-card rounded-xl p-3">
                      <QRCodeSVG value={`JU52-${roll}`} size={120} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-lg">{userData.name}</p>
                      <p className="text-sm opacity-80">{userData.dept}</p>
                      <p className="text-xs opacity-60">Roll: {roll}</p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-accent-foreground font-display font-bold text-sm transition-transform hover:scale-105">
                      <Download className="h-4 w-4" />
                      ডাউনলোড করো
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className={`flex items-center gap-3 p-4 rounded-xl ${statusConfig.not_found.bg}`}>
                <Search className="h-6 w-6 text-muted-foreground" />
                <span className="font-display font-semibold text-sm text-muted-foreground">
                  {statusConfig.not_found.label}
                </span>
              </div>
            )}
          </motion.div>
        )}

        <p className="mt-6 text-xs text-muted-foreground text-center">
          💡 ডেমো: রোল <strong>1234</strong> (ভেরিফাইড) বা <strong>5678</strong> (পেন্ডিং) দিয়ে চেষ্টা করো
        </p>
      </motion.div>
    </div>
  );
}
