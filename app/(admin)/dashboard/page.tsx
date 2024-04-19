"use client";
import { ProductType } from "@/lib/definitions";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button, Modal } from "flowbite-react";
import Image from "next/image";

export default function Dashboard() {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState(false);
	const [productDetail, setProductDetail] = useState<ProductType | null>(null);
	// fetch products
	useEffect(() => {
		setLoading(true);
		fetch("https://fakestoreapi.com/products")
			.then((res) => res.json())
			.then((data) => {
				setProducts(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, []);

	const [imagePlaceholder, setImagePlaceholder] = useState<string>(
		"https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
	);

	const handleViewProduct = (product: ProductType) => {
		setProductDetail(product);
		setOpenModal(true);
	};

	const columns: TableColumn<ProductType>[] = [
		{
			name: "Product Title",
			selector: (row) => row.title,
		},
		{
			name: "Price (USD)",
			selector: (row) => row.price,
			sortable: true,
		},
		{
			name: "Image",
			selector: (row): any => (
				<img className="w-16 h-16" src={row.image} alt={row.image} />
			),
			sortable: true,
		},
		{
			name: "Category",
			selector: (row) => row.category,
			sortable: true,
		},
		{
			name: "Action",
			selector: (row): any => (
				<div>
					<button
						onClick={() => handleViewProduct(row)}
						className="text-blue-600 mx-2"
					>
						view
					</button>
					<button className="text-yellow-400 mx-2">edit</button>
					<button className="text-red-600 mx-2">delete</button>
				</div>
			),
		},
	];

	return (
		<main className="h-screen">
			<DataTable
				fixedHeader
				progressPending={loading}
				columns={columns}
				data={products}
				pagination
				customStyles={customStyles}
				striped
				highlightOnHover
			/>
			<Modal show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header>Product Detial</Modal.Header>
				<Modal.Body>
					<div className="space-y-6">
						<Image
							src={productDetail?.image || imagePlaceholder}
							alt={productDetail?.title || "Untitle"}
							width={250}
							height={300}
						/>
						<h3 className="text-3xl text-gray-700">{productDetail?.title || "Untitle"}</h3>
						<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							{productDetail?.description || "No description"}
						</p>
						
					</div>
				</Modal.Body>
			</Modal>
		</main>
	);
}

const customStyles = {
	rows: {
		style: {
			minHeight: "72px", // override the row height
		},
	},
	headCells: {
		style: {
			paddingLeft: "38px", // override the cell padding for head cells
			paddingRight: "8px",
			fontSize: "1.2rem",
			backgroundColor: "#f1f1f1",
		},
	},
	cells: {
		style: {
			paddingLeft: "38px", // override the cell padding for data cells
			paddingRight: "8px",
		},
	},
};
