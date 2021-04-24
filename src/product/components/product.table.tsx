import { Table, Breadcrumb } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Product } from '../product';
import ProductDescription from './product.description';
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

	const columns: ColumnsType<Product> = [
		{
			key: 'id',
			title: 'Id',
			dataIndex: 'id',
			defaultSortOrder: 'ascend',
			sorter: (a, b) => a.id - b.id,
		},
		{
			key: 'name',
			title: 'Product',
			dataIndex: 'name',
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
		<Row>
			<Breadcrumb style={{ margin: '16px 0' }}>
				<Breadcrumb.Item>Products</Breadcrumb.Item>
			</Breadcrumb>
			<Col lg={12}>
				<Table rowSelection={rowSelection} expandable={{ expandedRowRender }} columns={columns} dataSource={data} />
			</Col>
		</Row>
	);
}
