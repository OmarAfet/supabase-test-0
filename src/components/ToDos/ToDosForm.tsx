"use client";

import { insertTodo } from "@/actions/todos";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingIcon from "@/icons/LoadingIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const todoSchema = z.object({
	title: z.string().min(1),
});

export default function ToDosForm() {
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof todoSchema>>({
		resolver: zodResolver(todoSchema),
		defaultValues: {
			title: "",
		},
	});

	async function handleSubmit(values: z.infer<typeof todoSchema>) {
		setLoading(true);
		await insertTodo(values);
		form.reset();
		setLoading(false);
	}

	return (
		<Card className="h-fit md:sticky top-20">
			<CardHeader>
				<CardTitle className="mt-0">Add a ToDo</CardTitle>
				<CardDescription>Enter a title for your new ToDo.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form id="todoForm" onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter your title" type="title" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</CardContent>
			<CardFooter>
				<Button disabled={loading} type="submit" form="todoForm" className="flex-1">
					{loading ? <LoadingIcon className="h-6 w-6 text-background" /> : "Add ToDo"}
				</Button>
			</CardFooter>
		</Card>
	);
}
