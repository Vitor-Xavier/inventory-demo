import { message } from 'antd';
import React from 'react';
import { useHistory } from "react-router-dom";
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';
import SupplierForm from '../components/supplier.form';
import supplierService from '../services/supplier.service';
import { Supplier } from '../supplier';

export default function SupplierEdit(props: any) {
    const history = useHistory();

	const onFinish = async (supplier: Supplier) => {
        await supplierService.insert(supplier);
        message.success('Fornecedor cadastrado');
        history.push("/suppliers");
	};

    const handleCancel = () => {
        history.push("/suppliers");
    }

	return (
        <>
            <Breadcrumb items={['Fornecedor', 'Inclusão']} />
            <SupplierForm onFinish={onFinish} handleCancel={handleCancel} />
        </>
    );
}
