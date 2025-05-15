import { ReactNode } from "react"

export interface AccordionWrapperProps {
    panelId: string
    contentId: string
    title: string
    children?: ReactNode
}