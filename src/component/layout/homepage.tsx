'use client'

import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';

const Homepage = () => (
  <Result
    icon={<SmileOutlined />}
    title="Great, You are in Xuan Viet Web create by @XuanVietDev!"
    // extra={<Button type="primary">Next</Button>}
  />
);

export default Homepage;