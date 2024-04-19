"use client";
import SideBarComponent from "@/components/sidebar/SideBarComponent";
import "@/app/globals.css";
import { MenuIcon } from "@/components/icons/FontAwsome";
import { useState } from "react";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [isShowSideBar, setIsShowSideBar] = useState<boolean>(true);
	console.log(isShowSideBar);
	return (
		<html>
			<body className="flex none-scroll-bar">
				<MenuIcon
					onClick={() => setIsShowSideBar(!isShowSideBar)}
					classname="h-8 z-20 w-8 fixed bottom-0 m-4 cursor-pointer lg:hidden"
				/>
				<aside
					className={`sticky left-0 z-10 h-screen ${
						isShowSideBar && "hidden"
					} lg:block`}
				>
					<SideBarComponent />
				</aside>
				<main className="flex-1">{children}</main>
			</body>
		</html>
	);
}
