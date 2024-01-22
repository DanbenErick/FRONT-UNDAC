import React, { useState, useEffect } from 'react';
import { Button, Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import BtnActionComponent from '../BtnActionButtonComponent';
import { getRutas } from '../../api/apiAside';
import { Link } from 'react-router-dom';
import {
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

export default function AsideComponent() {
  const [collapsed, setCollapsed] = useState(false);
  const [routes, setRoutes] = useState([
    { label: 'Icon', icon: <LaptopOutlined /> },
  ]);

  useEffect(() => {
    const fetchRoutes = getRutas();
    const itemsRoutes = fetchRoutes.map((item, index) => {
      const { nombre: label, ruta, icon } = item;
      const IconComponent = Icon[icon]; // Icon.alert
      return {
        key: index,
        label: <Link to={ruta}>{label}</Link>,
        ruta,
        icon: React.createElement(IconComponent),
      };
    });
    setRoutes(itemsRoutes);
  }, []);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <h1>Hola</h1>
      <Button
        className="btnMenuToggle"
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      {/* <Router> */}
      <Menu
        className="aside"
        theme="dark"
        mode="inline"
        inlineCollapsed={collapsed}
        defaultSelectedKeys={['0']}
        items={routes}
      ></Menu>
      {/* </Router> */}
      <BtnActionComponent />
    </div>
  );
}
