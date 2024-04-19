"use client";
import Link from "next/link";
import {
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarLink,
	NavbarToggle,
} from "flowbite-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuList } from "./menu";
import { useAppSelector } from "@/redux/hooks";
import { selectAvatar, selectBio } from "@/redux/features/userProfile/userProfileSlice";

type MenuItem = {
	name: string;
	path: string;
	active: boolean;
};

export default function NavbarComponent() {
	const count = useAppSelector((state) => state.counter.value);
	const avatar = useAppSelector(selectAvatar);
	const bio = useAppSelector(selectBio);
	const pathname = usePathname();
	const [menu, setMenu] = useState<MenuItem[]>(MenuList);

	// const updateMenu = (path: string) => {
	// 	const newMenu = menu.map((item) => {
	// 		if(path=== item.path){
	// 			return {
	// 				...item,
	// 				active: true
	// 			}
	// 		}else{
	// 			return {
	// 				...item,
	// 				active: false
	// 			}
	// 		}
	// 	})

	// 	setMenu(newMenu)
	// }

	return (
		<Navbar fluid rounded className="w-full">
			<NavbarBrand as={Link} href="https://flowbite-react.com">
				<img
					src={avatar}
					className="mr-3 h-6 sm:h-9"
					alt="Flowbite React Logo"
				/>
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
					{bio} {count}
				</span>
			</NavbarBrand>
			<NavbarToggle />
			<NavbarCollapse>
				{menu.map((item, index) => (
					<NavbarLink
					key={index}
						as={Link}
						href={item.path}
						active={item.path === pathname}
					>
						{item.name}
					</NavbarLink>
				))}
			</NavbarCollapse>
		</Navbar>
	);
}
