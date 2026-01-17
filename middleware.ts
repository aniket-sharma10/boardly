import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/signin(.*)", "/signup(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated, orgId } = await auth();

  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  const validAuthRoutes = ["/selectOrg"];
  if (orgId) {
    validAuthRoutes.push(`/organization/${orgId}`);
  }

  if (isAuthenticated && isPublicRoute(req)) {
    const path = orgId ? `/organization/${orgId}` : "/selectOrg";
    const url = new URL(path, req.url);
    return NextResponse.redirect(url);
  }

  // Ensure authenticated users are only on valid routes
  if (isAuthenticated) {
    const isValidRoute = validAuthRoutes.includes(req.nextUrl.pathname);

    if (!isValidRoute) {
      const correctPath = orgId ? `/organization/${orgId}` : "/selectOrg";
      const url = new URL(correctPath, req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
