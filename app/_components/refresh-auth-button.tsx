"use client";

import { refreshAuthAction } from "@/actions/auth-action";
import { updateWikiAction } from "@/actions/wiki-action";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

export default function RefreshAuthButton() {
	const [state, action, isPending] = useActionState(updateWikiAction, {});

	return (
		<form action={action}>
			<Button disabled={isPending}>Refresh auth</Button>
		</form>
	);
}
