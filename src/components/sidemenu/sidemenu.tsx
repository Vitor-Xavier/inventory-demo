import { Menu, Col, Row } from 'antd';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { MenuItem } from '../../menu/menuItem';

export default function Sidemenu(props: any) {
    const home = { key: "home", name: "Início", route: "/", icon: <HomeOutlined /> };
	const location = useLocation();
	const [items, setItems] = useState<MenuItem[]>([home]);
	const [selectedKeys, setSelectedKeys] = useState<string[]>(['home']);

	useEffect(() => {
		handleRedirect(location.pathname);
	}, [location]);

	useEffect(() => {
		setItems([home, ...props.items]);
	}, [props.items]);

	const handleRedirect = (route: string) => {
		if (route.startsWith('/products')) {
			setSelectedKeys(['products']);
			return;
		}
		if (route.startsWith('/suppliers')) {
			setSelectedKeys(['suppliers']);
			return;
		}
		if (route.startsWith('/users')) {
			setSelectedKeys(['users']);
			return;
		}
		if (route.startsWith('/notifications')) {
			setSelectedKeys([]);
			return;
		}
		setSelectedKeys(['home']);
	}

	return (
		<Menu theme="dark" defaultSelectedKeys={['home']} selectedKeys={selectedKeys} mode="inline" onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys?.map(k => k.toString()) || [''])}>
			{items.map((item: MenuItem) => {
				return (
					<Menu.Item key={item.key} icon={item.icon}>
						<Link to={item.route}>{item.name}</Link>
					</Menu.Item>
				)
			})}
			<Menu.Item key="logout" icon={<LogoutOutlined />} onClick={props.onLogout}>
				Sair
			</Menu.Item>
		</Menu>
	);
}
