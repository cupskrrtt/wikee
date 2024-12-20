"use server";

import { pb } from "@/lib/pb/pocket-base";
import { getCookies } from "@/lib/utils/cookie-utils";
import { WikisRecord } from "@/pocketbase-types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface FormState {
	message: string;
	data?: any;
}

export async function createWikiAction(
	_state: FormState,
	data: FormData,
): Promise<FormState> {
	const cookieStore = await cookies();
	const pb_cookie = cookieStore.get("pb_auth")?.value;

	const initialContent = [
		{
			children: [],
			content: [
				{
					styles: {},
					text: "untitled",
					type: "text",
				},
			],
			id: "0406bc64-c1b8-4bea-b9dd-c2277fbc324d",
			props: {
				backgroundColor: "default",
				level: 1,
				textAlignment: "left",
				textColor: "default",
			},
			type: "heading",
		},
		{
			children: [],
			content: [],
			id: "a345b6a6-4924-4528-ab66-0e36a12e2770",
			props: {
				backgroundColor: "default",
				textAlignment: "left",
				textColor: "default",
			},
			type: "paragraph",
		},
	];

	//TODO: create a helper function to validate and generate cookie

	pb.authStore.loadFromCookie(pb_cookie as string);

	if (!pb.authStore.isValid) {
		pb.collection("users").authRefresh();
		const newCookie = pb.authStore.exportToCookie({ secure: false });
		cookieStore.set("pb_auth", newCookie, {
			secure: process.env.NODE_ENV === "production",
			path: "/",
			sameSite: "strict",
			httpOnly: process.env.NODE_ENV === "production",
		});
	}

	const userId = pb.authStore.model?.id;

	const formData: WikisRecord = {
		author_id: userId,
		name: data.get("name") as string,
		description: data.get("description") as string,
		content: initialContent,
	};

	try {
		await pb.collection("wikis").create(formData);
		revalidatePath("/dashboard");
		return {
			message: "success",
		};
	} catch (error) {
		console.log(error);
		return {
			message: "error",
		};
	}
}

export async function getWikiById({ id }: { id: string }): Promise<FormState> {
	return {
		message: "",
	};
}

export async function updateWikiAction({
	id,
	data,
}: {
	id: string;
	data: any;
}): Promise<FormState> {
	const cookieStore = await cookies();
	const pb_cookie = cookieStore.get("pb_auth")?.value;

	pb.authStore.loadFromCookie(pb_cookie as string);

	try {
		const update = await pb.collection("wikis").update(id, data);
		return {
			message: "success",
			data: update,
		};
	} catch (error) {
		return {
			message: "error",
		};
	}
}

export async function getFileUrl({
	record,
	image,
}: { record: WikisRecord; image: string }): Promise<FormState> {
	getCookies();

	try {
		const data = pb.getFileUrl(record, image);
		return {
			message: "success",
			data,
		};
	} catch (error) {
		return {
			message: "error",
		};
	}
}
