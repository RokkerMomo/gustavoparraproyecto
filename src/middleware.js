import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log("Token:", token); // Log the token for debugging
  console.log("Environment:", process.env.NODE_ENV); // Log the environment
  console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET); // Log the secret (ensure this is set correctly)
  console.log("Headers:", req.headers); // Log the headers for debugging
  console.log("Cookies:", req.cookies); // Log the cookies for debugging

  // If no token is found, redirect to the login page
  if (!token) {
    console.log("No token found, redirecting to login page");
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  const adminRoutes = ["/NewStudent", "/NewGrade", "/ManageGrades", "/ManageStudents", "/EditStudent", "/EditGrade"];
  const userRoutes = ["/HomeClass", "/class"]; // Add your user-specific routes here

  const url = req.nextUrl.pathname;

  console.log("URL:", url); // Log the URL for debugging
  console.log("User Role:", token.user?.role); // Log the user role for debugging

  // Check if the user is trying to access an admin route
  if (adminRoutes.includes(url) && token.user?.role !== "admin") {
    console.log("User is not an admin, redirecting to home page");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Check if the user is trying to access a user route
  if (userRoutes.includes(url) && token.user?.role !== "user" && token.user?.role !== "admin") {
    console.log("User is not authorized, redirecting to home page");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the token is valid and the user has the correct role, allow the request to proceed
  console.log("User is authorized, allowing request to proceed");
  return NextResponse.next();
}

export const config = { matcher: ["/NewStudent", "/NewGrade", "/ManageGrades", "/ManageStudents", "/EditStudent", "/EditGrade", "/HomeClass", "/class"] };