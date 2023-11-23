import Icon from "@mdi/react";

type propTypes = {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	icon?: string;
}

/**
 * This component is responsible for displaying a button with an icon
 * @param props.children The content of the button
 * @param props.className The class name of the button [optional]
 * @param props.onClick The function to be called when the button is clicked [optional]
 * @param props.icon The icon to be displayed before the content [optional]
 */
export default function ActionButton(props: propTypes) {
	return (
		<button className="std-button rounded-lg px-7 cursor-pointer">
			{props.children}
			{props.icon ? <Icon path={props.icon} className='w-6 h-6 text-white float-right' /> : null}
		</button>
	)
}