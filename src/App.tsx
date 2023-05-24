import { NotificationOutlined } from '@ant-design/icons';
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Badge, Col, Layout, Menu, notification, Row, Space } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory } from "react-router-dom";
import './App.css';
import Home from './home/components/home';
import './index.css';
import LoginForm from './login/components/login.form';
import menuItems from './menu/menu.config';
import Notifications from './notification/components/notification.table';
import notificationService from './notification/services/notification.service';
import productRoutes from './product/product.routes';
import supplierRoutes from './supplier/supplier.routes';
import userRoutes from './user/user.routes';
import Sidemenu from './components/sidemenu/sidemenu';
const { Header, Content, Sider } = Layout;

const resetToken = () => {
  sessionStorage.removeItem('token');
}

const getToken = (): string | null => {
  return sessionStorage.getItem('token');
}

const notificationType = (type: number) => {
  switch (type) {
    case 2:
      return 'info'
    case 3:
      return 'warning'
    case 4:
      return 'error'
    default:
      return 'success';
  }
}

export default function App() {
  const history = useHistory();
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const [token, setToken] = useState(() => {
    return getToken();
  });
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [notificationStatus, setNotificationStatus] = useState<'default' | 'processing' | undefined>(undefined);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    resetToken();
    setToken(null);
  }

  const getNotificationCount = async () => {
    setNotificationStatus('processing');
    const response = await notificationService.getNotificationCount();
    setNotificationCount(response.data);
    setNotificationStatus(undefined);
  }

  useEffect(() => {
    if (!token) {
      if (connection?.state !== 'Disconnected')
        connection?.stop();

      setConnection(null);
    } else {
      getNotificationCount();

      const connect = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/hubs/notifications", { accessTokenFactory: () => token || "" })
        .build();

      setConnection(connect);
    }
  }, [token]);

  useEffect(() => {
    if (!connection) return;

    const start = async () => {
      try {
        if (connection.state === 'Disconnected') await connection?.start();
      } catch (err) {
        console.log("Erro SignalR 1", err);
        setTimeout(start, 5000);
      }
    }

    connection.on("UpdateCount", (count: number) => {
      setNotificationCount(count);
    });

    connection.on("ReceiveMessage", (id: number, user: string, title: string, message: string, type: number, route: string) => {
      getNotificationCount();
      const ntype = notificationType(type);

      const notificationDto = {
        key: `notification-${id}`, 
        message: title,
        description: message,
        onClick: async () => {
          if (route) history.push(route);// console.log(`redirect to ${route}`);
          else console.log('Notification 1 Clicked!');
          await notificationService.read(id);
          notification.close(`notification-${id}`);
        },
        onClose: async () => {
          await notificationService.read(id);
        }
      };

      if (type === 0)
        notification.open(notificationDto);
      else
        notification[ntype](notificationDto);
    });

    start();
  }, [connection]);

  if (!token) return <LoginForm setToken={setToken} />

  return (
    <Layout>
      <Header className="header" style={{ paddingRight: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col span={6} ><div className="logo" /></Col>
          <Col span={6} offset={12} style={{ textAlign: 'end' }} >
            <Space size={8} align="end">
              <Link to="/notifications">
                <Badge count={notificationCount} size='small' status={notificationStatus}>
                  <NotificationOutlined style={{ fontSize: 16, color: 'gray' }} />
                </Badge>
              </Link>
            </Space>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Sidemenu items={menuItems} onLogout={handleLogout}/>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/notifications" exact component={Notifications} />
              {productRoutes.map(s => s)}
              {supplierRoutes.map(s => s)}
              {userRoutes.map(s => s)}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
