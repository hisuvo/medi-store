import Footer from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/NavigationMnue";
import { userServices } from "@/services/user.service";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userServices.getSession();

  const user = data?.user;

  return (
    <section className="container mx-auto px-2">
      <Navbar user={user} />
      {children}
      <Footer />
    </section>
  );
}
