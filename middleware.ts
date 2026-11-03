import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  // Public marketing routes (including /reden) stay public.
  // Workspace and installation routes require a valid NextAuth session.
  matcher: ["/dashboard/:path*", "/reden-install/:path*"],
};
