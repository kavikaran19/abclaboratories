import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const layout = () => {
  return (
    <div className="flex">
        <Sidebar/>
        <div className='md:pl-[260px] md:pt-[30px] p-3'>

        <Outlet/>
        </div>
       

    </div>
  )
}

export default layout