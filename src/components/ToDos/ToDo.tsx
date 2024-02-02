import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteTodo, updateTodo } from "@/actions/todos";
import { todoSchema } from "./ToDosForm";
import clsx from "clsx";
import * as z from "zod";

export default function ToDo({ todo }: { todo: ToDo }) {
	const form = useForm<z.infer<typeof todoSchema>>({
		resolver: zodResolver(todoSchema),
		defaultValues: {
			title: todo.title || "",
		},
	});

	async function handleDone(id: ToDo["id"], done: ToDo["done"]) {
		await updateTodo(id, { done: !done });
	}

	async function handleUpdate(values: z.infer<typeof todoSchema>) {
		await updateTodo(todo.id, { title: values.title });
	}

	async function handleDelete(id: ToDo["id"]) {
		await deleteTodo(id);
	}

	function onSubmit(values: z.infer<typeof todoSchema>) {
		handleUpdate(values);
	}

	return (
		<div key={todo.id} className={clsx(`justify-between py-8 px-4 flex gap-4 animate ${buttonVariants({ variant: "outline" })}`, { "opacity-50": todo.done })}>
			<div className="flex items-center gap-4">
				<Checkbox className="rounded-full h-6 w-6 border-2" onClick={() => handleDone(todo.id, todo.done)} checked={todo.done ?? undefined} />
				<h3 className="mt-0">{todo.title}</h3>
			</div>
			<div className="flex gap-2">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="ghost" size="icon" asChild className="justify-end cursor-pointer p-0.5">
							<PencilSquareIcon className="w-6 h-6" />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit ToDo</DialogTitle>
							<DialogDescription>Change the title of your ToDo.</DialogDescription>
						</DialogHeader>
						<Label htmlFor="title">Title</Label>
						<form id="editForm" onSubmit={form.handleSubmit(onSubmit)}>
							<Input id="title" placeholder="Enter your title" type="title" {...form.register("title")} />
						</form>
						<DialogFooter>
							<DialogClose>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<DialogClose>
								<Button form="editForm" type="submit">
									Edit
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				<Button onClick={() => handleDelete(todo.id)} variant="ghost" size="icon" asChild className="justify-end cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10 p-0.5">
					<TrashIcon className="w-6 h-6" />
				</Button>
			</div>
		</div>
	);
}
