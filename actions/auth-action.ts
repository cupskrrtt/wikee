"use server";

import { loginUser, logoutUser, createUser } from "@/lib/data/auth-data";
import { pb } from "@/lib/pb/pocket-base";
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

	try {
		await createUser({ data: formData });
		return {
			message: "success",
		};
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

	try {
		await loginUser({ data: formData });
	} catch (error) {
		return {
			message: "error",
		};
	} finally {
		redirect("/");
	}
}

export async function logoutAction(): Promise<FormState> {
	try {
		await logoutUser();
		return {
			message: "success",
		};
	} catch (error) {
		return {
			message: "error",
		};
	} finally {
		redirect("/");
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
