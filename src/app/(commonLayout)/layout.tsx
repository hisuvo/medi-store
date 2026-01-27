import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        <Navbar />
      </div>
      {children}
      <div>
        <Footer />
      </div>
    </section>
  );
}
