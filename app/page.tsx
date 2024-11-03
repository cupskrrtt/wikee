"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Star } from "lucide-react";
import Header from "./_components/header";

export default function HomePage() {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
					<div className="container mx-auto px-4 md:px-6">
						<div className="flex flex-col items-center space-y-4 text-center">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
								Welcome to Wikee
							</h1>
							<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
								Your all-purpose knowledge hub. Explore any topic, learn
								anything, and contribute your expertise.
							</p>
							<div className="w-full max-w-sm space-y-2">
								<form className="flex space-x-2">
									<Input
										className="max-w-lg flex-1"
										placeholder="Search Wikee"
										type="search"
									/>
									<Button type="submit" variant="secondary">
										<Search className="h-4 w-4 mr-2" />
										Search
									</Button>
								</form>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container mx-auto px-4 md:px-6">
						<h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-8">
							Featured Articles
						</h2>
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							<Card>
								<CardHeader>
									<CardTitle>The History of Wikis</CardTitle>
								</CardHeader>
								<CardContent>
									<p>
										Explore the fascinating journey of wikis from their
										inception to modern collaborative platforms.
									</p>
									<Link
										className="inline-flex items-center text-sm font-medium text-primary mt-4"
										href="#"
									>
										Read more
										<Star className="h-4 w-4 ml-1" />
									</Link>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Collaborative Writing Tips</CardTitle>
								</CardHeader>
								<CardContent>
									<p>
										Learn effective strategies for contributing to wikis and
										improving collaborative content creation.
									</p>
									<Link
										className="inline-flex items-center text-sm font-medium text-primary mt-4"
										href="#"
									>
										Read more
										<Star className="h-4 w-4 ml-1" />
									</Link>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Wikee Community Guidelines</CardTitle>
								</CardHeader>
								<CardContent>
									<p>
										Understand our community standards to help maintain a
										positive and productive environment on Wikee.
									</p>
									<Link
										className="inline-flex items-center text-sm font-medium text-primary mt-4"
										href="#"
									>
										Read more
										<Star className="h-4 w-4 ml-1" />
									</Link>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-muted-foreground">
					© 2024 Wikee. All rights reserved.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<Link className="text-xs hover:underline underline-offset-4" href="#">
						Terms of Service
					</Link>
					<Link className="text-xs hover:underline underline-offset-4" href="#">
						Privacy
					</Link>
					<Link className="text-xs hover:underline underline-offset-4" href="#">
						Contact
					</Link>
				</nav>
			</footer>
		</div>
	);
}
