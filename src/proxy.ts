import { NextRequest, NextResponse } from "next/server";
import { userServices } from "./services/user.service";
import { Roles } from "./constants/roles";
import { authClient } from "./lib/auth-client";

const Role_Dashboard: Record<string, string> = {
  [Roles.admin]: "/admin-dashboard",
  [Roles.seller]: "/seller-dashboard",
  [Roles.customer]: "/dashboard",
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  try {
    const { data } = await userServices.getSession();
    const user = data?.user;

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userRole = user.role as string;
    const allowedDashboard = Role_Dashboard[userRole];

    if (!allowedDashboard) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const isAccessAdmin = pathname.startsWith("/admin-dashboard");
    const isAccessSeller = pathname.startsWith("/seller-dashboard");
    const isAccessCustomer = pathname.startsWith("/dashboard");

    const isUnauthorized =
      (isAccessAdmin && userRole !== Roles.admin) ||
      (isAccessSeller && userRole !== Roles.seller) ||
      (isAccessCustomer && userRole !== Roles.customer);

    if (isUnauthorized) {
      return NextResponse.redirect(new URL(allowedDashboard, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/seller-dashboard",
    "/seller-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
