import ShopClient from "@/components/modules/Shop/ShopClient";

import { medicineServices } from "@/services/medicine.service";

export const dynamic = "force-dynamic";

async function ShopPage() {
  const { data } = await medicineServices.getMedicine();
  return (
    <div>
      <ShopClient medicines={data} />
      <h2>This is shop store</h2>
    </div>
  );
}

export default ShopPage;
