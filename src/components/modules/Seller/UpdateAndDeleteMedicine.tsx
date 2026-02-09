"use client";

import { Medicine } from "@/types/medicine.type";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Roles } from "@/constants/roles";

export default function UpdateAndDeleteMedicine() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Partial<Medicine>>({});
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  async function load() {
    setLoading(true);
    try {
      // get session to identify current user
      const session = await authClient.getSession();
      const userId = session.data?.user?.id;
      const userRole = (session.data?.user as any)?.role;
      setCurrentUserId(userId ?? null);

      const res = await fetch(`${apiBase}/medicines`);
      if (!res.ok) throw new Error("Failed to fetch medicines");
      const data = await res.json();
      const all = (data.result || data) as Medicine[];

      // If current user is a seller, show only their medicines
      if (userRole === Roles.seller && userId) {
        setMedicines(all.filter((m) => m.sellerId === userId));
      } else {
        setMedicines(all);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load medicines");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(m: Medicine) {
    setEditingId(m.id);
    setFormState({ ...m });
  }

  function cancelEdit() {
    setEditingId(null);
    setFormState({});
  }

  const handleUpdate = async (id: string) => {
    try {
      const session = await authClient.getSession();
      if (!session.data?.user) {
        toast.error("Please log in to update");
        return;
      }

      const res = await fetch(`${apiBase}/medicines/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || res.statusText || "Update failed");
      }

      toast.success("Medicine updated");
      cancelEdit();
      load();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    // Ask for confirmation via toast action instead of native confirm
    toast(`Confirm delete for this medicine`, {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const session = await authClient.getSession();
            if (!session.data?.user) {
              toast.error("Please log in to delete");
              return;
            }

            const res = await fetch(`${apiBase}/medicines/${id}`, {
              method: "DELETE",
              credentials: "include",
            });

            if (!res.ok) {
              const err = await res.json().catch(() => null);
              throw new Error(
                err?.message || res.statusText || "Delete failed",
              );
            }

            toast.success("Medicine deleted");
            load();
          } catch (err) {
            console.error(err);
            toast.error(err instanceof Error ? err.message : "Delete failed");
          }
        },
      },
    });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Seller Medicines</CardTitle>
          <CardDescription>
            List of your medicines. Edit or delete items below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading ...</p>
          ) : medicines.length === 0 ? (
            <p>Medicine Not Found!</p>
          ) : (
            <div className="space-y-4">
              {medicines.map((m) => (
                <div key={m.id} className="p-3 border rounded">
                  {editingId === m.id ? (
                    <div className="space-y-2">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={String(formState.name ?? "")}
                          onChange={(e) =>
                            setFormState((s) => ({
                              ...s,
                              name: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label>Price</Label>
                        <Input
                          type="number"
                          value={String(formState.price ?? 0)}
                          onChange={(e) =>
                            setFormState((s) => ({
                              ...s,
                              price: Number(e.target.value),
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          value={String(formState.quantity ?? 0)}
                          onChange={(e) =>
                            setFormState((s) => ({
                              ...s,
                              quantity: Number(e.target.value),
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={Boolean(formState.isActive)}
                          onCheckedChange={(v) =>
                            setFormState((s) => ({
                              ...s,
                              isActive: Boolean(v),
                            }))
                          }
                        />
                        <Label>Active</Label>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleUpdate(m.id)}>Save</Button>
                        <Button onClick={cancelEdit}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{m.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Price: {m.price} • Qty: {m.quantity} • Stock:{" "}
                          {m.stock}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {/** Only allow edit/delete if current user is the owner. session checked on load, but double-check before showing buttons. **/}
                        {m.sellerId === currentUserId ? (
                          <>
                            <Button onClick={() => startEdit(m)}>Edit</Button>
                            <Button onClick={() => handleDelete(m.id)}>
                              Delete
                            </Button>
                          </>
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            Not your medicine
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
