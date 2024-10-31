import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoutButton from "./_components/logout-button";
import RefreshAuthButton from "./_components/refresh-auth-button";
import { ModeToggle } from "./_components/theme-button";

export default function Home() {
	return (
		<div>
			<p>Dashboard</p>
			<Button asChild>
				<Link href={"/register"}>Register</Link>
			</Button>
			<Button asChild>
				<Link href={"/login"}>Login</Link>
			</Button>
			<Button asChild>
				<Link href={"/dashboard"}>Dashboard</Link>
			</Button>
			<LogoutButton />
			<RefreshAuthButton />
			<ModeToggle />
		</div>
	);
}
