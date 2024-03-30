import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import { Form, message } from 'antd'

function AdminContact() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-contact", {
        ...values,
        _id: portfolioData.contact._id
      });
      dispatch(HideLoading())
      if (response.data.success) {
        message.success(response.data.message)
      } else {
        message.error(response.data.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  };

  return (

    <div className='m-10'>
      <h1 className='mb-2 text-2xl'>Editar información de intro</h1>
      <Form onFinish={onFinish} layout="vertical" initialValues = {portfolioData.contact}>
        <Form.Item name="nombre" label="Nombre">
          <input placeholder='Nombre'/>
        </Form.Item>
        <Form.Item name="edad" label="Edad">
          <input placeholder='Edad'/>
        </Form.Item>
        <Form.Item name="email" label="Correo">
          <input placeholder='Correo'/>
        </Form.Item>
        <Form.Item name="telefono" label="Telefono">
          <input placeholder='Telefono'/>
        </Form.Item>
        <div className='flex justify-end w-full' label="Welcome Text">
            <button className='px-8 py-2 bg-primary text-white rounded-lg' type='submit'>
              Guardar
            </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminContact;
