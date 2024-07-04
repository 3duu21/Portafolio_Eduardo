import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import AdminIntro from './AdminIntro';
import AdminAbout from './AdminAbout';
import { Tabs } from 'antd';
import AdminExperiences from './AdminExperiences';
import AdminProjects from './AdminProjects';
import AdminCourses from './AdminCourses';
import AdminContact from './AdminContact';
const { TabPane } = Tabs;

function Admin() {
  const { portfolioData } = useSelector((state) => state.root)


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login"
    }
  }, [])

  return (
    <div>
      <Header />
      <div className='flex gap-10 items-center px-5 py-2 mt-28 justify-between'>
        <div className='flex gap-10 items-center'>
          <h1 className='text-3xl text-primary'>Portafolio Admin</h1>
          <div className='w-60 h-[2px] bg-gray-500 sm:hidden'></div>
        </div>
        <h1 className='underline text-primary text-lg cursor-pointer'
          onClick={() => {
            localStorage.removeItem("token")
            window.location.href = "/admin-login"
          }}
        >Cerrar Sesión</h1>
      </div>
      {portfolioData && <div className="px-5 pb-10">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Intro" key="1">
            <AdminIntro />
          </TabPane>
          <TabPane tab="About" key="2">
            <AdminAbout />
          </TabPane>
          <TabPane tab="Experiences" key="3">
            <AdminExperiences />
          </TabPane>
          <TabPane tab="Projects" key="4">
            <AdminProjects />
          </TabPane>
          <TabPane tab="Courses" key="5">
            <AdminCourses />
          </TabPane>
          <TabPane tab="Contacto" key="6">
            <AdminContact />
          </TabPane>
        </Tabs>
      </div>}
    </div>
  );
}

export default Admin;
