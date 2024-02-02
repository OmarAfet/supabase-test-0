"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { logout } from "@/actions/auth";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

const links = ["About", "Contact"];

export default function Menu() {
	const [user, setUser] = useState<User | null>();
	const { toast } = useToast();

	useEffect(() => {
		async function getUser() {
			const supabase = createClient();
			const response = await supabase.auth.getUser();
			setUser(response.data.user);
		}

		getUser();
	}, []);

	async function handleLogout() {
		const res = await logout();
		toast({
			title: res.status ? "Success" : "Error",
			description: res.message,
		});

		if (res.status) {
			window.location.href = "/auth";
		}
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon">
					<EllipsisVerticalIcon className="w-6 h-6" />
				</Button>
			</SheetTrigger>
			<SheetContent className="flex flex-col gap-4">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<div className="flex flex-col gap-2 flex-1">
					{links.map((link) => (
						<SheetClose key={link} asChild>
							<Link href={`/${link.toLowerCase()}`} className={buttonVariants({ variant: "outline" })}>
								{link}
							</Link>
						</SheetClose>
					))}
				</div>
				<SheetFooter>
					{user ? (
						<SheetClose className="flex-1" asChild>
							<Button onClick={handleLogout} variant="destructive">
								Logout
							</Button>
						</SheetClose>
					) : (
						<SheetClose className="flex-1" asChild>
							<Link href="auth" className={buttonVariants({ variant: "default" })}>
								Login
							</Link>
						</SheetClose>
					)}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
