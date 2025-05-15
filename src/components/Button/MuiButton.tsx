import { MuiButtonProps } from './types'
import { Button } from "@mui/material"
import './styles.css'

export default function MuiButton({ variant, color, size, disabled, fullwidth, type, onClickHandler, children }: MuiButtonProps): JSX.Element {
    return (
        <Button
            variant={variant}
            color={color} 
            size={size} 
            disabled={disabled} 
            fullWidth={fullwidth}
            sx={{ textTransform: 'none', borderRadius: "16px" }}
            type={type}
            onClick={onClickHandler}
        >
            {children}
        </Button>
    )
};