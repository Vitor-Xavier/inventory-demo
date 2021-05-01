import { Table, Breadcrumb, Col, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { Supplier } from '../supplier';
//import api from '../../services/api'

export default function ProductsTable(props: any) {
	const [data, setData] = useState<Supplier[]>([]);
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
			name: 'Supplier 1',
		},
		{
			key: 2,
			id: 2,
			name: 'Supplier 2',
		},
		{
			key: 3,
			id: 3,
			name: 'Supplier 3',
		}]);

	}, []);

	const onSelectChange = (selectedRowKeys: any[]) => {
		setSelectedRowKeys(selectedRowKeys);
	};

	const columns: ColumnsType<Supplier> = [
		{
			key: 'id',
			title: 'Id',
			dataIndex: 'id',
			defaultSortOrder: 'ascend',
			sorter: (a, b) => a.id - b.id,
		},
		{
			key: 'name',
			title: 'Nome',
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

	// const expandedRowRender = (product: Product) => {
	// 	return <ProductDescription productId={product.id} product={product} />
	// }

	return (
		<Row>
            <Breadcrumb style={{ margin: '16px 0' }}>
				<Breadcrumb.Item>Suppliers</Breadcrumb.Item>
			</Breadcrumb>
			<Col span={24}>
				<Table rowSelection={rowSelection} columns={columns} dataSource={data} />
			</Col>
		</Row>
	);
}
