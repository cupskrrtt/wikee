import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import CreateNewWikiForm from "./_components/create-new-wiki-form";
import { getWikiByUser } from "@/lib/dal/get-wiki-data";
import WikiCards from "./_components/wiki-card";

export default async function DashboardPage() {
	const wikiData = await getWikiByUser();

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6 text-center">Creator Dashboard</h1>
			<WikiCards wikiData={wikiData} />
			<Dialog>
				<DialogTrigger asChild>
					<Button variant={"outline"}>Create Wiki</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create new wiki</DialogTitle>
					</DialogHeader>
					<CreateNewWikiForm />
				</DialogContent>
			</Dialog>
		</div>
	);
}
