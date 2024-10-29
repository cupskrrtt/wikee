"use client";

import { refreshAuthAction } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

export default function RefreshAuthButton() {
	const [state, action, isPending] = useActionState(refreshAuthAction, {
		message: "",
	});

	return (
		<form action={action}>
			<Button disabled={isPending}>Refresh auth</Button>
		</form>
	);
}
