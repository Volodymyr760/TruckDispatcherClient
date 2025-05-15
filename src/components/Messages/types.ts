import { ReactNode } from "react"

export interface MessageProps {
	appearance: "small" | "regular" | "large"
	children: ReactNode
}