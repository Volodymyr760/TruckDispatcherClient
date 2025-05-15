import { AccordionWrapperProps } from './types'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

export default function AccordionWrapper({ title, contentId, panelId, children }: AccordionWrapperProps): JSX.Element {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls={contentId}
                id={panelId}
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}
