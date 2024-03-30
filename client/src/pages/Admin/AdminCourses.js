import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Form, message } from 'antd'
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice'
import axios from 'axios'

function AdminCourses() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { courses } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [form] = Form.useForm();

    const onAdd = () => {
        setSelectedItemForEdit(null);
        setShowAddEditModal(true);
        form.resetFields(); // Resetear el formulario al agregar una nuevo proyecto
    };

    const onEdit = (course) => {
        setSelectedItemForEdit(course);
        setShowAddEditModal(true);
        form.setFieldsValue(course);
    };

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response;
            if (selectedItemForEdit) {
                response = await axios.post("/api/portfolio/update-course", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await axios.post("/api/portfolio/add-course", values);
            }
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModal(false);
                setSelectedItemForEdit(null);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const onDelete = async (item) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/portfolio/delete-course", {
                _id: item._id
            });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    return (
        <div>
            <div className='flex justify-end'>
                <button className='bg-primary px-5 py-2 text-white rounded-md'
                    onClick={onAdd}>
                    Agregar Curso
                </button>
            </div>
            <div className='grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1'>
                {courses.map((course) => (
                    <div className='shadow border p-5 border-gray-300 flex flex-col gap-5'>
                        <h1 className='text-primary text-xl font-bold'>{course.title}</h1>
                        <hr />
                        <img src={course.image} alt='' className='h-60 w-full rounded-sm' />
                        <h1><span className='font-bold'>Descripción:</span> {course.description}</h1>
                        <div className='flex justify-end gap-5 mt-5'>
                            <button className='bg-red-700 text-white px-5 py-2 rounded-md' onClick={() => onDelete(course)}>Eliminar</button>
                            <button className='bg-primary text-white px-5 py-2 rounded-md' onClick={() => onEdit(course)}>Editar</button>
                        </div>
                    </div>
                ))}
            </div>


            <Modal
                visible={showAddEditModal}
                title={selectedItemForEdit ? "Editar curso" : "Agregar curso"}
                footer={null}
                onCancel={() => setShowAddEditModal(false)}
            >

                <Form form={form} layout='vertical' onFinish={onFinish}
                    initialValues={selectedItemForEdit || {}}
                >
                    <Form.Item name='title' label='Título'>
                        <input placeholder='Título' />
                    </Form.Item>
                    <Form.Item name='image' label='Imagen URL'>
                        <input placeholder='Imagen URL' />
                    </Form.Item>
                    <Form.Item name='description' label='Descripción'>
                        <textarea placeholder='Descripción' />
                    </Form.Item>
                    <Form.Item name='link' label='Demo Link'>
                        <input placeholder='Link' />
                    </Form.Item>
                    <div className='flex gap-5 justify-end'>
                            <button className='border border-primary text-primary px-5 py-2 rounded-md' onClick={() => setShowAddEditModal(false)}>Cancelar</button>
                            <button className='bg-primary text-white px-5 py-2 rounded-md'>{selectedItemForEdit ? "Actualizar" : "Agregar"}</button>
                        </div>
                </Form>
            </Modal>
        </div>
    )
}

export default AdminCourses