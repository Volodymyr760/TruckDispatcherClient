import { useNavigate } from 'react-router-dom'
import { RedirectButtonProps } from './types'
import MuiButton from '../../../components/Button/MuiButton'

export default function RedirectButton({ route, title }: RedirectButtonProps): JSX.Element {
    const navigate = useNavigate()

    return (
        <div style={{ textAlign: 'center' }}>
            <MuiButton variant='contained' onClickHandler={() => navigate(route)}>
                <span className='text-16' style={{ color: "var(--lightgreywhite)" }}>{title}</span>
            </MuiButton>
        </div>
    )
}
