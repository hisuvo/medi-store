"use client";

import Footer from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/NavigationMnue";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container mx-auto px-2">
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
