"use server";

import { loginSchema } from "@/components/auth/Login";
import { signUpSchema } from "@/components/auth/Signup";
import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import * as z from "zod";

export type AuthResponse = {
	status: true | false;
	message: string;
};

export async function signUp(values: z.infer<typeof signUpSchema>): Promise<AuthResponse> {
	const origin = headers().get("origin");
	const email = values.email;
	const password = values.password;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/api/auth/callback`,
		},
	});

	if (error) {
		return { status: false, message: "Login failed." };
	}

	return { status: true, message: "Sign up successfully." };
}

export async function login(values: z.infer<typeof loginSchema>): Promise<AuthResponse> {
	const email = values.email;
	const password = values.password;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return { status: false, message: "Login failed." };
	}

	return { status: true, message: "Login successfully." };
}

export async function logout(): Promise<AuthResponse> {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { error } = await supabase.auth.signOut();

	if (error) {
		return { status: false, message: "Logout failed." };
	}

	return { status: true, message: "Logout successfully." };
}
