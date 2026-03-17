import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";

interface LeaderboardItemProps {
  rank: number;
  name: string;
  total: number;
  registered: number;
}

const rankColors: Record<number, string> = {
  1: "bg-accent text-accent-foreground",
  2: "bg-muted text-foreground",
  3: "bg-primary/10 text-primary",
};

export default function LeaderboardCard({ rank, name, total, registered }: LeaderboardItemProps) {
  const pct = Math.round((registered / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: rank * 0.08 }}
      className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display font-bold text-sm ${
          rankColors[rank] ?? "bg-muted text-muted-foreground"
        }`}
      >
        {rank <= 3 ? (
          rank === 1 ? <Trophy className="h-5 w-5" /> : <Medal className="h-5 w-5" />
        ) : (
          rank
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-sm truncate">{name}</p>
        <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-secondary"
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: rank * 0.08 }}
          />
        </div>
      </div>

      <span className="font-display font-bold text-sm text-secondary shrink-0">{pct}%</span>
    </motion.div>
  );
}
