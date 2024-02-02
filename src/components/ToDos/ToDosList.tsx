"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ToDo from "./ToDo";

export default function ToDosList({ todos }: { todos: ToDo[] }) {
	const router = useRouter();
	const doneTodos = todos?.filter((todo) => todo.done);
	const notDoneTodos = todos?.filter((todo) => !todo.done);

	const supabase = createClient();

	useEffect(() => {
		const channel = supabase
			.channel("realtime todos")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "todos",
				},
				() => {
					router.refresh();
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase, router]);

	return (
		<div className="grid grid-cols-1 gap-4 h-fit">
			{!(notDoneTodos?.length || doneTodos?.length) ? (
				<h1 className="center">No ToDos yet.</h1>
			) : (
				<>
					{notDoneTodos?.length !== 0 && <h2>Not Done</h2>}
					{notDoneTodos?.map((todo) => (
						<ToDo key={todo.id} todo={todo} />
					))}
					{doneTodos?.length !== 0 && <h2>Done</h2>}
					{doneTodos?.map((todo) => (
						<ToDo key={todo.id} todo={todo} />
					))}
				</>
			)}
		</div>
	);
}
