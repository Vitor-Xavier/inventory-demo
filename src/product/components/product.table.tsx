import { Breadcrumb, Col, Popconfirm, Row, Space, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Product } from '../product';
import productService from '../services/product.service';
import ProductDescription from './product.description';

export default function ProductsTable(props: any) {
	const [data, setData] = useState<Product[]>([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response = await productService.getProducts();
		const products = response.data;
		products.forEach((s: Product, i: number) => {
			s.key = i;
		});
		setData(products);
	};

	const onSelectChange = (selectedRowKeys: any[]) => {
		setSelectedRowKeys(selectedRowKeys);
	};

	const handleDelete = async (supplierId: number) => {
		await productService.delete(supplierId);
        message.success('Product deleted');
		await fetchData();
	}

	const columns: ColumnsType<Product> = [
		{
			key: 'id',
			title: 'Id',
			dataIndex: 'productId',
			width: '10%',
			defaultSortOrder: 'ascend',
			sorter: (a, b) => a.productId - b.productId,
		},
		{
			key: 'name',
			title: 'Product',
			width: '80%',
			dataIndex: 'name',
		},
		{
			key: 'Actions',
			title: 'Product',
			width: '10%',
			fixed: 'right',
			render: (_, record) => {
				const link = `/products/edit/${record.productId}`;
				return (
					<div>
						<Link to={link}>Edit</Link>
						<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.productId)}>
							<a>Delete</a>
						</Popconfirm>
					</div>
				);
			},
		},
	];

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [
			Table.SELECTION_ALL,
			Table.SELECTION_INVERT,
			Table.SELECTION_NONE,
		]
	};

	const expandedRowRender = (product: Product) => {
		return <ProductDescription productId={product.productId} product={product} />
	}

	return (
		<>
			<Row>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Products</Breadcrumb.Item>
				</Breadcrumb>
			</Row>
			<Row justify="end">
				<Col span={4}>
					<Space align="end">
						<Link to="/products/new">New</Link>
					</Space>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Table rowSelection={rowSelection} expandable={{ expandedRowRender }} columns={columns} dataSource={data} />
				</Col>
			</Row>
		</>
	);
}
