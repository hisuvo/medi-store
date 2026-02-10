"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Pencil, Plus } from "lucide-react";

/*
  ===============================================
  Admin → Categories → Manage Categories Page
  Next.js + shadcn/ui + Tailwind
  ===============================================

  Features:
  ✅ Read all categories
  ✅ Create category
  ✅ Update category
  ✅ Delete category
  ✅ Search
  ✅ Image preview
  ✅ Works client-side (no SSR issues)

  Replace mock state with API later:
  - GET /api/categories
  - POST /api/categories
  - PATCH /api/categories/:id
  - DELETE /api/categories/:id
*/

// ----------------------------
// Types
// ----------------------------

type Category = {
  id: number;
  name: string;
  description: string;
  image?: string;
};

// ----------------------------
// Mock data
// ----------------------------

const initialData: Category[] = [
  {
    id: 1,
    name: "Medicines",
    description: "All general medicines",
    image: "",
  },
  {
    id: 2,
    name: "Vitamins",
    description: "Health supplements",
    image: "",
  },
];

export default function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>(initialData);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState<Category>({
    id: 0,
    name: "",
    description: "",
    image: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  // ----------------------------
  // CRUD
  // ----------------------------

  const handleSave = () => {
    if (!form.name.trim()) return;

    if (editingId) {
      // update
      setCategories((prev) =>
        prev.map((c) => (c.id === editingId ? { ...form, id: editingId } : c)),
      );
    } else {
      // create
      setCategories((prev) => [...prev, { ...form, id: Date.now() }]);
    }

    resetForm();
  };

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEdit = (cat: Category) => {
    setForm(cat);
    setEditingId(cat.id);
    setOpen(true);
  };

  const resetForm = () => {
    setForm({ id: 0, name: "", description: "", image: "" });
    setEditingId(null);
    setOpen(false);
  };

  // ----------------------------
  // Filter
  // ----------------------------

  const filtered = useMemo(() => {
    return categories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

  // ----------------------------
  // UI
  // ----------------------------

  return (
    <Card>
      <div className="min-h-scree p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Manage Categories</h1>
              <p className="text-muted-foreground">
                Create, update and delete medicines categories
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Add Category
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingId ? "Update Category" : "Create Category"}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Input
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={form.image}
                      onChange={(e) =>
                        setForm({ ...form, image: e.target.value })
                      }
                    />
                  </div>

                  <Button className="w-full" onClick={handleSave}>
                    {editingId ? "Update" : "Create"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <Input
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cat, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: i * 0.3 }}
              >
                <Card key={cat.id} className="rounded-2xl shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{cat.name}</CardTitle>
                      <Badge>{cat.id}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="h-24 w-full bg-muted rounded-xl flex items-center justify-center overflow-hidden">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          No Image
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {cat.description}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEdit(cat)}
                      >
                        <Pencil className="w-4 h-4 mr-1" /> Edit
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDelete(cat.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <Card className="text-center p-10 text-muted-foreground">
              No categories found
            </Card>
          )}
        </div>
      </div>
    </Card>
  );
}
