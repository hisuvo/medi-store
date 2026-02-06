import ShopClient from "@/components/modules/Shop/ShopClient";

import { medicineServices } from "@/services/medicine.service";

async function ShopPage() {
  const { data } = await medicineServices.getMedicine();
  return (
    <div>
      <ShopClient medicines={data} />
    </div>
  );
}

export default ShopPage;
