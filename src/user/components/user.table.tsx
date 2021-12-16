import { DeleteFilled, EditFilled, PlusSquareFilled } from '@ant-design/icons';
import { Button, Col, message, Popconfirm, Row, Space } from 'antd';
import React from 'react';
import { useHistory } from "react-router-dom";
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';
import { Column, getDefaultActionsColumn } from '../../components/table/table.column';
import TableComponent from '../../components/table/table.component';
import userService from '../services/user.service';
import { User } from '../user';

export default function UsersTable(props: any) {
	const history = useHistory();

	const fetchData = async (page: number, size: number) => {
		const response = await userService.getUsers((page - 1) * size, size);
		const { data, total } = response.data;
		
		return { data: data, total: total }
	};

	const columns: Column<User>[] = [
		{
			title: 'Id',
			dataIndex: 'userId',
			width: '15%'
		},
        {
			title: 'Usuário',
			dataIndex: 'username',
			width: '30%'
		},
		{
			title: 'Nome',
			dataIndex: 'name',
			width: '40%'
		},
		{
			...getDefaultActionsColumn<User>(),
			render: (_, record) => {
				const link = `/users/edit/${record.userId}`;
				return (
					<Space size={8}>
						<Button icon={<EditFilled />} onClick={() => history.push(link)} />
						<Popconfirm title="Remover usuário?" onConfirm={() => handleDelete(record.userId)}>
							<Button icon={<DeleteFilled />} />
						</Popconfirm>
					</Space>
				);
			},
		},
	];

	const handleDelete = async (supplierId: number) => {
		await userService.delete(supplierId);
		message.success('Usuário removido');
		//await fetchData((currentPage - 1) * pageSize, pageSize);
	}

	// const expandedRowRender = (product: Product) => {
	// 	return <ProductDescription productId={product.id} product={product} />
	// }

	return (
		<>
			<Breadcrumb items={['Usuário']} />
			<Row justify="end">
				<Col span={4} style={{ display: 'flex', justifyContent: 'flex-end', margin: '8px 0px' }}>
					<Space size={8} align="end">
						<Button icon={<PlusSquareFilled />} onClick={() => history.push("/users/new")} />
					</Space>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<TableComponent
						rowKey="userId"
						fetch={fetchData}
						columns={columns} />
				</Col>
			</Row>
		</>
	);
}
