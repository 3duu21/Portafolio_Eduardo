import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import { Form, message } from 'antd'

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(",")
      values.skills = tempSkills
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-about", {
        ...values,
        _id: portfolioData.about._id
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
      <h1 className='mb-2 text-2xl'>Editar información de Sobre mi</h1>
      <Form onFinish={onFinish}
        layout="vertical"
        initialValues={
          {
            ...portfolioData.about,
            skills: portfolioData.about.skills.join(" , "),
          }}
      >
        <Form.Item name="lottieURL" label="Lottie URL">
          <input placeholder='Lottie URL' />
        </Form.Item>
        <Form.Item name="description1" label="Description1">
          <textarea placeholder='Description1' />
        </Form.Item>
        <Form.Item name="description2" label="Description2">
          <textarea placeholder='Description2' />
        </Form.Item>
        <Form.Item name="skills" label="Tecnologías">
          <textarea placeholder='Tecnologías' />
        </Form.Item>
        <div className='flex justify-end w-full' label="Welcome Text">
          <button className='px-8 py-2 bg-primary text-white rounded-lg' type='submit'>
            Guardar
          </button>
        </div>
      </Form>
    </div >
  );
}

export default AdminAbout;
