import Icon from "@mdi/react";
import { Certificate } from "../../interfaces/Certificate"
import StarRating from "../general/StarRating"
import { mdiAccount, mdiBrushOutline, mdiDownload } from "@mdi/js";
import categories from "../../helpers/courseCategories";
import CertificateField from "./CertificateField";



export default function CertificateCard(props: { certificate: Certificate }) {
	const { certificate } = props;
	const { course, creator } = certificate;
	const maxTitleLength = 20;

	return (
		<div className="overflow-hidden shadow rounded w-full cursor-pointer m-auto hover:shadow-lg duration-200">
			<div className="bg-white w-full">
				<div className='px-5 py-3 grid grid-cols-[7fr,1fr]'>
					{/* Card info */}
					<div className='flex flex-row justify-between'>
						{/* Course title */}
						<h3 className='text-xl font-semibold'>{course.title}</h3>
						{/* Course category */}
						<CertificateField className='hidden xl:inline-block' icon={categories[course.category]?.icon ?? categories.default.icon}>
							<p>{categories[course.category]?.br ?? course.category}</p>
						</CertificateField>
						{/* Course rating */}
						<div className='w-[8rem]'>
							<StarRating rating={course.rating} />
						</div>
						{/* Subsriber count */}
						<CertificateField icon={mdiAccount}>
							<p className='text-grayMedium'>{course.numOfSubscriptions}</p><p className="text-grayMedium hidden sm:inline-block ml-1">alunos</p>
						</CertificateField>
					</div>
					<div>
						<Icon path={mdiDownload} className='w-8 h-8 text-grayMedium float-right' />
					</div>
				</div>
			</div>
		</div>
	)
}
