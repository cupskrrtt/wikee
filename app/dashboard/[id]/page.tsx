"use client";

import Tiptap from "@/components/Tiptap";
import { useParams } from "next/navigation";

export default function Page() {
	const params = useParams<{ id: string }>();

	return (
		<div>
			<Tiptap id={params.id} />
		</div>
	);
}
