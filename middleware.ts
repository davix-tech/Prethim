import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  // Temporary access: /dashboard is excluded from the auth middleware.
  // Keep installation routes protected until normal authentication is restored.
  matcher: ["/reden-install/:path*"],
};
