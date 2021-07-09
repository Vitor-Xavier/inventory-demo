import { Breadcrumb, message, Row } from 'antd';
import React from 'react';
import { useHistory } from "react-router-dom";
import SupplierForm from '../components/supplier.form';
import supplierService from '../services/supplier.service';
import { Supplier } from '../supplier';

export default function SupplierEdit(props: any) {
    const history = useHistory();

	const onFinish = async (supplier: Supplier) => {
        await supplierService.insert(supplier);
        message.success('Supplier added');
        history.push("/suppliers");
	};

    const handleCancel = () => {
        history.push("/suppliers");
    }

	return (
        <>
            <Row>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Suppliers</Breadcrumb.Item>
                    <Breadcrumb.Item>New</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <SupplierForm onFinish={onFinish} handleCancel={handleCancel} />
        </>
    );
}
