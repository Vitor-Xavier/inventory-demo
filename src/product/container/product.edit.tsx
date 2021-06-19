import { Breadcrumb, Row, message } from 'antd';
import ProductForm from '../components/product.form';
import { Product } from '../product';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import productService from '../services/product.service';

export default function ProductEdit(props: any) {
    const [product, setProduct] = useState<Product>({ productId: 0, key: 0, name: '', pricePerUnit: 0 });
    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
		const fetchData = async () => {
			const response = await productService.get(parseInt(id));
			setProduct(response.data);
		};

		fetchData();
	}, [id]);

	const onFinish = async (product: Product) => {
        await productService.update(parseInt(id), product);
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
            <ProductForm product={product} onFinish={onFinish} handleCancel={handleCancel} />
        </>
    );
}
