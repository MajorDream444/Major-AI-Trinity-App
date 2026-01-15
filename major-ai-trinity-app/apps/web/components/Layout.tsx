import Link from "next/link";
import React from "react";

export function Layout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="font-semibold tracking-wide">Major AI Trinity</div>
        <nav className="flex gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/agent-chat">Agent Chat</Link>
          <Link href="/journal">Journal</Link>
        </nav>
      </header>
      <main className="px-6 py-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">{title}</h1>
        {children}
      </main>
    </div>
  );
}
