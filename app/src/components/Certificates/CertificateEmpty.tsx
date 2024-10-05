import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import noCertificatesImage from '../../assets/no-certificates.png';

const emptyState = () => {
    const navigate = useNavigate();

    const CourseManager = () => {
        navigate("/courses/manager/0/0");
    }

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className='text-center' id="no-certificates-message">
                <img src={noCertificatesImage} className='w-1/3 h-auto mx-auto' />
                
                <h1 className='text-xl font-bold my-4'>Você ainda não tem nenhum certificado.</h1>
                <p className='text-darkGray'>Clique no botão abaixo e siga o passo a passo para desenolver o seu primeiro curso.</p>
                <label htmlFor="course-create" onClick={CourseManager} className="std-button flex modal-button  space-x-">
                    <PencilSquareIcon className='w-5 h-5' />
                    <p className='font-normal '>Criar novo curso</p> {/** Create new course */}
                </label>
            </div>
        </div>
    )
}
export default emptyState;