export type ProductType = {
	id: number;
	title: string;
	price: number;
	category: string;
	description: string;
	image: string;
};


export type CartProductType = {
	title: string;
	image: string;
	price: number;
	id: number;
	onClick?: () => void;
};

