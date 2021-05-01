import { Form, Input, InputNumber, Button, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { Product } from '../product';
import ProductDescription from './product.description';

const { TextArea } = Input;

export default function ProductForm(props: any) {
	const [product, setProduct] = useState<Product>({ id: 0, name: '', key: 0, description: '' });

	useEffect(() => {
		if (props.productId) setProduct(props.product);
	}, [props.productId]);

	return (
		<Form layout="vertical" onFinish={props.onFinish}>
			<Row gutter={8}>
				<Col span={24}>
					<Form.Item label="Id">
						<InputNumber value={product.id} disabled={props.disableInputs} onChange={(value) => setProduct({ ...product, id: value })} />
					</Form.Item>
				</Col>
			</Row>
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
						<TextArea rows={2} value={product.description} onChange={(value) => setProduct({ ...product, name: value.target.value })} />
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
