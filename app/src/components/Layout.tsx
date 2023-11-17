import 'react-toastify/dist/ReactToastify.css';
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify';

// Components
import RequireAuth from './RequireAuth'
import Navbar from './Navbar';

/**
 * Layout component
 * 
 * @param {ReactNode} children The children components
 * @returns HTML Element
 */
const Layout = ({ children }: { children: Array<ReactNode> | ReactNode, meta: string | undefined }) => {
	return (
		<RequireAuth>
			<div className="flex w-screen h-screen text-gray-700">
					{/** Top Nav bar */}
					<Navbar />

					{/** Content */}
					<main className="flex-grow overflow-x-hidden bg-gradient-to-br from-[#c8e5ec] to-[white]">
						{children}
					</main>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
				theme="light"
			/>
		</RequireAuth>
	)
}

export default Layout
