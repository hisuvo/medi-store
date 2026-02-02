import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export default function Footer() {
  return (
    <footer className="bg-background">
      <Card className="rounded-none border-0 border-t">
        <CardContent className="py-4">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <span className="text-primary text-3xl">＋</span>
                Medi-store
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Since 2018 we have been delivering excellence in product
                development, support & updates for frictionless shopping
                experiences.
              </p>
            </div>

            {/* Customer */}
            <div className="space-y-3">
              <h4 className="font-semibold">Customer</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#">Help Center</Link>
                </li>
                <li>
                  <Link href="#">My Account</Link>
                </li>
                <li>
                  <Link href="#">Track My Order</Link>
                </li>
                <li>
                  <Link href="#">Return Policy</Link>
                </li>
                <li>
                  <Link href="#">Gift Cards</Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div className="space-y-3">
              <h4 className="font-semibold">About Us</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#">Company Info</Link>
                </li>
                <li>
                  <Link href="#">Press Releases</Link>
                </li>
                <li>
                  <Link href="#">Careers</Link>
                </li>
                <li>
                  <Link href="#">Reviews</Link>
                </li>
                <li>
                  <Link href="#">Investor Relations</Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#">Search</Link>
                </li>
                <li>
                  <Link href="#">Become a Reseller</Link>
                </li>
                <li>
                  <Link href="#">About Us</Link>
                </li>
                <li>
                  <Link href="#">Contact Us</Link>
                </li>
                <li>
                  <Link href="#">Terms of Service</Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <h4 className="font-semibold">Contact</h4>
              <p className="text-sm text-muted-foreground">
                1505 E Alameda Pkwy, Aurora, CO 80012, USA
              </p>
              <p className="font-semibold">0123 666 999</p>
              <p className="text-sm text-muted-foreground">
                contact@sitename.com
              </p>
            </div>
          </div>

          <Separator className="my-10" />

          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Medi. All rights reserved.
          </p>
        </CardContent>
      </Card>
    </footer>
  );
}
