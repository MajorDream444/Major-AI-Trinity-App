import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { login, signup } from "../lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    setErr(null);
    try {
      if (mode === "login") await login(email, password);
      else await signup(email, password);
      window.location.href = "/dashboard";
    } catch (error: unknown) {
      const err = error as { message?: string };
      setErr(err?.message || "Auth error");
    }
  }

  return (
    <Layout title="Login">
      <div className="max-w-md rounded-2xl border border-white/10 p-4">
        <div className="flex gap-2 mb-4">
          <button
            className={`px-3 py-2 rounded-xl border ${
              mode === "login" ? "border-white/40" : "border-white/15 hover:border-white/30"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`px-3 py-2 rounded-xl border ${
              mode === "signup" ? "border-white/40" : "border-white/15 hover:border-white/30"
            }`}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>

        <label className="text-sm text-white/70">Email</label>
        <input
          className="w-full mt-1 mb-3 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm text-white/70">Password</label>
        <input
          type="password"
          className="w-full mt-1 mb-3 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {err ? <div className="text-sm text-red-400 mb-3">{err}</div> : null}

        <button
          className="px-4 py-2 rounded-xl border border-white/15 hover:border-white/30 w-full"
          onClick={submit}
        >
          {mode === "login" ? "Login" : "Create account"}
        </button>

        <div className="text-xs text-white/50 mt-3">
          Note: enable Email/Password provider in Firebase Auth console.
        </div>
      </div>
    </Layout>
  );
}
