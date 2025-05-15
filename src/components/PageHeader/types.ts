import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export interface PageHeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string
    text?: string
}