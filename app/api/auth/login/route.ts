import { NextResponse } from "next/server";
import { signIn } from "@/auth";

export async function POST(request: Request) {
  try {
    // add validated fiels as for the server action...
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Missing email or password" }, { status: 400 });
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log("result", result);

    if (!result) {
      return NextResponse.json({ ok: false, error: "No response from signIn" }, { status: 500 });
    }
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error || "Invalid credentials" }, { status: 401 });
    }

    // signIn() sets the session cookie in the response headers automatically (JWT strategy).
    // The Next.js client or Postman can store that cookie for subsequent requests.

    return NextResponse.json({ ok: true, message: "Login successful" });
  } catch (error) {
    console.error("API Login Error:", error);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}