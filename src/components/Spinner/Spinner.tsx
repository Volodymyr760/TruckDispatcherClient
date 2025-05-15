import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function Spinner(): JSX.Element {
    return (
        <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center', justifyContent: 'center', margin: '50px 0' }}>
            <CircularProgress />
        </Box>
    );
}