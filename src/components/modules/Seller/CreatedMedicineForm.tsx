"use client";

import { Field, useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// -------------------- Image upload here  ----------------
async function uploadToImageBB(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=bbe790bc716712ed3b28cb69b4de06f6`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();
  return data.data.url as string;
}

export default function CreateMedicineForm() {
  const [categories, setCategories] = useState<any[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        );
        if (!res.ok) throw new Error("Failed to fetch categories");
        const { result } = await res.json();

        setCategories(result);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      stock: 0,
      manufacturer: "",
      image: "",
      categoryId: "",
      isActive: true,
    },

    onSubmit: async ({ value }) => {
      // চিত্র আপলোড হয়েছে কিনা যাচাই করুন
      if (!value.image) {
        toast.error("Please upload an image first ⚠️");
        return;
      }

      setIsSubmitting(true);

      try {
        // সেশন যাচাই করুন
        const session = await authClient.getSession();
        if (!session.data?.user) {
          toast.error("Please log in");
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/medicines`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
          },
        );

        if (res.status === 401) {
          toast.error("Your session has expired. Please log in again 🔐");
          return;
        }

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || `API Error: ${res.statusText}`);
        }

        toast.success("ওষুধ সফলভাবে তৈরি হয়েছে ✅");
        form.reset();
        setPreview(null);
      } catch (error) {
        console.error("Error creating medicine:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "An error occurred while creating the medicine",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Medicine</CardTitle>
        <CardDescription>
          Enter all information below to create medicine
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Name */}
            <form.Field name="name">
              {(field) => (
                <div>
                  <FieldLabel>Medicine Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => (
                <div>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            {/* Price */}
            <form.Field name="price">
              {(field) => (
                <div>
                  <FieldLabel>Price</FieldLabel>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </div>
              )}
            </form.Field>

            {/* Image */}
            <form.Field name="image">
              {(field) => (
                <div>
                  <Label>Image {field.state.value && "✅"}</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    disabled={isUploading || isSubmitting}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      if (!file.type.startsWith("image/")) {
                        toast.error("Please upload an image file only");
                        return;
                      }

                      try {
                        setIsUploading(true);
                        setPreview(URL.createObjectURL(file));
                        const url = await uploadToImageBB(file);
                        field.handleChange(url);
                        toast.success("Image uploade success");
                      } catch (error) {
                        toast.error("Image upload failed");
                        console.error("Image upload error:", error);
                        setPreview(null);
                      } finally {
                        setIsUploading(false);
                      }
                    }}
                  />

                  {isUploading && (
                    <p className="mt-2 text-sm text-blue-500">
                      uploading here... ⏳
                    </p>
                  )}

                  {preview && (
                    <img
                      src={preview}
                      className="mt-3 h-28 w-28 rounded border object-cover"
                    />
                  )}
                </div>
              )}
            </form.Field>

            {/* Category ID */}
            <form.Field name="categoryId">
              {(field) => (
                <div>
                  <FieldLabel>Category</FieldLabel>
                  <Select onValueChange={field.handleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>

            {/* Quantity */}
            <form.Field name="quantity">
              {(field) => (
                <div>
                  <FieldLabel>Quantity</FieldLabel>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </div>
              )}
            </form.Field>

            {/* Stock */}
            <form.Field name="stock">
              {(field) => (
                <div>
                  <FieldLabel>Stock</FieldLabel>
                  <Input
                    type="number"
                    value={field.state.value ?? 0}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </div>
              )}
            </form.Field>

            {/* Manufacturer */}
            <form.Field name="manufacturer">
              {(field) => (
                <div>
                  <FieldLabel>Manufacturer</FieldLabel>
                  <Input
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            {/* Is Active */}
            <form.Field name="isActive">
              {(field) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.state.value}
                    onCheckedChange={(val) => field.handleChange(Boolean(val))}
                  />
                  <Label>Active</Label>
                </div>
              )}
            </form.Field>

            <Button
              type="submit"
              disabled={isUploading || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Createing... ⏳" : "Create Medicine"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
