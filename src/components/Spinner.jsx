import { Spin } from 'antd';
import React from 'react';
import '../assets/styles/SpinnnerComponent.css';

const SpinnerComponent = () => {
  return (
    <div className="spinnerContainer">
      <Spin tip="Cargando" size="large" fullscreen>
        <div className="content">
          <img src={process.env.PUBLIC_URL + '/logo.jpg'} width={'200px'} height={'200px'}/>
        </div>
      </Spin>
    </div>
  );
};
export default SpinnerComponent;
