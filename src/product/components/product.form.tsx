import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Product } from '../product';

const { TextArea } = Input;

export default function ProductForm(props: any) {
	const [product, setProduct] = useState<Product>({ productId: 0, name: '', key: 0, description: '', pricePerUnit: 0 });

	useEffect(() => {
		if (props.product) setProduct(props.product);
	}, [props.product]);

	return (
		<Form layout="vertical" onFinish={() => props.onFinish(product)}>
			<Row gutter={8}>
				<Col span={24}>
					<Form.Item label="Name">
						<Input value={product.name} disabled={props.disableInputs} onChange={(value) => setProduct({ ...product, name: value.target.value })} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={8}>
				<Col span={24}>
					<Form.Item label="Description">
						<TextArea rows={2} value={product.description} onChange={(value) => setProduct({ ...product, description: value.target.value })} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={8} justify="end">
				<Button type="primary" htmlType="submit">Submit</Button>
				<Button type="default" htmlType="button" onClick={props.handleCancel}>Cancel</Button>
			</Row>
		</Form>

	);
}
