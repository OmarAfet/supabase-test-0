import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
	try {
		const { supabase, response } = createClient(request);
		// const session = await supabase.auth.getSession();

		// Refresh session if expired - required for Server Components
		await supabase.auth.getSession();

		// // If the user is logged in, don't let them see the login page.
		// if (session && request.nextUrl.pathname === "/auth") {
		// 	return NextResponse.redirect("/");
		// }

		return response;
	} catch (e) {
		return NextResponse.next({
			request: {
				headers: request.headers,
			},
		});
	}
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
