import { Breadcrumb, message, Row } from 'antd';
import React from 'react';
import { useHistory } from "react-router-dom";
import ProductForm from '../components/product.form';
import { Product } from '../product';
import productService from '../services/product.service';

export default function ProductNew(props: any) {
    const history = useHistory();

    const onFinish = async (product: Product) => {
        await productService.insert(product);
        message.success('Product added');
        history.push("/products");
    };

    const handleCancel = () => {
        history.push("/products");
    }

    return (
        <>
            <Row>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Products</Breadcrumb.Item>
                    <Breadcrumb.Item>New</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <ProductForm onFinish={onFinish} handleCancel={handleCancel} />
        </>
    )
}
