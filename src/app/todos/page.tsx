import ToDosForm from "@/components/ToDos/ToDosForm";
import ToDosList from "@/components/ToDos/ToDosList";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function ToDos() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	let {
		data: todos,
	}: {
		data: ToDo[] | null;
	} = await supabase.from("todos").select("*");

	return (
		<div className="grid max-md:grid-rows-[min-content_min-content_1fr] md:grid-cols-[300px_min-content_1fr] gap-8">
			<ToDosForm />
			<div className="w-full h-full">
				<Separator className="max-md:hidden" orientation="vertical" />
				<Separator className="md:hidden" />
			</div>
			<ToDosList todos={todos || []} />
		</div>
	);
}
