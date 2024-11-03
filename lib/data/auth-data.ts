import { cookies } from "next/headers";
import { pb } from "../pb/pocket-base";
import { redirect } from "next/navigation";

interface UserRegisterDto {
	email: string;
	password: string;
	passwordConfirm: string;
}

interface UserLoginDto {
	email: string;
	password: string;
}

export async function createUser({ data }: { data: UserRegisterDto }) {
	const cookieStore = await cookies();
	try {
		await pb.collection("users").create(data);

		await pb.collection("users").authWithPassword(data.email, data.password);

		const cookieData = pb.authStore.exportToCookie({ secure: false });

		cookieStore.set("pb_auth", cookieData, {
			secure: process.env.NODE_ENV === "production",
			path: "/",
			sameSite: "strict",
			httpOnly: process.env.NODE_ENV === "production",
		});
	} catch (error) {
		return {
			message: "error",
		};
	} finally {
		redirect("/");
	}
}

export async function loginUser({ data }: { data: UserLoginDto }) {
	const cookieStore = await cookies();
	try {
		await pb.collection("users").authWithPassword(data.email, data.password);

		const cookie = pb.authStore.exportToCookie({ secure: false });

		cookieStore.set("pb_auth", cookie, {
			secure: process.env.NODE_ENV === "production",
			path: "/",
			sameSite: "strict",
			httpOnly: process.env.NODE_ENV === "production",
		});
	} catch (error) {
		return error;
	}
}

export async function logoutUser() {
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
