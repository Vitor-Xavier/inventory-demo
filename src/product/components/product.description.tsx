import { Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
import { Product } from '../product';

export default function ProductDescription(props: any) {
    const [product, setProduct] = useState<Product>({ id: 0, name: '', key: 0 });

    useEffect(() => {
        setProduct(props.product);
    }, [props.productId]);

    return (
        <Descriptions title="Product Info" column={12}>
            <Descriptions.Item label="Product Code" span={3}>{product.id}</Descriptions.Item>
            <Descriptions.Item label="Name" span={9}>{product.name}</Descriptions.Item>
            <Descriptions.Item label="Description" span={12}>{product.description}</Descriptions.Item>
        </Descriptions>
    );
}
