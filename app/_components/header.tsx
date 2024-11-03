"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/wikee-logo.webp";
import { useActionState, useEffect, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Star, User } from "lucide-react";
import { logoutAction } from "@/actions/auth-action";
import { ModeToggle } from "./theme-button";

export default function Header() {
	const [authed, setAuthed] = useState(false);
	const [_state, logoutAct, isPending] = useActionState(logoutAction, {
		message: "",
	});

	const id = "fjakfjas";

	useEffect(() => {
		document.cookie ? setAuthed(true) : setAuthed(false);
	});

	return (
		<header className="px-4 lg:px-6 h-14 flex items-center">
			<Link className="flex items-center justify-center" href="/">
				<Image src={logo} alt="Wikee Logo" height={30} width={30} />
			</Link>
			<nav className="ml-auto flex items-center gap-4 sm:gap-6">
				<div className="hidden md:flex items-center gap-4 sm:gap-6">
					<Link
						className="text-sm font-medium hover:underline underline-offset-4"
						href="/"
					>
						Home
					</Link>
					<Link
						className="text-sm font-medium hover:underline underline-offset-4"
						href={`/${id}`}
					>
						Random
					</Link>
					<Link
						className="text-sm font-medium hover:underline underline-offset-4"
						href="/dashboard"
					>
						Create
					</Link>
					<ModeToggle />
					{authed ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="relative h-8 w-8 rounded-full"
								>
									<Avatar className="h-8 w-8">
										<AvatarImage
											src="/placeholder.svg?height=32&width=32"
											alt="@user"
										/>
										<AvatarFallback>U</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56" align="end" forceMount>
								<DropdownMenuItem>
									<Link href={"/profile"} className="flex">
										<User className="mr-2 h-4 w-4" />
										<span>Profile</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href={"/favorite"} className="flex">
										<Star className="mr-2 h-4 w-4" />
										<span>Favorites</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								{/*TODO: create the logout*/}
								<DropdownMenuItem>
									<form action={logoutAct} className="w-full">
										<Button
											variant="ghost"
											className="w-full"
											disabled={isPending}
										>
											Log out
										</Button>
									</form>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<div className="flex items-center gap-2">
							<Button variant="ghost" asChild>
								<Link href={"/login"}>Log in</Link>
							</Button>
							<Button asChild>
								<Link href={"/register"}>Register</Link>
							</Button>
						</div>
					)}
				</div>
				<div className="md:hidden">
					<ModeToggle />
				</div>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="md:hidden">
							<Menu className="h-6 w-6" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right">
						<nav className="flex flex-col gap-4">
							<SheetHeader>
								<SheetTitle className="text-md font-bold text-start">
									Menu
								</SheetTitle>
							</SheetHeader>
							<Link
								className="text-sm font-medium hover:underline underline-offset-4"
								href="/"
							>
								Home
							</Link>
							<Link
								className="text-sm font-medium hover:underline underline-offset-4"
								href={`/${id}`}
							>
								Random
							</Link>
							<Link
								className="text-sm font-medium hover:underline underline-offset-4"
								href="/dashboard"
							>
								Create
							</Link>
							{authed ? (
								<>
									<Link
										className="text-sm font-medium hover:underline underline-offset-4"
										href="/profile"
									>
										Profile
									</Link>
									<Link
										className="text-sm font-medium hover:underline underline-offset-4"
										href="/favorite"
									>
										Favorites
									</Link>

									{/*TODO: create the logout*/}
									<form action={logoutAct} className="w-full">
										<Button
											variant="ghost"
											disabled={isPending}
											className="w-full"
										>
											Log out
										</Button>
									</form>
								</>
							) : (
								<>
									<Button variant="ghost" asChild>
										<Link href={"/login"}>Log in</Link>
									</Button>
									<Button asChild>
										<Link href={"/register"}>Register</Link>
									</Button>
								</>
							)}
						</nav>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}
