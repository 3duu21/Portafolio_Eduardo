import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, message } from 'antd';
import axios from 'axios';
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';

function AdminExperiences() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { experiences } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [form] = Form.useForm();

    const onAdd = () => {
        setSelectedItemForEdit(null);
        setShowAddEditModal(true);
        form.resetFields(); // Resetear el formulario al agregar una nueva experiencia
    };
    
    const onEdit = (experience) => {
        setSelectedItemForEdit(experience);
        setShowAddEditModal(true);
        form.setFieldsValue(experience);
    };

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response;
            if (selectedItemForEdit) {
                response = await axios.post("/api/portfolio/update-experience", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await axios.post("/api/portfolio/add-experience", values);
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
            const response = await axios.post("/api/portfolio/delete-experience", {
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
                <button className='bg-primary px-5 py-2 text-white rounded-md' onClick={onAdd}>Agregar Experiencia</button>
            </div>
            <div className='grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1'>
                {experiences.map((experience) => (
                    <div key={experience._id} className='shadow border p-5 border-gray-300 flex flex-col'>
                        <h1 className='text-primary text-xl font-bold'>{experience.period}</h1>
                        <hr />
                        <h1>Compañia: {experience.company}</h1>
                        <h1>Rol: {experience.title}</h1>
                        <h1>{experience.description}</h1>
                        <div className='flex justify-end gap-5 mt-5'>
                            <button className='bg-red-700 text-white px-5 py-2 rounded-md' onClick={() => onDelete(experience)}>Eliminar</button>
                            <button className='bg-primary text-white px-5 py-2 rounded-md' onClick={() => onEdit(experience)}>Editar</button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                visible={showAddEditModal}
                title={selectedItemForEdit ? "Editar experiencia" : "Agregar Experiencia"}
                footer={null}
                onCancel={() => setShowAddEditModal(false)}
            >
                <Form form={form} layout='vertical' onFinish={onFinish} initialValues={selectedItemForEdit || {}}>
                    <Form.Item name='period' label='Periodo'>
                        <input placeholder='Periodo' />
                    </Form.Item>
                    <Form.Item name='company' label='Compañia'>
                        <input placeholder='Compañia' />
                    </Form.Item>
                    <Form.Item name='title' label='Título'>
                        <input placeholder='Título' />
                    </Form.Item>
                    <Form.Item name='description' label='Descripción'>
                        <input placeholder='Descripción' />
                    </Form.Item>
                    <div className='flex gap-5 justify-end'>
                        <button className='border border-primary text-primary px-5 py-2 rounded-md' onClick={() => setShowAddEditModal(false)}>Cancelar</button>
                        <button className='bg-primary text-white px-5 py-2 rounded-md'>{selectedItemForEdit ? "Actualizar" : "Agregar"}</button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default AdminExperiences;
