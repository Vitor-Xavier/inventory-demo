import { message } from 'antd';
import ProductForm from '../components/product.form';
import { Product } from '../product';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import productService from '../services/product.service';
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';

export default function ProductEdit(props: any) {
    const [product, setProduct] = useState<Product>({ productId: 0, key: 0, name: '', code: '', pricePerUnit: 0, minimumRequired: 0 });
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
            <Breadcrumb items={['Produto', 'Edição']} />
            <ProductForm product={product} onFinish={onFinish} handleCancel={handleCancel} />
        </>
    );
}
