import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { userServices } from "./services/user.service";

const roleRoutes: Record<string, string> = {
  [Roles.admin]: "/admin-dashboard",
  [Roles.seller]: "/seller-dashboard",
  [Roles.customer]: "/dashboard",
};

export const proxy = async (request: NextRequest) => {
  const { pathname } = await request.nextUrl;
  const { data } = await userServices.getSession();

  const user = data?.user;
  const userRole = user?.role;

  const dashboardRoutes = Object.values(roleRoutes);

  const allowedRoute = roleRoutes[userRole];

  const isDashboardRoutes = dashboardRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Not logined in -> login page
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Wrong dashboard → redirect to correct one
  if (isDashboardRoutes && pathname !== allowedRoute) {
    return NextResponse.redirect(new URL(allowedRoute, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/seller-dashboard/:path*",
    "/dashboard/:path*",
  ],
};
