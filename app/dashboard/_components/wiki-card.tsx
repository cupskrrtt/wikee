"use client";

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { WikisResponse } from "@/pocketbase-types";
import { useRouter } from "next/navigation";

export default function WikiCards({ wikiData }: { wikiData: WikisResponse[] }) {
	const router = useRouter();

	function handleCardClick(id: string) {
		router.push(`dashboard/${id}`);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{wikiData.map((wiki) => (
				<Card
					key={wiki.id}
					onClick={() => handleCardClick(wiki.id)}
					className="transition-shadow hover:shadow-lg "
				>
					<CardHeader>
						<CardTitle>{wiki.name}</CardTitle>
						<CardDescription>{wiki.description}</CardDescription>
					</CardHeader>
				</Card>
			))}
		</div>
	);
}
