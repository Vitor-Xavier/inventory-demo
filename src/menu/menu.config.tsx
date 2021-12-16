import {
  CodeSandboxOutlined, ShopOutlined,TeamOutlined
} from '@ant-design/icons';
import { MenuItem } from './menuItem';

const menuItems: MenuItem[] = [
    {
      key: "products",
      name: "Produtos",
      route: "/products",
      icon: <CodeSandboxOutlined />
    },
    {
      key: "suppliers",
      name: "Fornecedores",
      route: "/suppliers",
      icon: <ShopOutlined />
    },
    {
      key: "users",
      name: "Usuários",
      route: "/users",
      icon: <TeamOutlined />
    },
  ];

export default menuItems;