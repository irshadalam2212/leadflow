import { auth } from "@/auth";

export default auth((req) => {

  const isLoggedIn = !!req.auth;

  const isDashboard = req.nextUrl.pathname.startsWith(
    "/dashboard"
  );

  if (isDashboard && !isLoggedIn) {
    const loginUrl = new URL(
      "/login",
      req.nextUrl.origin
    );

    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};