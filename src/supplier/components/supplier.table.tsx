import { Breadcrumb, Col, message, Popconfirm, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import supplierService from '../services/supplier.service';
import { Supplier } from '../supplier';

export default function ProductsTable(props: any) {
	const [data, setData] = useState<Supplier[]>([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response = await supplierService.getSuppliers();
		const suppliers = response.data;
		suppliers.forEach((s: Supplier, i: number) => {
			s.key = i;
		});
		setData(suppliers);
	};

	const onSelectChange = (selectedRowKeys: any[]) => {
		setSelectedRowKeys(selectedRowKeys);
	};

	const columns: ColumnsType<Supplier> = [
		{
			key: 'supplierId',
			title: 'Id',
			dataIndex: 'supplierId',
			defaultSortOrder: 'ascend',
			sorter: (a, b) => a.supplierId - b.supplierId,
		},
		{
			key: 'name',
			title: 'Nome',
			dataIndex: 'name',
		},
		{
			key: 'Actions',
			title: 'Product',
			width: '10%',
			fixed: 'right',
			render: (_, record) => {
				const link = `/suppliers/edit/${record.supplierId}`;
				return (
					<div>
						<Link to={link}>Edit</Link>
						<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.supplierId)}>
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

	const handleDelete = async (supplierId: number) => {
		await supplierService.delete(supplierId);
        message.success('Supplier deleted');
		await fetchData();
	}

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
