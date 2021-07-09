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
import ProductNew from './product/container/product.new';
import ProductEdit from './product/container/product.edit';
import SupplierTable from './supplier/components/supplier.table';
import SupplierNew from './supplier/container/supplier.new';
import SupplierEdit from './supplier/container/supplier.edit';
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
              <Route path="/products" exact component={ProductTable} />
              <Route path="/products/new" exact component={ProductNew} />
              <Route path="/products/edit/:id" exact component={ProductEdit} />
              <Route path="/suppliers" exact component={SupplierTable} />
              <Route path="/suppliers/new" exact component={SupplierNew} />
              <Route path="/suppliers/edit/:id" exact component={SupplierEdit} />
            </Content>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
}
