import {
  CodeSandboxOutlined, ShopOutlined
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
  ];

export default menuItems;