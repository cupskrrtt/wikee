import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { pb } from "./lib/pb/pocket-base";

export async function middleware(request: NextRequest) {
	const cookieStore = await cookies();
	const pb_cookie = cookieStore.get("pb_auth")?.value;

	pb.authStore.loadFromCookie(pb_cookie as string);
	const valid = pb.authStore.isValid;

	if (!valid) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
