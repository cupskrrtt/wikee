"use server";

import { pb } from "@/lib/pb/pocket-base";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface FormState {
	message: string;
}

export async function registerAction(
	_state: FormState,
	data: FormData,
): Promise<FormState> {
	const formData = {
		email: data.get("email") as string,
		password: data.get("password") as string,
		passwordConfirm: data.get("password") as string,
	};

	const cookieStore = await cookies();

	try {
		await pb.collection("users").create(formData);

		pb.authStore.clear();

		await pb
			.collection("users")
			.authWithPassword(formData.email, formData.password);

		const cookieData = pb.authStore.exportToCookie({ secure: false });

		cookieStore.set("pb_auth", cookieData, {
			secure: process.env.NODE_ENV === "production",
			path: "/",
			sameSite: "strict",
			httpOnly: process.env.NODE_ENV === "production",
		});
	} catch (error) {
		console.log(error);
		return {
			message: "error",
		};
	} finally {
		redirect("/");
	}
}

export async function loginAction(
	_state: FormState,
	data: FormData,
): Promise<FormState> {
	const formData = {
		email: data.get("email") as string,
		password: data.get("password") as string,
	};

	const cookieStore = await cookies();

	try {
		pb.authStore.clear();

		await pb
			.collection("users")
			.authWithPassword(formData.email, formData.password);

		const cookie = pb.authStore.exportToCookie({ secure: false });

		cookieStore.set("pb_auth", cookie, {
			secure: process.env.NODE_ENV === "production",
			path: "/",
			sameSite: "strict",
			httpOnly: process.env.NODE_ENV === "production",
		});
	} catch (error) {
		console.log(error);
		return {
			message: "error",
		};
	} finally {
		redirect("/");
	}
}

export async function logoutAction(): Promise<FormState> {
	const cookieStore = await cookies();

	try {
		pb.authStore.clear();

		cookieStore.delete("pb_auth");

		return {
			message: "logged out",
		};
	} catch (error) {
		return {
			message: "error",
		};
	}
}

export async function refreshAuthAction(): Promise<FormState> {
	const cookieStore = await cookies();

	try {
		const oldCookie = cookieStore.get("pb_auth")?.value;

		pb.authStore.loadFromCookie(oldCookie as string);

		pb.authStore.isValid;
		await pb.collection("users").authRefresh();

		const newCookie = pb.authStore.exportToCookie({ secure: false });

		cookieStore.set("pb_auth", newCookie, {
			secure: process.env.NODE_ENV === "production",
			path: "/",
			sameSite: "strict",
			httpOnly: process.env.NODE_ENV === "production",
		});

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
