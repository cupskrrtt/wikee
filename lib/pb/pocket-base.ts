import { TypedPocketBase } from "@/pocketbase-types";
import PocketBase from "pocketbase";

export const pb = new PocketBase(process.env.PB_URL!) as TypedPocketBase;
