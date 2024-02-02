"use server";

import { todoSchema } from "@/components/ToDos/ToDosForm";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import * as z from "zod";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function insertTodo(values: z.infer<typeof todoSchema>) {
	const userId = (await supabase.auth.getUser()).data.user?.id;
	await supabase.from("todos").insert({ title: values.title, user_id: userId });
}

export async function updateTodo(id: ToDo["id"], updates: Partial<ToDo>) {
	await supabase.from("todos").update(updates).match({ id });
}

export async function deleteTodo(id: ToDo["id"]) {
	await supabase.from("todos").delete().match({ id });
}
