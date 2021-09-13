import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { Column } from './table.column';

export default function TableComponent<T extends object>(props: any) {
	const [data, setData] = useState<T[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(10);
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

	useEffect(() => {
		fetch();
	}, []);

	const fetch = async (page?: number, size?: number) => {
		if (!props.fetch || loading) return;

		setLoading(true);
		try {
			const { data, total } = await props.fetch(page ?? currentPage, size ?? pageSize);
			setData(data);
			setTotal(total);
		} finally {
			setLoading(false);
		}
	}

	const handleSelectChange = (selectedRowKeys: any[]) => {
		setSelectedRowKeys(selectedRowKeys);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		fetch(page, pageSize);
	}

	const handlePageSizeChange = (size: number) => {
		setPageSize(size);
		fetch(currentPage, size);
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
			<Table {...props}
				pagination={{
					position: ['bottomRight'],
					onChange: handlePageChange,
					onShowSizeChange: handlePageSizeChange,
					current: currentPage,
					pageSize: pageSize,
					total: total,
				}}
				rowSelection={rowSelection}
				columns={columns}
				dataSource={data} />
		</>
	)
}