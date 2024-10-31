"use client";

import "@blocknote/core/fonts/inter.css";
import { getFileUrl, updateWikiAction } from "@/actions/wiki-action";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { useEffect, useState } from "react";
import * as Button from "@/components/ui/button";
import * as Card from "@/components/ui/card";
import "@blocknote/shadcn/style.css";
import { useTheme } from "next-themes";
import { pb } from "@/lib/pb/pocket-base";
import { WikisResponse } from "@/pocketbase-types";
import { getCookies } from "@/lib/utils/cookie-utils";

interface blockNoteProps {
	id: string;
	initialContent: any;
}

interface uploadFileProps {
	blockId: string;
	file: File;
}

export default function Blocknote({ id, initialContent }: blockNoteProps) {
	const { theme } = useTheme();
	const [data, setData] = useState<any>();

	useEffect(() => {
		const updatedData = {
			content: data,
		};

		async function updateData() {
			await updateWikiAction({ id, data: updatedData });
		}
		updateData();
	}, [data]);

	async function uploadFile(file: File) {
		const body = new FormData();
		body.append("file", file);

		const data = await updateWikiAction({ id, data: body });
		const datatulip = data?.data as WikisResponse;
		const datayalip = datatulip.file[datatulip.file.length - 1];
		const imageData = await getFileUrl({
			record: datatulip,
			image: datayalip,
		});

		return imageData.data as string;
	}

	const editor = useCreateBlockNote({
		initialContent: initialContent,
		uploadFile,
	});

	return (
		<BlockNoteView
			editor={editor}
			onChange={() => {
				setData(editor.document);
			}}
			theme={theme === "dark" ? "dark" : "light"}
			shadCNComponents={{
				Button,
				Card,
			}}
		/>
	);
}
