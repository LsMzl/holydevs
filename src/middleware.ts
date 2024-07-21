import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
   "/",
   "/connexion(.*)",
   "/inscription(.*)",
   "/annonce(.*)",
   "/aide(.*)",
]);

export default clerkMiddleware((auth, request) => {
   if (!isPublicRoute(request)) {
      auth().protect();
   }
});

const isProtectedRoute = createRouteMatcher([
   "/reserver",
   "/ajouter",
   "/bienvenue",
   "/onboarding(.*)",
]);

export const config = {
   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
