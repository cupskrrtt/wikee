"use client";

import { registerAction } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState } from "react";

export default function RegisterPage() {
	const [state, action, isPending] = useActionState(registerAction, {
		message: "",
	});

	return (
		<div className="flex items-center h-screen px-6">
			<Card className="container mx-auto gap-4">
				<CardHeader>
					<CardTitle>Register to wikee</CardTitle>
					<CardDescription>
						Register to wikee, and create your wonderful wiki!
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={action} className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" />
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" type="password" />
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="passwordConfirm">Password Confirm</Label>
							<Input
								id="passwordConfirm"
								name="passwordConfirm"
								type="password"
							/>
						</div>
						<Button disabled={isPending}>Register</Button>
						<p className="flex gap-1">
							Already have an account?
							<Link href={"/login"} className="underline underline-offset-4">
								Login
							</Link>
						</p>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
