import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { userServices } from "./services/user.service";

/**
 * Default dashboard for each role
 */
const ROLE_DASHBOARD: Record<string, string> = {
  [Roles.admin]: "/admin-dashboard",
  [Roles.seller]: "/seller-dashboard",
  [Roles.customer]: "/dashboard",
};

/**
 * Route protection rules
 */
const PROTECTED_ROUTES: Record<string, string> = {
  "/admin-dashboard": Roles.admin,
  "/seller-dashboard": Roles.seller,
  "/dashboard": Roles.customer,
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // get session
  const { data } = await userServices.getSession();
  const user = data?.user;

  // Not logged in → login
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = user.role as string;

  // Find which protected route the user is accessing
  const matchedRoute = Object.keys(PROTECTED_ROUTES).find((route) =>
    pathname.startsWith(route),
  );

  if (!matchedRoute) {
    return NextResponse.next();
  }

  const requiredRole = PROTECTED_ROUTES[matchedRoute];
  const allowedDashboard = ROLE_DASHBOARD[role];

  // Wrong role OR accessing base dashboard → redirect to correct one
  if (role !== requiredRole || pathname === matchedRoute) {
    if (pathname !== allowedDashboard) {
      return NextResponse.redirect(new URL(allowedDashboard, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/seller-dashboard/:path*",
    "/dashboard/:path*",
  ],
};
