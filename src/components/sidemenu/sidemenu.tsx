import { Menu } from 'antd';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

export default function Sidemenu(props: any) {
	const [selectedKey, setSelectedKey] = useState('dashboard');

	console.log(props.items);
	return (
		<Row>
			<Col lg={3}>
				<Menu
					onClick={(e) => setSelectedKey(e.key?.toString())}
					style={{ width: 256 }}
					mode="inline"
				>
					{props.items.map((item: any) => (
						<Menu.Item key={item.key}>{item.title}</Menu.Item>
					))}
				</Menu>
			</Col>
			<Col lg={9}>
				<div className="container">
					{props.items.find((item: any) => item.key === selectedKey)?.content}
				</div>
			</Col>
		</Row>
	);
}
