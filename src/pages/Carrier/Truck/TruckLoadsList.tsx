import { useEffect, useState } from "react"
import { useActions } from "../../../hooks/useActions"
import { ILoad } from "../../../types/load"
import { TruckFormProps } from "./types"
import { getTruckByIdAxios } from "../../../api/truck"
import { Modal, Box, Grid, CircularProgress } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import MuiButton from "../../../components/Button/MuiButton"
import TruckLoadFormCard from "./TruckLoadFormCard"

const style = {
    position: 'absolute' as 'absolute',
    padding: '32px 16px',
    top: '50%',
    left: '50%',
    display: 'block',
    maxHeight: '80%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    minWidth: '20rem',
    width: '80%',
    maxWidth: '60rem',
    overflowY: 'scroll'
};

export default function TruckLoadsList({ truck, onClose }: TruckFormProps) {
    const [trucksLoads, setTrucksLoads] = useState<ILoad[]>([])
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<null | string>(null)
    const { removeLoad } = useActions()

    const fetchTrucksLoads = async () =>{
        try {
            setLoadingState(true)
            const result = await getTruckByIdAxios(truck.id)
            setTrucksLoads(result.loads)
        } catch (error) {
            setErrorState(error.message)
        } finally {
            setLoadingState(false)
        }
    };

    useEffect(() => {
        fetchTrucksLoads()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onDeleteLoad = async (load: ILoad) => {
        removeLoad(load.id) // remove from db
        setTrucksLoads(trucksLoads.filter(l => l.id !== load.id)) // remove from fetched loads
    }

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={style}>
                <CloseIcon
                    sx={{ cursor: 'pointer', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--red)" }, position: "absolute", top: "15px", right: "15px" }}
                    onClick={onClose}
                />
                <Grid container direction="column" spacing={2} sx={{ padding: '20px' }}>
                    <Grid item>
                        <p className="text-20" style={{ textAlign: "center" }}>
                            Loads History
                        </p>
                        <p className="14" style={{ textAlign: "center" }}>
                            Full loads list of {truck.name} - {truck.licensePlate} sorted by newest pickup dates.
                        </p>
                        {/*Loads List */}
                        {
                            trucksLoads.length > 0 ?
                                <div style={{ margin: "30px 0" }}>
                                    {trucksLoads.map(load => 
                                        <TruckLoadFormCard key={load.id} load={load} onDelete={onDeleteLoad} />
                                    )}
                                </div> :
                                errorState ? <ErrorMessage appearance="regular">{errorState}</ErrorMessage> :
                                    <p style={{ padding: "0 15px" }}>
                                        {loadingState && <CircularProgress size="1rem" sx={{ mr: '10px' }} />} Waiting for loads.
                                    </p>
                        }
                    </Grid>
                    <Grid item sx={{ textAlign: 'right' }}>
                        <MuiButton variant='contained' onClickHandler={() => alert("Not implemented yet.")}>
                            <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Save as CSV</span>
                        </MuiButton>&nbsp;&nbsp;
                        <MuiButton variant='contained' onClickHandler={onClose}>
                            <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Close</span>
                        </MuiButton>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
  )
}
