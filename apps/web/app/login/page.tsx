"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("admin@kek.demo");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      router.push(session.user.role === "admin" ? "/executive" : "/portal");
    }
  }, [router, session?.user?.role, status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: email,
        password
      });
      if (!res || !res.ok) {
        setError("Invalid credentials. Try the demo accounts shown below.");
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-4 py-10">
        <div className="text-sm text-[#111789]/70">
          Demo accounts:{" "}
          <Link href="/" className="underline">
            Back to home
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-5 rounded-3xl border border-black/5 overflow-hidden"
        >
          <div className="bg-[#111789] text-white p-6">
            <h1 className="text-2xl font-semibold">Client Login</h1>
            <p className="text-white/80 text-sm mt-1">Demo NextAuth credentials (admin + client).</p>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#111789]">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3"
                placeholder="admin@kek.demo"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111789]">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#D4AF37] text-[#111789] py-3 font-semibold hover:brightness-105 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "LOGIN"}
            </button>

            <div className="text-xs text-[#111789]/60">
              Admin: <span className="font-mono">admin@kek.demo</span> / <span className="font-mono">admin123</span>
              <br />
              Client: <span className="font-mono">client@kek.demo</span> / <span className="font-mono">client123</span>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

