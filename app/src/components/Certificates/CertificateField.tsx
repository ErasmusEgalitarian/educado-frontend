import Icon from "@mdi/react"

type propTypes = {
	children: React.ReactNode;
	icon?: string;
	className?: string;
}

/**
 * This component is responsible for displaying a field in the cards for certificates
 * @param props.children The content of the field
 * @param props.icon The icon to be displayed before the content [optional]
 * @param props.className The class name of the field [optional]
 */
export default function CertificateField(props: propTypes) {
	return (
		<div className={props.className ?? ''}>
			<div className="flex flex-row">
				{props.icon && <Icon path={props.icon} className="w-6 mr-1 inline-block" />}
				{props.children}
			</div>
		</div>


	)
}