import React from 'react'
import { useSelector } from 'react-redux'
import cv from '../../img/CV-EduardoZapata2024AcutalizadoSinRenta.pdf'

function Intro() {
    const { loading, portfolioData } = useSelector((state) => state.root)
    const { intro } = portfolioData
    const { firstName, lastName, welcomeText, description, caption } = intro
    return (
        <div className='h-[90vh] sm:h-[100vh] bg-primary flex flex-col items-start justify-center gap-8 py-10'>
            <h1 className='text-2xl text-white'>{welcomeText || ''}</h1>
            <h1 className='text-7xl sm:text-3xl text-secondary font-semibold'>{firstName || ''} {lastName || ''}</h1>
            <h1 className='text-7xl sm:text-3xl text-white font-semibold'>{caption || ''}</h1>
            <p className='text-xl text-white w-2/3'>{description || ''}</p>

            <div className='flex gap-2'>
                <a className='border-2 border-tertiary text-tertiary text-white px-10 py-3 rounded' href='#contacto'>Contacto</a>
                <a className='border-2 border-tertiary text-tertiary text-white px-10 py-3 rounded' href={cv} download={cv}>Curriculum</a>
            </div>
        </div>
    )
}

export default Intro