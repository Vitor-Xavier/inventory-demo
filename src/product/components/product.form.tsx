import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Product } from '../product';

const { TextArea } = Input;

export default function ProductForm(props: any) {
	const [product, setProduct] = useState<Product>({ productId: 0, name: '', code: '', key: 0, description: '', pricePerUnit: 0, minimumRequired: 0 });

	useEffect(() => {
		if (props.product) setProduct(props.product);
	}, [props.product]);

	return (
		<Form layout="vertical" onFinish={() => props.onFinish(product)}>
			<Row gutter={8}>
				<Col span={4}>
					<Form.Item label="Código">
						<Input value={product.code} disabled={props.disableInputs} onChange={(value) => setProduct({ ...product, code: value.target.value })} />
					</Form.Item>
				</Col>
				<Col span={4}>
					<Form.Item label="Preço por unidade">
						<InputNumber value={product.pricePerUnit} decimalSeparator="," min={0} onChange={(value) => setProduct({ ...product, pricePerUnit: value })} style={{
							width: '100%',
						}} />
					</Form.Item>
				</Col>
				<Col span={4}>
					<Form.Item label="Quantidade mínima">
						<InputNumber value={product.minimumRequired} decimalSeparator="," min={0} onChange={(value) => setProduct({ ...product, minimumRequired: value })} style={{
							width: '100%',
						}} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Nome">
						<Input value={product.name} disabled={props.disableInputs} onChange={(value) => setProduct({ ...product, name: value.target.value })} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={8}>
				<Col span={24}>
					<Form.Item label="Descrição">
						<TextArea rows={2} value={product.description} onChange={(value) => setProduct({ ...product, description: value.target.value })} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={8} justify="end">
				<Button type="primary" htmlType="submit">Salvar</Button>
				<Button type="default" htmlType="button" onClick={props.handleCancel}>Cancelar</Button>
			</Row>
		</Form>
	);
}
