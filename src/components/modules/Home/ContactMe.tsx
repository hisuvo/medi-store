"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactMe() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    // 👉 Replace with your API route or email service
    await new Promise((r) => setTimeout(r, 1000));

    setLoading(false);

    toast.success("Message sent! We’ll contact you shortly.");

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Info side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Contact Medi‑Store</h2>
          <p className="text-muted-foreground">
            Questions about prescriptions, orders, or support? Reach out and our
            pharmacy team will help you quickly.
          </p>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123‑4567</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <span>support@medistore.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4" />
              <span>123 Health St, City, Country</span>
            </div>
          </div>
        </motion.div>

        {/* Form side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                We typically reply within 24 hours.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@email.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full gap-2"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
