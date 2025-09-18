import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./Navbar";

/**
 * Layout component
 *
 * @param {ReactNode} children The children components
 * @returns HTML Element
 */
const Layout = ({ children }: { children: ReactNode[] | ReactNode }) => {
  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        <div className="flex flex-col flex-grow">
          {/** Top Nav bar */}
          <Navbar />

          {/** Content */}
          <main className="flex-grow overflow-x-hidden bg-gradient-to-br from-[#c8e5ec] to-[white]">
            {children}
          </main>
        </div>
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
    </>
  );
};

export default Layout;
