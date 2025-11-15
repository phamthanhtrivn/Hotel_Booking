import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react'

const DashBoard = () => {
  const { user} = useContext(AuthContext);
  console.log(user);
  
  return (
    <div>DashBoard</div>
  )
}

export default DashBoard