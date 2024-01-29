import Link from "next/link";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Menu from "./Menu";

export default async function Header() {
	const cookie = cookies();
	const supabase = createClient(cookie);
	const user = await supabase.auth.getUser();
	const email = user.data.user?.email;

	return (
		<header className="border-b sticky top-0 z-10 backdrop-blur flex items-center justify-between px-4 py-2">
			<Logo />
			<div className="flex gap-4 items-center">
				{user ? (
					<div>{email}</div>
				) : (
					<Link href="/login" className="link">
						Login
					</Link>
				)}
				<div>
					<ModeToggle />
					<Menu />
				</div>
			</div>
		</header>
	);
}
