import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { FloatButton } from 'antd';
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAuthAdmin from '../hooks/useAuthAdmin';

const BtnActionComponent = () => {
  const authCont = useContext(AuthContext);
  const { logout } = useAuthAdmin();
  const cerrarSesion = () => {
    logout();
  };
  return (
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{
        right: 24,
      }}
      tooltip={<div>{authCont.user.name}</div>}
      icon={<UserOutlined />}
    >
      <FloatButton
        type="primary"
        icon={<LogoutOutlined />}
        tooltip={<div>Salir</div>}
        onClick={cerrarSesion}
      />
      <FloatButton
        type="primary"
        icon={<SettingOutlined />}
        tooltip={<div>Configuracion</div>}
      />
    </FloatButton.Group>
  );
};

export default BtnActionComponent;
