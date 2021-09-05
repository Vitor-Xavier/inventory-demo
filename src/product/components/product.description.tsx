import { Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
import { Product } from '../product';
import productService from '../services/product.service';

export default function ProductDescription(props: any) {
    const [product, setProduct] = useState<Product>({ productId: 0, name: '', code: '', key: 0, pricePerUnit: 0, minimumRequired: 0 });

    useEffect(() => {
        const fetchData = async () => {
            const response = await productService.get(parseInt(props.productId));
            setProduct(response.data);
        };

        fetchData();
    }, [props.productId]);

    return (
        <Descriptions title="Dados do Produto" column={12}>
            <Descriptions.Item label="Código" span={2}>{product.productId}</Descriptions.Item>
            <Descriptions.Item label="Preço por unidade" span={2}>{product.pricePerUnit}</Descriptions.Item>
            <Descriptions.Item label="Quantidade mínima" span={2}>{product.minimumRequired}</Descriptions.Item>
            <Descriptions.Item label="Produto" span={6}>{product.name}</Descriptions.Item>
            <Descriptions.Item label="Descrição" span={12}>{product.description}</Descriptions.Item>
        </Descriptions>
    );
}
