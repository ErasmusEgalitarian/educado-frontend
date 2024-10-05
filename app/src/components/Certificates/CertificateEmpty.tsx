import react from 'react'

const emptyState = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className='text-center' id="no-certificates-message">
                <p className='text-darkGray'>Você ainda não tem nenhum certificado.</p>
            </div>
        </div>
    )
}
export default emptyState;