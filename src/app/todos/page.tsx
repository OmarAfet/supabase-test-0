import ToDosForm from "@/components/ToDos/ToDosForm";
import ToDosList from "@/components/ToDos/ToDosList";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function ToDos() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	let {
		data: todos,
	}: {
		data: ToDo[] | null;
	} = await supabase
		.from("todos")
		.select("*")

	return (
		<div className="grid grid-cols-[300px_min-content_1fr] gap-8">
			<ToDosForm />
			<ToDosList todos={todos || []} />
		</div>
	);
}
