import { DeleteFilled, EditFilled, PlusSquareFilled } from '@ant-design/icons';
import { Button, Col, message, Popconfirm, Row, Space } from 'antd';
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';
import { Column, getDefaultActionsColumn } from '../../components/table/table.column';
import TableComponent from '../../components/table/table.component';
import { Product } from '../product';
import productService from '../services/product.service';
import ProductDescription from './product.description';

export default function ProductsTable(props: any) {
	const history = useHistory();

	useEffect(() => {
		fetchData(1, 10);
	}, []);

	const fetchData = async (page: number, size: number) => {
		const response = await productService.getProducts((page - 1) * size, size);
		const { data, total } = response.data;
		data.forEach((s: Product, i: number) => {
			s.key = i;
		});

		return { data: data, total: total };
	};

	const handleDelete = async (supplierId: number) => {
		await productService.delete(supplierId);
		message.success('Product deleted');
		await fetchData(1, 10);
	}

	const columns: Column<Product>[] = [
		{
			title: 'Id',
			dataIndex: 'productId',
			width: '15%',
		},
		{
			title: 'Código',
			width: '20%',
			dataIndex: 'code',
		},
		{
			title: 'Produto',
			width: '50%',
			dataIndex: 'name',
		},
		{
			...getDefaultActionsColumn<Product>(),
			render: (_, record) => {
				const link = `/products/edit/${record.productId}`;
				return (
					<Space size={8}>
						<Button icon={<EditFilled />} onClick={() => history.push(link)} />
						<Popconfirm title="Remover produto?" onConfirm={() => handleDelete(record.productId)}>
							<Button icon={<DeleteFilled />} />
						</Popconfirm>
					</Space>
				);
			},
		},
	];

	const expandedRowRender = (product: Product) => {
		return <ProductDescription productId={product.productId} product={product} />
	}

	return (
		<>
			<Breadcrumb items={['Produto']} />
			<Row justify="end">
				<Col span={4} style={{ display: 'flex', justifyContent: 'flex-end', margin: '8px 0px' }}>
					<Space size={8} align="end">
						<Button icon={<PlusSquareFilled />} onClick={() => history.push("/products/new")} />
					</Space>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<TableComponent rowKey="productId" fetch={fetchData} expandable={{ expandedRowRender }} columns={columns} />
				</Col>
			</Row>
		</>
	);
}