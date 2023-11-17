import CertificateList from "../components/Certificates/CertificateList";
import Layout from "../components/Layout";


export default function Certificates() {
  return (
    <Layout meta="Certificates">
      <div className='grid lg:grid-cols-[3fr_1fr] h-full'>
        <div className='m-8 p-8 pb-0 bg-white rounded-xl overflow-hidden flex flex-col'>
          <CertificateList />
        </div>
        <div className='m-8 p-8 hidden lg:flex pb-0 bg-white rounded-xl overflow-hidden flex-col'>

        </div>
      </div>
    </Layout>
  )
}
