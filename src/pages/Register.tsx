import { useState } from "react";
import { motion } from "framer-motion";
import { DEPARTMENTS, HALLS, TSHIRT_SIZES, PAYMENT_NUMBERS } from "@/lib/constants";
import { CheckCircle, Upload, Phone, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    roll: "",
    phone: "",
    department: "",
    hall: "",
    tshirtSize: "",
    paymentMethod: "bkash" as "bkash" | "nagad",
    txId: "",
    senderNumber: "",
  });

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "ছবির সাইজ ৫MB এর বেশি হতে পারবে না", variant: "destructive" });
      return;
    }
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    const rollNum = parseInt(form.roll);
    if (isNaN(rollNum) || rollNum < 1 || rollNum > 9999) {
      toast({ title: "সঠিক রোল নম্বর দিন", variant: "destructive" });
      return;
    }
    if (!form.department || !form.hall || !form.tshirtSize) {
      toast({ title: "সব ফিল্ড পূরণ করুন", variant: "destructive" });
      return;
    }
    if (!form.txId || !form.senderNumber) {
      toast({ title: "পেমেন্ট তথ্য দিন", variant: "destructive" });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pb-20 md:pb-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8"
        >
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10">
            <CheckCircle className="h-10 w-10 text-secondary" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">রেজিস্ট্রেশন সম্পন্ন! 🎉</h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            তোমার পেমেন্ট ভেরিফাই হলে আইডি কার্ড ডাউনলোড করতে পারবে। <br />
            <strong>রোল: {form.roll}</strong> দিয়ে স্ট্যাটাস চেক করো।
          </p>
        </motion.div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition";
  const labelClass = "block text-sm font-semibold mb-1.5";

  return (
    <div className="container max-w-lg py-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold mb-1">রেজিস্ট্রেশন</h1>
        <p className="text-muted-foreground text-sm mb-6">ব্যাচ ডে-তে যোগ দিতে নিচের ফর্ম পূরণ করো</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Personal Info */}
          <div className="rounded-2xl bg-surface p-5 space-y-4">
            <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">ব্যক্তিগত তথ্য</h3>
            <div>
              <label className={labelClass}>নাম *</label>
              <input className={inputClass} placeholder="তোমার পুরো নাম" required value={form.name} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>রোল নম্বর *</label>
              <input className={inputClass} placeholder="যেমন: 1234" required type="number" value={form.roll} onChange={(e) => set("roll", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>ফোন নম্বর *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input className={`${inputClass} pl-10`} placeholder="01XXXXXXXXX" required value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelClass}>ডিপার্টমেন্ট *</label>
              <select className={inputClass} required value={form.department} onChange={(e) => set("department", e.target.value)}>
                <option value="">সিলেক্ট করো</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>হল *</label>
              <select className={inputClass} required value={form.hall} onChange={(e) => set("hall", e.target.value)}>
                <option value="">সিলেক্ট করো</option>
                {HALLS.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>টি-শার্ট সাইজ *</label>
              <div className="flex gap-2 flex-wrap">
                {TSHIRT_SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set("tshirtSize", s)}
                    className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                      form.tshirtSize === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-input bg-card hover:bg-muted"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="rounded-2xl bg-surface p-5 space-y-4">
            <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">ছবি আপলোড</h3>
            <label className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-input p-6 cursor-pointer hover:border-primary/40 transition-colors">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="h-32 w-32 rounded-xl object-cover" />
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">ছবি সিলেক্ট করো (Max 5MB)</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            </label>
          </div>

          {/* Payment */}
          <div className="rounded-2xl bg-surface p-5 space-y-4">
            <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> পেমেন্ট তথ্য
            </h3>
            <div className="flex gap-2">
              {(["bkash", "nagad"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => set("paymentMethod", m)}
                  className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${
                    form.paymentMethod === m
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-input bg-card hover:bg-muted"
                  }`}
                >
                  {m === "bkash" ? "বিকাশ" : "নগদ"}
                </button>
              ))}
            </div>
            <div className="rounded-xl bg-card p-4 border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">টাকা পাঠাও এই নম্বরে</p>
              <p className="font-display font-bold text-lg text-primary">
                {PAYMENT_NUMBERS[form.paymentMethod]}
              </p>
            </div>
            <div>
              <label className={labelClass}>ট্রানজেকশন আইডি (TxID) *</label>
              <input className={inputClass} placeholder="যেমন: 9A3F2K1L0P" required value={form.txId} onChange={(e) => set("txId", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>যে নম্বর থেকে পাঠিয়েছো *</label>
              <input className={inputClass} placeholder="01XXXXXXXXX" required value={form.senderNumber} onChange={(e) => set("senderNumber", e.target.value)} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-display font-bold text-base transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            সাবমিট করো 🚀
          </button>
        </form>
      </motion.div>
    </div>
  );
}
