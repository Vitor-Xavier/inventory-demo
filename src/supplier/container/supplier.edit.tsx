import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';
import SupplierForm from '../components/supplier.form';
import supplierService from '../services/supplier.service';
import { Supplier } from '../supplier';

export default function SupplierEdit(props: any) {
    const [supplier, setSupplier] = useState<Supplier>({ supplierId: 0, key: 0, name: '' });
    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
		const fetchData = async () => {
			const response = await supplierService.get(parseInt(id));
			setSupplier(response.data);
		};

		fetchData();
	}, [id]);

	const onFinish = async (supplier: Supplier) => {
        await supplierService.update(parseInt(id), supplier);
        message.success('Fornecedor alterado');
        history.push("/suppliers");
	};

    const handleCancel = () => {
        history.push("/suppliers");
    }

	return (
        <>
            <Breadcrumb items={['Fornecedor', 'Edição']} />
            <SupplierForm supplier={supplier} onFinish={onFinish} handleCancel={handleCancel} />
        </>
    );
}
