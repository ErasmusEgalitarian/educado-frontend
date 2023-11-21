import Loading from "../general/Loading";
import { getUserToken } from "../../helpers/userInfo";
import { Certificate } from "../../interfaces/Certificate";
import CertificateCard from "./CertificateCard";
import { useEffect, useState } from "react";
import CertificateService from "../../services/certificate.services";
import EmptyImg from "../../assets/no-courses.png";

export default function CertificateList() {
	const token = getUserToken();

	const [certificates, setCertificates] = useState<Certificate[]>();

	let largestSubNum = 0;

	useEffect(() => {
		CertificateService.getAllCertificates().then((res) => {
			setCertificates(res);
		})
	}, []);

	if (!certificates) return <Loading />;
	return (
		<div className="overflow-scroll min-h-full pb-4" id="certificate-list">
			{certificates.length ?
				<>
					<div className="w-full">
						<h1 className="text-3xl font-semibold">Certificates</h1>
						<p className="text-grayMedium">You have {certificates.length} certificates</p>
					</div>
					{certificates.map((certificate: Certificate, key: number) => (
						<CertificateCard certificate={certificate} key={key} num={key} />
					))}
				</> :
				// If the user has no courses, display this 'empty state'
				<div className='grid place-content-center w-full h-full text-center'>
				<div className='md:mx-40 xl:mx-64' id="no-certificates-message">
					<img src={EmptyImg} className='w-full' />
					<h1 className='te	xt-xl font-bold my-4'>Comece agora</h1>
					{/* It appears you haven't created any courses yet.
					Click the button below to see your course page. */}
					<p>Parece que você ainda não criou nenhum curso. Clique no botão abaixo para acessar sua página de cursos.</p>
				</div>
			</div>

			}
		</div>
	)
}
