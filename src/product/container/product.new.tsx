import { message } from 'antd';
import React from 'react';
import { useHistory } from "react-router-dom";
import ProductForm from '../components/product.form';
import { Product } from '../product';
import productService from '../services/product.service';
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';

export default function ProductNew(props: any) {
    const history = useHistory();

    const onFinish = async (product: Product) => {
        await productService.insert(product);
        message.success('Produto cadastrado');
        history.push("/products");
    };

    const handleCancel = () => {
        history.push("/products");
    }

    return (
        <>
            <Breadcrumb items={['Produto', 'Inclusão']} />
            <ProductForm onFinish={onFinish} handleCancel={handleCancel} />
        </>
    )
}
