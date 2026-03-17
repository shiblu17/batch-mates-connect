import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaderboardCard from "@/components/LeaderboardCard";
import { MOCK_DEPT_LEADERBOARD, MOCK_HALL_LEADERBOARD } from "@/lib/constants";

export default function LeaderboardPage() {
  return (
    <div className="container py-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold mb-1">🏆 লিডারবোর্ড</h1>
        <p className="text-muted-foreground text-sm mb-6">কোন হল বা ডিপার্টমেন্ট এগিয়ে আছে দেখো!</p>

        <Tabs defaultValue="department">
          <TabsList className="w-full mb-6 bg-surface">
            <TabsTrigger value="department" className="flex-1 font-display font-semibold">ডিপার্টমেন্ট</TabsTrigger>
            <TabsTrigger value="hall" className="flex-1 font-display font-semibold">হল</TabsTrigger>
          </TabsList>

          <TabsContent value="department">
            <div className="space-y-3">
              {MOCK_DEPT_LEADERBOARD.map((d, i) => (
                <LeaderboardCard key={d.name} rank={i + 1} {...d} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hall">
            <div className="space-y-3">
              {MOCK_HALL_LEADERBOARD.map((h, i) => (
                <LeaderboardCard key={h.name} rank={i + 1} {...h} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
