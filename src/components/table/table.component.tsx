import { Breadcrumb, Col, message, Popconfirm, Row, PaginationProps, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Column } from './table.column';

export default function TableComponent<T extends object>(props: any) {
	const [pagination, setPagination] = useState<PaginationProps>({ current: 1, pageSize: 10, pageSizeOptions: ['10', '20', '50', '100'] });
	const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
	const [columns, setColumns] = useState<ColumnsType<T>>([]);

	useEffect(() => {
		setColumns(props.columns.map((c: Column<T>) => ({
			dataIndex: c.dataIndex,
			title: c.title,
			width: c.width,
			align: c.align,
			fixed: c.fixed,
			render: c.render
		})));
	}, [props.columns]);

	const handleSelectChange = (selectedRowKeys: any[]) => {
		setSelectedRowKeys(selectedRowKeys);
	};

	const handlePageChange = (page: number) => {
		setPagination({ ...pagination, current: page });
	}

	const handlePageSizeChange = (size: number) => {
		setPagination({ ...pagination, pageSize: size });
	}

	const rowSelection = {
		selectedRowKeys,
		onChange: handleSelectChange,
		selections: [
			Table.SELECTION_ALL,
			Table.SELECTION_INVERT,
			Table.SELECTION_NONE,
		]
	};

	return (
		<>
			<Table {...props} pagination={{ position: ['bottomRight'], onChange: handlePageChange, onShowSizeChange: handlePageSizeChange }} rowSelection={rowSelection} columns={columns} dataSource={props.data} />
		</>
	)
}