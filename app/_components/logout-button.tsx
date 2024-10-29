"use client";

import { logoutAction } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

export default function LogoutButton() {
	const [state, action, isPending] = useActionState(logoutAction, {
		message: "",
	});

	return (
		<form action={action}>
			<Button disabled={isPending}>Logout</Button>
		</form>
	);
}
