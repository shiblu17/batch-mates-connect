import { motion } from "framer-motion";
import { Users, CreditCard, Clock, CheckCircle, UserCheck } from "lucide-react";
import { MOCK_REGISTRATIONS } from "@/lib/mock-admin-data";

export default function AdminDashboard() {
  const total = MOCK_REGISTRATIONS.length;
  const verified = MOCK_REGISTRATIONS.filter((r) => r.status === "verified").length;
  const pending = MOCK_REGISTRATIONS.filter((r) => r.status === "pending").length;
  const attended = MOCK_REGISTRATIONS.filter((r) => r.attended).length;
  const collection = verified * 500; // assume 500 BDT per registration

  const stats = [
    { label: "মোট রেজিস্ট্রেশন", value: total, icon: Users, color: "bg-primary/10 text-primary" },
    { label: "ভেরিফাইড", value: verified, icon: CheckCircle, color: "bg-secondary/10 text-secondary" },
    { label: "পেন্ডিং", value: pending, icon: Clock, color: "bg-accent/10 text-accent" },
    { label: "মোট কালেকশন", value: `৳${collection}`, icon: CreditCard, color: "bg-primary/10 text-primary" },
    { label: "উপস্থিতি", value: attended, icon: UserCheck, color: "bg-secondary/10 text-secondary" },
  ];

  // Department breakdown
  const deptCount: Record<string, number> = {};
  MOCK_REGISTRATIONS.forEach((r) => {
    deptCount[r.department] = (deptCount[r.department] || 0) + 1;
  });
  const deptList = Object.entries(deptCount).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">ড্যাশবোর্ড</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl bg-card p-4 shadow-card"
          >
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${s.color} mb-3`}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent registrations */}
      <div className="rounded-xl bg-card shadow-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-display font-semibold">সাম্প্রতিক রেজিস্ট্রেশন</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left p-3 font-semibold">নাম</th>
                <th className="text-left p-3 font-semibold">রোল</th>
                <th className="text-left p-3 font-semibold hidden md:table-cell">ডিপার্টমেন্ট</th>
                <th className="text-left p-3 font-semibold">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_REGISTRATIONS.slice(0, 5).map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium">{r.name}</td>
                  <td className="p-3">{r.roll}</td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground truncate max-w-[200px]">{r.department}</td>
                  <td className="p-3">
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Department breakdown */}
      <div className="mt-6 rounded-xl bg-card shadow-card p-4">
        <h2 className="font-display font-semibold mb-4">ডিপার্টমেন্ট অনুযায়ী</h2>
        <div className="space-y-2">
          {deptList.map(([dept, count]) => (
            <div key={dept} className="flex items-center gap-3">
              <span className="text-sm flex-1 truncate">{dept}</span>
              <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary" style={{ width: `${(count / total) * 100}%` }} />
              </div>
              <span className="text-sm font-semibold w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    pending: "bg-accent/10 text-accent",
    verified: "bg-secondary/10 text-secondary",
    rejected: "bg-destructive/10 text-destructive",
  };
  const labels: Record<string, string> = {
    pending: "পেন্ডিং",
    verified: "ভেরিফাইড",
    rejected: "রিজেক্টেড",
  };
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${config[status]}`}>
      {labels[status]}
    </span>
  );
}
