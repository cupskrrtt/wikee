"use client";

import { createWikiAction } from "@/actions/wiki-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

export default function CreateNewWikiForm() {
	const [state, action, isPending] = useActionState(createWikiAction, {
		message: "",
	});

	return (
		<form className="space-y-4" action={action}>
			<div>
				<Label htmlFor="name">Wiki name</Label>
				<Input id="name" name="name" />
			</div>
			<div>
				<Label htmlFor="description">Wiki description</Label>
				<Input id="description" name="description" />
			</div>
			<Button disabled={isPending}>Create wiki</Button>
		</form>
	);
}
