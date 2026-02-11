import { medicineServices } from "@/services/medicine.service";
import MedicineCard from "./MedicineCard";
import { Medicine } from "@/types/medicine.type";
import PageHeader from "@/components/shared/PageHeader";
import Link from "next/link";

export default async function NewMedicineList() {
  const { data: medicines } = await medicineServices.getMedicine(
    {
      isActive: true,
      search: "",
    },
    {
      cache: "no-store",
    },
  );
  return (
    <div>
      <PageHeader
        title="New Medicine"
        // description="Here show all new post medicine"
        action={<Link href={"/shop"}>Add Medicine</Link>}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medicines && medicines.length > 0 ? (
          medicines
            .slice(0, 3)
            .map((medicine: Medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))
        ) : (
          <p>No medicines available</p>
        )}
      </div>
    </div>
  );
}
