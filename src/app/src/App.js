import React from 'react';
import axios from 'axios';
import { notification, Input, Spin } from 'antd';
import './app.css';

function App() {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const openNotification = () => {
    api.open({
      message: 'Complete',
      description:
        '',
      duration: 0,
    });
  };

  const onPressEnter = async(e) => {
    setLoading(true)
    const results = await axios.get(`http://localhost:8000/download_file?cid=${e.target.value}`)
    openNotification()
    setLoading(false)
  }

  return (
    <div className="app">
      {contextHolder}
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div className='head'>FilFetch</div>
        <div className='search-box'>
          <Input placeholder="..." style={{ width: 600 }} loading={loading} onPressEnter={onPressEnter} enterButton />
        </div>
      </div>
    </div>
  );
}

export default App;
