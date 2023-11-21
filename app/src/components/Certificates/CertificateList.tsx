import Loading from "../general/Loading";
import { getUserToken } from "../../helpers/userInfo";
import { Certificate } from "../../interfaces/Certificate";
import CertificateCard from "./CertificateCard";
import { useEffect, useState } from "react";
import CertificateService from "../../services/certificate.services";

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
				<div id="no-certificates-message" className="text-xl">Empty</div>
			}
		</div>
	)
}
