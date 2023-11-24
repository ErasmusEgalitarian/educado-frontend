import { Link } from "react-router-dom"
import FrontLogo from "../assets/WelEdnew.png"
import background from "../assets/background.jpg"
import Carousel from "../components/archive/Carousel";





const Welcome = () => {

    const responseGoogle = (response: any) => {
        // Handle the response here (e.g., send it to your backend for verification) (OLD CODE)
        console.log(response);
      };


return (
//background for frame 2332
<main className="self-stretch flex flex-col items-center justify-center gap-20 overflow-hidden flex-1 rounded-sm bg-gradient-to-br from-[#C9E5EC] 0% to-[#FFF] 100%" >

{ /*Navbar*/ }
  <nav className="flex fixed w-full items-center justify-between bg-secondary box-shadow-md bg-fixed top-0 left-0 right-0 z-10" style={{ background: 'var(--secondary, #F1F9FB)', boxShadow: '0px 4px 4px 0px rgba(35, 100, 130, 0.25)' }}>
    <div className="w-[165.25px] h-6 justify-start items-center gap-[7.52px] flex py-6 px-12">
      <div className="navbar-start">
        <Link to="/" className="w-[165.25px] h-6 justify-start items-center gap-[6px] inline-flex space-x-1 normal-case text-xl">
          <img src= '/logo.svg' alt="logo" className="w-[24.43px] h-6" /> <img src= '/educado.svg' alt="educado" className="h-6" />
        </Link>
      </div>
    </div>
  </nav>

    { /*Containers for the overall page*/ }
    <body className='w-full h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-screen sm:max-w-956'> 
        <div className='relative w-full h-screen hidden md:block container overflow-hidden'>
          <img src={background} alt="w-[42.375rem]" className='object-cover w-full h-full' />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Carousel/> { /*Carousel Integration*/ }
          </div>
        </div>

        { /*Container for right side of the page*/ }
        <div className="relative right-0 h-screen flex flex-col justify-center items-center">
          <img className="relative  top-[35%] w-[22rem]" src={FrontLogo} alt="Front Logo" />
          
          { /*Container for the buttons*/ }
          <div className="relative flex gap-4 px-[5rem] flex-row items-center justify-center w-full h-screen">
            
            { /*Button for routing to the Login page*/ }
            <Link className="flex-auto w-[18rem] h-[3.3rem] items-center justify-center rounded-lg text-base font-bold font-['Montserrat'] bg-[#5ECCE9] inline-flex text-[#FFFFFF] transform transition duration-100 ease-in hover:bg-cyan-500 hover:text-gray-50"
              to="/login">
              <button
                type="submit"
                >Entrar
              </button>
            </Link>
            
            { /*Button for routing to the Signup page*/ }
            <Link className="flex-auto w-[18rem] h-[3.3rem] items-center justify-center rounded-lg text-base font-bold font-['Montserrat'] bg-[#5ECCE9] inline-flex text-[#FFFFFF] transform transition duration-100 ease-in hover:bg-cyan-500 hover:text-gray-50"
              to="/signup">
              <button
                type="submit"
                >Cadastrar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </body>
  </main>
    )
}

export default Welcome