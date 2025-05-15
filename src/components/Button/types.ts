import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export interface MuiButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	variant?: "contained" | "outlined";
	color?: "error" | "inherit" | "primary" | "secondary" | "success" | "info" | "warning";
	size?: "small" | "medium" | "large";
	disabled?: boolean;
	fullwidth?: boolean;
	type?: "button" | "reset" | "submit";
	onClickHandler?: () => void;
	children?: ReactNode;
}
