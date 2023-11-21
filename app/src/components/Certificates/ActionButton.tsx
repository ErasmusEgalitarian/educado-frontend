import Icon from "@mdi/react";

type propTypes = {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	icon?: string;
}

export default function ActionButton(props: propTypes) {
	return (
		<button className="std-button rounded-lg px-7 cursor-pointer">
			{props.children}
			{props.icon ? <Icon path={props.icon} className='w-6 h-6 text-white float-right' /> : null}
		</button>
	)
}