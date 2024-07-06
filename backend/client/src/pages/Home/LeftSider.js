import React from 'react'

function LeftSider() {
    return (
        <div className='fixed left-0 bottom-0 px-10 sm:static'>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col mb-2 sm:flex-row sm:gap-3'>
                    <a href='mailto:e5470843@gmail.com'>
                        <i class="ri-mail-line text-gray-400 text-xl mb-2">

                        </i>
                    </a>
                    <a href='https://www.linkedin.com/in/eduardo-zapata-moya-a6667a1b4/'>
                        <i class="ri-linkedin-fill text-gray-400 text-xl mb-2"></i>
                    </a>
                    <a href='https://github.com/3duu21'>
                        <i class="ri-github-fill text-gray-400 text-xl mb-2">

                        </i>
                    </a>
                </div>
                <div className='w-[1px] h-52 bg-gray-300 sm:hidden'>

                </div>
            </div>
        </div>
    )
}

export default LeftSider