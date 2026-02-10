"use client";

import Footer from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/NavigationMnue";
import Newsletter from "@/components/shared/Newsletter";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container mx-auto px-2">
      <Navbar />
      {children}
      <Newsletter />
      <Footer />
    </section>
  );
}
