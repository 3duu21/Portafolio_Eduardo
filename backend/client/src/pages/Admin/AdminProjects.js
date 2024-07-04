import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Form, message } from 'antd'
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice'
import axios from 'axios'

function AdminProjects() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { projects } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [form] = Form.useForm();

    const onAdd = () => {
        setSelectedItemForEdit(null);
        setShowAddEditModal(true);
        form.resetFields(); // Resetear el formulario al agregar una nuevo proyecto
    };

    const onEdit = (project) => {
        setSelectedItemForEdit(project);
        setShowAddEditModal(true);
        form.setFieldsValue(project);
    };

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response;
            if (selectedItemForEdit) {
                response = await axios.post("/api/portfolio/update-project", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await axios.post("/api/portfolio/add-project", values);
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
            const response = await axios.post("/api/portfolio/delete-project", {
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
                    Agregar Proyecto
                </button>
            </div>
            <div className='grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1'>
                {projects.map((project) => (
                    <div className='shadow border p-5 border-gray-300 flex flex-col gap-5'>
                        <h1 className='text-primary text-xl font-bold'>{project.title}</h1>
                        <hr />
                        <img src={project.image} alt='' className='h-60 w-full rounded-sm' />
                        <h1><span className='font-bold'>Descripción:</span> {project.description}</h1>
                        <div className='flex justify-end gap-5 mt-5'>
                            <div className='flex justify-end gap-5 mt-5'>
                                <button className='bg-red-700 text-white px-5 py-2 rounded-md' onClick={() => onDelete(project)}>Eliminar</button>
                                <button className='bg-primary text-white px-5 py-2 rounded-md' onClick={() => onEdit(project)}>Editar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <Modal
                visible={showAddEditModal}
                title={selectedItemForEdit ? "Editar proyecto" : "Agregar proyecto"}
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
                    <Form.Item name='technologies' label='Tecnologías'>
                        <input placeholder='Tecnologías' />
                    </Form.Item>
                    <div className='flex gap-5 justify-end'>
                        <div className='flex gap-5 justify-end'>
                            <button className='border border-primary text-primary px-5 py-2 rounded-md' onClick={() => setShowAddEditModal(false)}>Cancelar</button>
                            <button className='bg-primary text-white px-5 py-2 rounded-md'>{selectedItemForEdit ? "Actualizar" : "Agregar"}</button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default AdminProjects