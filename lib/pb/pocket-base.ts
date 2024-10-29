import { TypedPocketBase } from "@/pocketbase-types";
import PocketBase from "pocketbase";

export const pb = new PocketBase(
	process.env.POCKET_BASE_URL!,
) as TypedPocketBase;
