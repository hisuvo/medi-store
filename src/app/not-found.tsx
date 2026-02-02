import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="text-center h-screen flex justify-center items-center">
      <div>
        <h1 className="font-bold text-7xl text-red-600">4 0 4</h1>
        <p className="text-md text-red-600 mb-6">
          Oops! The page you&apos;re looking for doesn’t exist.
        </p>
        <Button variant="outline">
          <Link href="/" className="flex justify-center align-baseline">
            Back to <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
