import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";

export default function Auth() {
	return (
		<Tabs className="w-full max-w-md mx-auto" defaultValue="login">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="login">Login</TabsTrigger>
				<TabsTrigger value="signup">Signup</TabsTrigger>
			</TabsList>
			<TabsContent value="login">
				<Login />
			</TabsContent>
			<TabsContent value="signup">
				<Signup />
			</TabsContent>
		</Tabs>
	);
}
