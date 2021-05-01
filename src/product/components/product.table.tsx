import { Breadcrumb, Col, Popconfirm, Row, Table, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Product } from '../product';
import ProductDescription from './product.description';
import { PlusOutlined } from '@ant-design/icons';
//import api from '../../services/api'

export default function ProductsTable(props: any) {
	const [data, setData] = useState<Product[]>([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

	useEffect(() => {

		// api.get("users/tgmarinho")
		// 	.then((response) => setData(response.data))
		// 	.catch((err) => {
		// 		console.error("ops! ocorreu um erro" + err);
		// 	});

		setData([{
			key: 1,
			id: 1,
			name: 'Teste 1',
			description: 'descrição teste do produto'
		},
		{
			key: 2,
			id: 2,
			name: 'Teste 2',
			description: 'descrição teste do produto'
		},
		{
			key: 3,
			id: 3,
			name: 'Teste 3',
			description: 'descrição teste do produto'
		}]);

	}, []);

	const onSelectChange = (selectedRowKeys: any[]) => {
		setSelectedRowKeys(selectedRowKeys);
	};

	const handleDelete = (productId: number) => {
		console.log("deleting product", productId);
	}

	const columns: ColumnsType<Product> = [
		{
			key: 'id',
			title: 'Id',
			dataIndex: 'id',
			width: '10%',
			defaultSortOrder: 'ascend',
			sorter: (a, b) => a.id - b.id,
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
				const link = `/products/edit/${record.id}`;
				return (
					<div>
						<Link to={link}>Edit</Link>
						<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
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
		return <ProductDescription productId={product.id} product={product} />
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
