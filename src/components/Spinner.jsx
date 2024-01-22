import { Spin } from 'antd';
import React from 'react';
import '../assets/styles/SpinnnerComponent.css';

const SpinnerComponent = () => {
  return (
    <div className="spinnerContainer">
      <Spin tip="Cargando1" size="large">
        <div className="content" />
      </Spin>
    </div>
  );
};
export default SpinnerComponent;
