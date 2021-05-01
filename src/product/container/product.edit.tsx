import { Breadcrumb, Row, message } from 'antd';
import React from 'react';
import ProductForm from '../components/product.form';
import { Product } from '../product';
import { useHistory } from "react-router-dom";

export default function ProductEdit(props: any) {
    const history = useHistory();

	const onFinish = (product: Product) => {
		console.log('Edited product: ', product);
        message.success('Product edited');
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
                    <Breadcrumb.Item>Edit</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <ProductForm onFinish={onFinish} handleCancel={handleCancel} />
        </>
    );
}
