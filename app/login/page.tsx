"use client";

import { loginAction } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginPage() {
	const [state, action, isPending] = useActionState(loginAction, {
		message: "",
	});

	return (
		<div className="flex items-center h-screen px-6">
			<Card className="container mx-auto gap-4">
				<CardHeader>
					<CardTitle>Login to wikee</CardTitle>
				</CardHeader>
				<CardContent>
					<form action={action} className="flex flex-col gap-4">
						<div>
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" />
						</div>
						<div>
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" type="password" />
						</div>
						<Button disabled={isPending}>Login</Button>
						<p className="flex gap-1">
							Don't have an account ?
							<Link href={"/register"} className="underline underline-offset-4">
								Register
							</Link>
						</p>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
