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
		<div className="overflow-hidden w-full m-auto duration-200">
			<div className="bg-white w-full">
				<div className='px-5 py-3 grid grid-cols-[50fr,1fr]'>
					{/* Card info */}
					<div className='grid grid-cols-4 justify-space-between -mr-20'>
						{/* Course title */}
						<h3 className='text-xl font-semibold'>{course.title.length <= 20 ? course.title : course.title.slice(0, 18) + '...'}</h3>
						{/* Course category */}
						<CertificateField className='hidden xl:inline-block' icon={categories[course.category]?.icon ?? categories.default.icon}>
							<p>{categories[course.category]?.br ?? course.category}</p>
						</CertificateField>
						{/* Course rating */}
						<div className=''>
							<StarRating rating={course.rating} starSize="w-6" />
						</div>
						{/* Subsriber count */}
						<CertificateField icon={mdiAccount} className="">
							<p className='text-grayMedium'>{course.numOfSubscriptions}</p>
							<p className="text-grayMedium hidden sm:inline-block ml-1">alunos</p>
						</CertificateField>
					</div>
					<div>
						<Icon path={mdiDownload} className='w-8 h-8 text-grayMedium hover:text-primary float-right cursor-pointer' />
					</div>
				</div>
			</div>
		</div>
	)
}
