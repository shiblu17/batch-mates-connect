import { motion } from "framer-motion";

const MOCK_PHOTOS = [
  { name: "রাকিব হাসান", dept: "CSE", color: "from-primary to-accent" },
  { name: "নুসরাত জাহান", dept: "ফার্মেসি", color: "from-secondary to-primary" },
  { name: "তানভীর আহমেদ", dept: "অর্থনীতি", color: "from-accent to-secondary" },
  { name: "ফাতেমা আক্তার", dept: "ইংরেজি", color: "from-primary to-secondary" },
  { name: "মোস্তাফিজ", dept: "গণিত", color: "from-secondary to-accent" },
  { name: "সুমাইয়া রহমান", dept: "বাংলা", color: "from-accent to-primary" },
  { name: "আরিফুল ইসলাম", dept: "পদার্থবিদ্যা", color: "from-primary to-accent" },
  { name: "তাসনিম ফেরদৌস", dept: "রসায়ন", color: "from-secondary to-primary" },
  { name: "রিফাত হাসান", dept: "IT", color: "from-accent to-secondary" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

export default function GalleryPage() {
  return (
    <div className="container py-6 md:py-8 pb-24 md:pb-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold mb-1">📸 মেমোরি গ্যালারি</h1>
        <p className="text-muted-foreground text-sm mb-6">৪৮তম ব্যাচের স্মৃতিগুলো</p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="columns-2 sm:columns-3 gap-3 space-y-3"
      >
        {MOCK_PHOTOS.map((photo, i) => {
          const height = [180, 220, 260, 200, 240][i % 5];
          return (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="break-inside-avoid rounded-xl overflow-hidden shadow-card group cursor-pointer"
            >
              <div
                className={`bg-gradient-to-br ${photo.color} flex items-center justify-center text-4xl transition-transform group-hover:scale-105`}
                style={{ height }}
              >
                🎓
              </div>
              <div className="bg-card p-3">
                <p className="font-display font-semibold text-sm">{photo.name}</p>
                <p className="text-xs text-muted-foreground">{photo.dept}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        রেজিস্ট্রেশনের সময় আপলোড করা ছবি এখানে দেখা যাবে
      </p>
    </div>
  );
}
