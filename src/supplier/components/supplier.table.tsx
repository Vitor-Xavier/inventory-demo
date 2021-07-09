import { Breadcrumb, Col, message, PaginationProps, Popconfirm, Row, Table, Space, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import supplierService from '../services/supplier.service';
import { Supplier } from '../supplier';
import { EditFilled, DeleteFilled, PlusSquareFilled } from '@ant-design/icons';

export default function ProductsTable(props: any) {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(10);
	const [total, setTotal] = useState<number>(0);
	const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<Supplier[]>([]);
	const history = useHistory();

	useEffect(() => {
		fetchData(0, 10);
	}, []);

	const fetchData = async (skip: number, take: number) => {
		setLoading(true);
		const response = await supplierService.getSuppliers(skip, take);
		console.log(response.data);
		const suppliers = response.data.data;
		suppliers.forEach((s: Supplier, i: number) => {
			s.key = i;
		});
		setData(suppliers);
		handleTotalChange(response.data.total);
		setLoading(false);
	};

	const onSelectChange = (selectedRowKeys: any[]) => {
		setSelectedRowKeys(selectedRowKeys);
	};

	const handleTotalChange = (total: number) => {
		setTotal(total);
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	}

	const handlePageSizeChange = (_: number, size: number) => {
		setPageSize(size);
	}

	const handleTableChange = (pagination: PaginationProps, filters: any, sorter: any) => {
		fetchData(((pagination.current || 1) - 1) * (pagination.pageSize || 10), pagination.pageSize || 10);
	}

	const columns: ColumnsType<Supplier> = [
		{
			key: 'supplierId',
			title: 'Id',
			dataIndex: 'supplierId',
		},
		{
			key: 'name',
			title: 'Nome',
			dataIndex: 'name',
		},
		{
			key: 'actions',
			title: 'Actions',
			width: '10%',
			fixed: 'right',
			align: 'center',
			render: (_, record) => {
				const link = `/suppliers/edit/${record.supplierId}`;
				return (
					<Space size={8}>
						<Button icon={<EditFilled />} onClick={() => history.push(link)} />
						<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.supplierId)}>
							<Button icon={<DeleteFilled />} />
						</Popconfirm>
					</Space>
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
		await fetchData((currentPage - 1) * pageSize, pageSize);
	}

	// const expandedRowRender = (product: Product) => {
	// 	return <ProductDescription productId={product.id} product={product} />
	// }

	return (
		<>
			<Row>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Suppliers</Breadcrumb.Item>
				</Breadcrumb>
			</Row>
			<Row justify="end">
				<Col span={4} style={{ display: 'flex', justifyContent: 'flex-end', margin: '8px 0px' }}>
					<Space size={8} align="end">
						<Button icon={<PlusSquareFilled />} onClick={() => history.push("/suppliers/new")} />
					</Space>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Table
						rowKey="supplierId"
						loading={loading}
						pagination={{
							pageSize: pageSize,
							current: currentPage,
							total: total,
							position: ['bottomRight'],
							showSizeChanger: true,
							showQuickJumper: true,
							onChange: handlePageChange,
							onShowSizeChange: handlePageSizeChange
						}}
						rowSelection={rowSelection}
						columns={columns}
						dataSource={data}
						onChange={handleTableChange} />
				</Col>
			</Row>
		</>
	);
}
