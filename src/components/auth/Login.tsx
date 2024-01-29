"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import Link from "next/link";
import { login } from "@/actions/auth";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export default function Login() {
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function handleSubmit(values: z.infer<typeof loginSchema>) {
		const res = await login(values);
		toast({
			title: res.status ? "Success" : "Error",
			description: res.message,
		});

		if (res.status) {
			router.push("/");
		}
	}

	return (
		<Card>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<CardHeader>
						<CardTitle className="mt-0">Login</CardTitle>
						<CardDescription>Enter your email and password to login to your account</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} type="email" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input {...field} type="password" />
									</FormControl>
									<Link className="mt-4 text-sm link" href="/forgot-password">
										Forgot your password?
									</Link>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button className="flex-1" type="submit">
							Login
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
