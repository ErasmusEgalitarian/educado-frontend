import CertificateList from "../components/Certificates/CertificateList";
import Layout from "../components/Layout";


export default function Certificates() {
  return (
    <Layout meta="Certificates">
      <div className='h-[93%] relative align-self-center lg:px-20 xl:px-40'>
        <div className='m-8 p-8 pb-0 bg-white rounded-xl h-full overflow-scroll'>
          <CertificateList />
        </div>
      </div>
    </Layout>
  )
}
