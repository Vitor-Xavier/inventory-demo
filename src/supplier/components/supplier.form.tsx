import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Supplier } from '../supplier';

export default function ProductForm(props: any) {
	const [supplier, setSupplier] = useState<Supplier>({ supplierId: 0, key: 0, name: '' });

	useEffect(() => {
		if (props.supplier) setSupplier(props.supplier);
	}, [props.supplier]);

	return (
		<Form layout="vertical" onFinish={() => props.onFinish(supplier)}>
			<Row gutter={8}>
				<Col span={24}>
					<Form.Item label="Name">
						<Input value={supplier.name} disabled={props.disableInputs} onChange={(value) => setSupplier({ ...supplier, name: value.target.value })} />
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
