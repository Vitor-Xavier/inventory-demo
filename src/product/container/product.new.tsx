import { Breadcrumb, Row, message } from 'antd';
import React from 'react';
import ProductForm from '../components/product.form';
import { Product } from '../product';
import { useHistory } from "react-router-dom";

export default function ProductNew(props: any) {
    const history = useHistory();

    const onFinish = (product: Product) => {
        console.log('Submit product: ', product);
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
