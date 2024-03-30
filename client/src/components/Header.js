
import React, { useState } from 'react'

function Header() {

  let Links = [
    { name: "Sobre mi", link: "#sobremi" },
    { name: "Experiencia", link: "#experiencia" },
    { name: "Proyectos", link: "#proyectos" },
    { name: "Cursos ", link: "#cursos" },
    { name: "Contacto", link: "#contacto" }
  ]

  let [open, setOpen] = useState(false)

  return (
    <div className='shadow-md w-full fixed top-0 left-0 z-30'>
      <div className='md:flex bg-primary pt-3 md:px-10 px-7'>
        <div className='flex items-center justify-between sm:block '>
          <a href='/'>
            <div className='p-2 pb-2 sm:pb-5 flex flex-row bg-primary header sm:z-50'>
              <h1 className='text-secondary text-4xl font-semibold'>E</h1>
              <h1 className='text-white text-4xl font-semibold'>Z</h1>
              <h1 className='text-tertiary text-4xl font-semibold'>M</h1>
            </div>
          </a>
          <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer hidden sm:block'>
            <span className='text-3xl '>
              <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
            </span>
          </div>
          <ul className={`flex items-center sm:shadow-md pb-0 sm:pb-1 sm:block sm:absolute static sm:bg-primary sm:left-0 sm:w-full w-auto pl-0 sm:pl-2 sm:transition-all sm:duration-500 sm:ease-in 
          ${open ? 'top-16' : 'top-[-390px] opacity-100 sm:opacity-0'}`}>
            {
              Links.map((link) => (
                <li className='ml-8 text-lg my-7'>
                  <a className='hover:text-gray-200 duration-300' href={link.link}>{link.name}</a>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header