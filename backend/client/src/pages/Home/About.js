import { useSelector } from 'react-redux'
import SectionTitle from '../../components/SectionTitle'
import '../../index.css';

function About() {
    const { loading, portfolioData } = useSelector((state) => state.root)
    const { about } = portfolioData
    const { skills, lottieURL, description1, description2 } = about
    return (
        <div id='sobremi'>
            <SectionTitle title="Sobre mi" />

            <div className='flex w-full items-center sm:flex-col z-10'>
                <div className='h-[60vh] w-1/2 sm:w-full '>
                    <lottie-player src={lottieURL}
                        background="##FFFFFF"
                        speed="1"
                        loop
                        autoplay
                        direction="1"
                        mode="normal">

                    </lottie-player>
                </div>
                <div className='flex flex-col gap-5 w-1/2 sm:w-full'>
                    <p className='text-white'>
                        {description1 || ''}
                    </p>
                    <p className='text-white'>
                        {description2 || ''}
                    </p>
                </div>
            </div>

            <div className='py-5'>
                <h1 className='text-tertiary text-xl'>Tecnologías trabajadas recientemente:</h1>
                <div className='flex flex-wrap gap-10 mt-5'>
                    {skills.map((skill, index) => (
                        <div className='border border-white py-2 px-5 skill-container' key={index}>
                            <h1 className='text-white skill'>{skill}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default About