import { DeleteFilled, EditFilled, PlusSquareFilled } from '@ant-design/icons';
import { Button, Col, message, Popconfirm, Row, Space } from 'antd';
import React from 'react';
import { useHistory } from "react-router-dom";
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';
import { Column, getDefaultActionsColumn } from '../../components/table/table.column';
import TableComponent from '../../components/table/table.component';
import supplierService from '../services/supplier.service';
import { Supplier } from '../supplier';

export default function ProductsTable(props: any) {
	const history = useHistory();

	const fetchData = async (page: number, size: number) => {
		const response = await supplierService.getSuppliers((page - 1) * size, size);
		const { data, total } = response.data;

		return { data: data, total: total }
	};

	const columns: Column<Supplier>[] = [
		{
			title: 'Id',
			dataIndex: 'supplierId',
			width: '15%'
		},
		{
			title: 'Nome',
			dataIndex: 'name',
			width: '70%'
		},
		{
			...getDefaultActionsColumn<Supplier>(),
			render: (_, record) => {
				const link = `/suppliers/edit/${record.supplierId}`;
				return (
					<Space size={8}>
						<Button icon={<EditFilled />} onClick={() => history.push(link)} />
						<Popconfirm title="Remover fornecedor?" onConfirm={() => handleDelete(record.supplierId)}>
							<Button icon={<DeleteFilled />} />
						</Popconfirm>
					</Space>
				);
			},
		},
	];

	const handleDelete = async (supplierId: number) => {
		await supplierService.delete(supplierId);
		message.success('Fornecedor removido');
		//await fetchData((currentPage - 1) * pageSize, pageSize);
	}

	// const expandedRowRender = (product: Product) => {
	// 	return <ProductDescription productId={product.id} product={product} />
	// }

	return (
		<>
			<Breadcrumb items={['Fornecedor']} />
			<Row justify="end">
				<Col span={4} style={{ display: 'flex', justifyContent: 'flex-end', margin: '8px 0px' }}>
					<Space size={8} align="end">
						<Button icon={<PlusSquareFilled />} onClick={() => history.push("/suppliers/new")} />
					</Space>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<TableComponent rowKey="supplierId" fetch={fetchData} columns={columns} />
				</Col>
			</Row>
		</>
	);
}
