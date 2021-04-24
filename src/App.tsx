import {
  CodeSandboxOutlined, ShopOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import './App.css';
import Home from './home/components/home';
import './index.css';
import ProductTable from './product/components/product.table';
import SupplierTable from './supplier/components/supplier.table';
const { Header, Content, Sider } = Layout;

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Router>
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['home']} mode="inline">
              <Menu.Item key="home" icon={<CodeSandboxOutlined />}>
                <Link to="/">Início</Link>
              </Menu.Item>
              <Menu.Item key="products" icon={<CodeSandboxOutlined />}>
                <Link to="/products">Produtos</Link>
              </Menu.Item>
              <Menu.Item key="suppliers" icon={<ShopOutlined />}>
                <Link to="/suppliers">Fornecedores</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Route path="/" exact component={Home} />
              <Route path="/products" component={ProductTable} />
              <Route path="/suppliers" component={SupplierTable} />
            </Content>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
}