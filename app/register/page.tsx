"use client";

import { registerAction } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

export default function RegisterPage() {
	const [state, action, isPending] = useActionState(registerAction, {
		message: "",
	});

	return (
		<form action={action}>
			<Input name="email" placeholder="Email" />
			<Input name="password" placeholder="Password" />
			<Button disabled={isPending}>Register</Button>
		</form>
	);
}