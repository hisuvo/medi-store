export default function DashboardLayout({
  admin,
  customer,
  seller,
}: {
  admin: React.ReactNode;
  customer: React.ReactNode;
  seller: React.ReactNode;
}) {
  return (
    <div className="p-4">
      <nav>
        <h2 className="text-4xl">This Dashboard Header</h2>
      </nav>
      <main className="container mx-auto">
        {admin}
        {seller}
        {customer}
      </main>
    </div>
  );
}
