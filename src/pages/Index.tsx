import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";
import LeaderboardCard from "@/components/LeaderboardCard";
import { MOCK_DEPT_LEADERBOARD, MOCK_HALL_LEADERBOARD } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, hsl(37 90% 43% / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(160 84% 30% / 0.2) 0%, transparent 50%)"
          }} />
        </div>
        <div className="container relative py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-sm font-medium tracking-widest uppercase text-primary-foreground/70 mb-3">
              জাহাঙ্গীরনগর বিশ্ববিদ্যালয়
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-primary-foreground leading-tight">
              JU-52
            </h1>
            <p className="font-display text-xl md:text-2xl font-bold text-accent mt-2">
              ব্যাচ ডে ২০২৫
            </p>
            <p className="mt-4 text-primary-foreground/80 max-w-md mx-auto text-sm md:text-base">
              ৪৮তম ব্যাচের সবচেয়ে বড় পুনর্মিলনী। রেজিস্ট্রেশন করো, স্মৃতি শেয়ার করো, একসাথে উদযাপন করো।
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-accent-foreground font-display font-bold text-base transition-transform hover:scale-105 shadow-lg"
              >
                Register Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/status"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-display font-semibold text-base hover:bg-primary-foreground/10 transition-colors"
              >
                Check Status
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Info */}
      <section className="bg-surface py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: CalendarDays, label: "তারিখ", value: "শীঘ্রই জানানো হবে" },
              { icon: MapPin, label: "স্থান", value: "জাহাঙ্গীরনগর ক্যাম্পাস" },
              { icon: Users, label: "রেজিস্টার্ড", value: "৮৫০+" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-xl bg-card p-5 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                  <p className="font-display font-bold text-base">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold">🏆 লিডারবোর্ড</h2>
            <Link to="/leaderboard" className="text-sm font-medium text-primary hover:underline">
              সব দেখুন →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">ডিপার্টমেন্ট</h3>
              <div className="space-y-3">
                {MOCK_DEPT_LEADERBOARD.slice(0, 3).map((d, i) => (
                  <LeaderboardCard key={d.name} rank={i + 1} {...d} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">হল</h3>
              <div className="space-y-3">
                {MOCK_HALL_LEADERBOARD.slice(0, 3).map((h, i) => (
                  <LeaderboardCard key={h.name} rank={i + 1} {...h} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
