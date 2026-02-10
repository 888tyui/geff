import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "geffOS - Desktop Environment",
  description: "Enter geffOS — a desktop experience with Solana wallet, games, and memes.",
};

export default function OSLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
