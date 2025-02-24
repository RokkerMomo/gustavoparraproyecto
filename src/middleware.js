import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token is found, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  const adminRoutes = ["/NewStudent", "/NewGrade", "/ManageGrades", "/ManageStudents", "/EditStudent", "/EditGrade"];
  const userRoutes = ["/HomeClass", "/class"]; // Add your user-specific routes here

  const url = req.nextUrl.pathname;

  // Check if the user is trying to access an admin route
  if (adminRoutes.includes(url) && token.user.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Check if the user is trying to access a user route
  if (userRoutes.includes(url) && token.user.role !== "user" && token.user.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the token is valid and the user has the correct role, allow the request to proceed
  return NextResponse.next();
}

export const config = { matcher: ["/NewStudent", "/NewGrade", "/ManageGrades", "/ManageStudents", "/EditStudent", "/EditGrade", "/HomeClass", "/class"] };