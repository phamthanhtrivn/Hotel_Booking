import React, { useState } from 'react'
import logo from '../../assets/about/logo.jpg'
import add from '../../assets/about/add.png'
import setting from '../../assets/about/setting.png'
import list from '../../assets/about/list.png'
import logout from '../../assets/about/logout.png'
import searchh from '../../assets/about/searchh.png'

const AdminHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className='bg-white shadow-lg shadow-gray-300 px-8 py-3 flex items-center justify-between rounded-full mt-1'>
 
      <div className='flex items-center space-x-3'>
        <img src={logo} alt="Logo" className='h-10 w-10 rounded-full border-2 border-gray-300' />
        <p className='font-bold text-3xl text-gray-800 font-serif tracking-wide'>TWAN</p>
      </div>

      <div className='relative w-96'>
        <input
          type="text"
          className='w-full rounded-full border border-gray-300 pl-10 pr-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm'
          placeholder='Search here...'
        />
        <img src={searchh} alt="Search" className='absolute left-3 top-2.5 h-5 w-5 opacity-70' />
      </div>

 
      <div className='flex items-center space-x-5'>
        <p className='text-gray-700 font-semibold text-lg'>Hello, <span className='text-blue-600'>Pham Minh Hieu</span></p>

        <div className='relative'>
          <button
            onClick={() => setOpen(!open)}
            className='flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full border border-gray-300 hover:bg-gray-200 transition-all'
          >
            <img src={logo} alt="Avatar" className='h-8 w-8 rounded-full border border-gray-300' />
            <span className='text-gray-800 font-medium'>My Account</span>
          </button>

          {open && (
            <div className='absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-lg shadow-gray-400 p-3 z-50 border border-gray-100'>
              <a href="#" className='flex items-center p-2 rounded-xl hover:bg-gray-100 transition'>
                <img src={setting} alt="" className='h-5 w-5 opacity-80' />
                <p className='ml-3 text-gray-800 font-medium'>Cài đặt</p>
              </a>
              <a href="#" className='flex items-center p-2 rounded-xl hover:bg-gray-100 transition'>
                <img src={list} alt="" className='h-5 w-5 opacity-80' />
                <p className='ml-3 text-gray-800 font-medium'>Danh sách nhân viên</p>
              </a>
              <a href="#" className='flex items-center p-2 rounded-xl hover:bg-gray-100 transition'>
                <img src={add} alt="" className='h-5 w-5 opacity-80' />
                <p className='ml-3 text-gray-800 font-medium'>Thêm nhân viên</p>
              </a>
              <a href="#" className='flex items-center p-2 rounded-xl hover:bg-gray-100 transition'>
                <img src={logout} alt="" className='h-5 w-5 opacity-80' />
                <p className='ml-3 text-red-600 font-semibold'>Đăng xuất</p>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
