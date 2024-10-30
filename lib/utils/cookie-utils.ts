import { cookies } from "next/headers";
import { pb } from "../pb/pocket-base";

export async function getCookies() {
	const cookieStore = await cookies();

	const oldCookie = cookieStore.get("pb_auth")?.value;

	pb.authStore.loadFromCookie(oldCookie as string);
}
