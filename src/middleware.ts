import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });

	await supabase.auth.getSession();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user && req.nextUrl.pathname === "/auth") {
		return NextResponse.redirect(new URL("/todos", req.url));
	}

	return res;
}

export const config = {
	matcher: "/auth",
};
