import { Form, Input, InputNumber, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Product } from '../product';

const { TextArea } = Input;

export default function ProductForm(props: any) {
	const [product, setProduct] = useState<Product>({ id: 0, name: '', key: 0, description: '' });

	useEffect(() => {
		setProduct(props.product);
	}, [props.productId]);

	const onFinish = () => {
		console.log('Submit values: ', product);
	};

	return (
		<Form onFinish={onFinish}>
			<Form.Item label="Id">
				<InputNumber value={product.id} disabled={props.disableInputs} onChange={(value) => setProduct({ ...product, id: value })} />
			</Form.Item>
			<Form.Item label="Name">
				<Input value={product.name} disabled={props.disableInputs} onChange={(value) => setProduct({ ...product, name: value.target.value })} />
			</Form.Item>
			<TextArea rows={2} value={product.description} onChange={(value) => setProduct({ ...product, name: value.target.value })} />
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
        			</Button>
			</Form.Item>
		</Form>

	);
}
