"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { login } from "@/actions/auth";
import { useToast } from "@/components/ui/use-toast";
import LoadingIcon from "@/icons/LoadingIcon";
import { useState } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export default function Login() {
	const [Loading, setLoading] = useState(false);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function handleSubmit(values: z.infer<typeof loginSchema>) {
		setLoading(true);
		const res = await login(values);
		toast({
			title: res.status ? "Success" : "Error",
			description: res.message,
		});

		if (res.status) {
			window.location.href = "/";
		}
		setLoading(false);
	}

	return (
		<>
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
										<Link className="mt-4 text-sm link text-muted-foreground" href="/forgot-password">
											Forgot your password?
										</Link>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter>
							<Button disabled={Loading} className="flex-1" type="submit">
								{Loading && <LoadingIcon className="text-background" />}
								Login
							</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>
			<p className="text-center text-muted-foreground">
				Don&apos;t have an account?{" "}
				<TabsList asChild>
					<TabsTrigger className="link bg-transparent p-0 rounded-none h-fit" value="signup">
						Signup
					</TabsTrigger>
				</TabsList>
			</p>
		</>
	);
}
