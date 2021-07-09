import { Breadcrumb, Col, message, Popconfirm, Row, PaginationProps, Table } from 'antd';
import React, { useEffect, useState } from 'react';


export default function TableComponent(props: any) {
    const [pagination, setPagination] = useState<PaginationProps>({ current: 1, pageSize: 10, pageSizeOptions: ['10', '20', '50', '100'] });
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

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
        <Table pagination={{ position: ['bottomRight'], onChange: handlePageChange, onShowSizeChange: handlePageSizeChange }} rowSelection={rowSelection} columns={props.columns} dataSource={props.data} />
        </>
    )
}