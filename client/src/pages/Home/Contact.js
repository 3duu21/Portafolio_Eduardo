import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux'


function Contact() {

    const { portfolioData } = useSelector((state) => state.root)
    const { contact } = portfolioData

    return (
        <div id='contacto'> 
            <SectionTitle title="Contactame" />
            <div className='flex sm:flex-col items-center justify-around' >
                <div className='flex flex-col gap-3'>
                    <p className='text-white'>{'{'}</p>
                    {Object.keys(contact).map((key) => (
                        key !== '_id' &&
                        <h1 className='ml-5 text-xl text-white'>"
                            <span className='text-white'> {key} " :</span> <span className='text-white'>" {contact[key]}</span> ",
                        </h1>
                    ))}
                    <p className='text-white'>{'}'}</p>
                </div>
                <div className='h-[400px]'>
                    <lottie-player src="https://lottie.host/09c41a66-ffb2-46be-9208-e52f2f054ff1/BLdgzMhVlq.json" 
                        background="##FFFFFF"
                        speed="1"
                        autoplay 
                        direction="1"
                        mode="normal">
                    </lottie-player>
                </div>
            </div>
        </div>
    )
}

export default Contact