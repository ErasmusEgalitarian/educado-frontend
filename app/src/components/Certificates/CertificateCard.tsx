import Icon from "@mdi/react";
import { Certificate } from "../../interfaces/Certificate"
import StarRating from "../general/StarRating"
import { mdiAccount, mdiBrushOutline, mdiChevronDown, mdiDownload, mdiEmail, mdiFileEye } from "@mdi/js";
import categories from "../../helpers/courseCategories";
import CertificateField from "./CertificateField";
import { useState } from "react";
import ActionButton from "./ActionButton";



export default function CertificateCard(props: { certificate: Certificate }) {
	const { certificate } = props;
	const { course, creator } = certificate;
	const maxTitleLength = 20;

	const [isOpen, setIsOpen] = useState(false);

	function toggleDropdown() {
		setIsOpen(!isOpen);
	}

	return (
		<div className="overflow-hidden w-full m-auto duration-200 shadow-md rounded-xl hover:shadow-lg group">
			<div className={"bg-white w-full"}>
				<div className={'mt-5 grid grid-cols-[50fr,1fr] rounded-xl border'} onClick={toggleDropdown}>
					{/* Card info */}
					<div className='px-5 py-6 grid grid-cols-4 justify-space-between -mr-20'>
						{/* Course title */}
						<h3 className='text-xl font-semibold'>{course.title.length <= maxTitleLength ? course.title : course.title.slice(0, maxTitleLength - 2) + '...'}</h3>
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
					<button>
						<Icon path={mdiChevronDown} className='w-8 h-8 text-grayMedium group-hover:text-primary mr-5 float-right cursor-pointer' />
					</button>
					{isOpen && <div className="col-span-2 bg-grayLight h-[1px]"></div>}
					{isOpen &&
						<div className="w-full col-span-2 px-5 py-4 rounded-b-xl bg-[rgb(250,_250,_250)] grid grid-cols-2">
							{/** Export certificate */}
							<p className="text-xl translate-y-2 text-grayDark">Exportar certificado: </p>
							<div className="gap-20 flex flex-row-reverse ">
								<ActionButton icon={mdiDownload}>
									<p>Baixar</p> {/** Download */}
								</ActionButton>
								<ActionButton icon={mdiFileEye}>
									<p> Previa </p> {/** Preview */}
								</ActionButton>
							</div>
						</div>
					}

				</div>
			</div>
		</div>
	)
}
