import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
	return (
		<div className="center flex-col space-y-8">
			<div className="flex-col center space-y-4">
				<h1>Welcome to Logo</h1>
				<p className="text-muted-foreground">
					A NextJS Template Made by{" "}
					<Link target="_blank" className="link" href={"https://github.com/OmarAfet"}>
						@OmarAfet
					</Link>
				</p>
			</div>
			<div className="flex gap-4">
				<Link href="/auth">
					<Button>Get Started</Button>
				</Link>
				<Link href="/about">
					<Button variant="outline">Read More</Button>
				</Link>
			</div>
		</div>
	);
}
