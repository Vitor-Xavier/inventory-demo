import { LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import './App.css';
import Home from './home/components/home';
import './index.css';
import LoginForm from './login/components/login.form';
import menuItems from './menu/menu.config';
import { MenuItem } from './menu/menuItem';
import productRoutes from './product/product.routes';
import supplierRoutes from './supplier/supplier.routes';
import userRoutes from './user/user.routes';
const { Header, Content, Sider } = Layout;

const resetToken = () => {
  sessionStorage.removeItem('token');
}

const getToken = (): string | null => {
  return sessionStorage.getItem('token');
}

export default function App() {
  const [token, setToken] = useState(() => {
    return getToken();
  });
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['home']);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    resetToken();
    setToken(null);
  }

  const handleRedirect = (route: string) => {
    if (route.startsWith('/products')) {
      setSelectedKeys(['products']);
      return;
    }
    if (route.startsWith('/suppliers')) {
      setSelectedKeys(['suppliers']);
      return;
    }
    setSelectedKeys(['home']);
  }

  if (!token) return <LoginForm setToken={setToken} onRedirect={handleRedirect} />

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['home']} selectedKeys={selectedKeys} mode="inline" onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys?.map(k => k.toString()) || [''])}>
            <Menu.Item key="home" icon={<DashboardOutlined />}>
              <Link to="/">Início</Link>
            </Menu.Item>
            {menuItems.map((item: MenuItem) => {
              return (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.route}>{item.name}</Link>
                </Menu.Item>
              )
            })}
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
              Sair
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route path="/" exact component={Home} />
              {productRoutes.map(s => s)}
              {supplierRoutes.map(s => s)}
              {userRoutes.map(s => s)}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
