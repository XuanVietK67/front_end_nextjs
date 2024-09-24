'use client'

import React from 'react';
import { PiCrownSimpleLight } from "react-icons/pi";
import { Button, Result } from 'antd';

const Homepage = () => (
    <div style={{padding:50}}>
        <Result
            icon={<PiCrownSimpleLight size={100} color={'violet'} />}
            title="Fullstack Next/Nest- Create by XuanVietDev"
        />
    </div>
);

export default Homepage