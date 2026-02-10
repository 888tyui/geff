"use client";

import dynamic from "next/dynamic";

const GeffOSDesktop = dynamic(() => import("./GeffOSDesktop"), { ssr: false });

export default function OSPage() {
  return <GeffOSDesktop />;
}
