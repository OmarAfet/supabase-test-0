import Link from "next/link";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Menu from "./Menu";
import { buttonVariants } from "../ui/button";
import { RxGithubLogo } from "react-icons/rx";

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
					<div className="max-md:hidden">{email}</div>
				) : (
					<Link href="/login" className="link">
						Login
					</Link>
				)}
				<div>
					<Link href="https://github.com/OmarAfet" className={buttonVariants({ variant: "ghost", size: "icon" })}>
						<RxGithubLogo className="h-6 w-6" />
					</Link>
					<ModeToggle />
					<Menu />
				</div>
			</div>
		</header>
	);
}
