import { Menu, Col, Row } from 'antd';
import React, { useState } from 'react';

export default function Sidemenu(props: any) {
	const [selectedKey, setSelectedKey] = useState('dashboard');

	console.log(props.items);
	return (
		<Row>
			<Col span={6}>
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
			<Col span={18}>
				<div className="container">
					{props.items.find((item: any) => item.key === selectedKey)?.content}
				</div>
			</Col>
		</Row>
	);
}
