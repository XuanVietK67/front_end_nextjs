'use client'

import React from 'react';
import { Button, Result } from 'antd';
import { FaCrown } from 'react-icons/fa';
import { PiCrownSimpleLight } from 'react-icons/pi';
import Link from 'next/link';

const Homepage = () => (
  <Result
    icon={<PiCrownSimpleLight fontSize={'8vw'} color='#ee6722'/>}
    title=<p> Please log in if you have an account <br/> or register if not to use more features </p>
    extra={[
      <Button type='primary'>
        <Link href={'/auth/login'}>Login</Link>
      </Button>,
      <Button type='dashed'>
        <Link href={'/auth/register'}>Register</Link>
      </Button>
    ]}
  />

);

export default Homepage;