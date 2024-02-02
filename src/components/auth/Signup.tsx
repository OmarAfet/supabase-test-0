"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signUp } from "@/actions/auth";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import LoadingIcon from "@/icons/LoadingIcon";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const signUpSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8),
		confirmPassword: z.string().min(8),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export default function Signup() {
	const [Loading, setLoading] = useState(false);
	const { toast } = useToast();
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function handleSubmit(values: z.infer<typeof signUpSchema>) {
		setLoading(true);
		const res = await signUp(values);
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
							<CardTitle className="mt-0">Signup</CardTitle>
							<CardDescription>Enter your email and password to create an account</CardDescription>
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
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm password</FormLabel>
										<FormControl>
											<Input {...field} type="password" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter>
							<Button disabled={Loading} className="flex-1" type="submit">
								{Loading && <LoadingIcon className="text-background" />}
								Signup
							</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>
			<p className="center whitespace-pre text-muted-foreground">
				Already have an account?{" "}
				<TabsList asChild>
					<TabsTrigger className="link bg-transparent p-0 rounded-none h-fit" value="login">
						Login
					</TabsTrigger>
				</TabsList>
			</p>
		</>
	);
}
