import { Navbar } from "@/components/layouts/navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container mx-auto border-3 border-yellow-200">
      <Navbar />
      {children}
    </section>
  );
}
