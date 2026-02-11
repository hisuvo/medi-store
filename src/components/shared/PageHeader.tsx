"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode; // button or anything (Add button, filter, etc.)
  className?: string;
};

export default function PageHeader({
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-6 border-b",
        className,
      )}
    >
      {/* Left side */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Right side (buttons/actions) */}
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}
