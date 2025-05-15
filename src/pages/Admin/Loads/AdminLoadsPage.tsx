import React, { useState } from 'react'
import { Helmet } from "react-helmet"
import { ISnackBarMessageState } from '../../../types/common/snackBarMessageState'
import { Alert, CircularProgress, Container, Grid, Snackbar } from '@mui/material'
import MuiButton from '../../../components/Button/MuiButton'
import { deleteLegacyImportLoadAxios, uploadLoadCentralLoadsAxios, uploadTruckSmarterLoadsAxios } from '../../../api/importload'
import AppDeleteConfirmDialog from '../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog'
import { generateHeatmapAxios } from '../../../api/heatmap'

export default function AdminLoadsPage() {    
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [loadingTSState, setLoadingTSState] = useState<boolean>(false)
    const [loadingLCState, setLoadingLCState] = useState<boolean>(false)
    const [loadingGenerate, setLoadingGenerate] = useState<boolean>(false)
    const [loadingDeleteLegacy, setLoadingDeleteLegacy] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    
    const сloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setSelectedFile(e.target.files[0])
    }

    const onUploadLoadCentralLoads = async () => {
        try {
            setSnackBarState(null)
            if (selectedFile) {
                setLoadingLCState(true)
                await uploadLoadCentralLoadsAxios(selectedFile)
                setSnackBarState({message: "Loads uploaded.", severity: "success"})
            } else {
                setSnackBarState({message: "Please choose a file to upload.", severity: "warning"})
            }
        } catch (error) {
            setSnackBarState({message: error.message || "Unable to upload loads.", severity: "error"})
        } finally {
            setLoadingLCState(false)
        }
    }

    const onUploadTruckSmarterLoads = async () => {
        try {
            setSnackBarState(null)
            if (selectedFile) {
                setLoadingTSState(true)
                await uploadTruckSmarterLoadsAxios(selectedFile)
                setSnackBarState({message: "Loads uploaded.", severity: "success"})
            } else {
                setSnackBarState({message: "Please choose a file to upload.", severity: "warning"})
            }
        } catch (error) {
            setSnackBarState({message: error.message || "Unable to upload loads.", severity: "error"})
        } finally {
            setLoadingTSState(false)
        }
    }

    const onDeleteLegacyImportLoads = async () => {
        try {
            setSnackBarState(null)
            setLoadingDeleteLegacy(true)
            await deleteLegacyImportLoadAxios()
            setSnackBarState({message: "Legacy ImportLoads deleted.", severity: "success"})
        } catch (error) {
            setSnackBarState({ message: "Unable to remove ImportLoads.", severity: "error" })
        } finally {
            setLoadingDeleteLegacy(false)
        }
    }

    const onGenerateHeatmap = async () => {
        try {
            setSnackBarState(null)
            setLoadingGenerate(true)
            await generateHeatmapAxios()
            setSnackBarState({message: "Heatmap gererated successfully.", severity: "success"})
        } catch (error) {
            setSnackBarState({ message: "Unable to generate the heatmap.", severity: "error" })
        } finally {
            setLoadingGenerate(false)
        }
    }

    return (
        <>
            <Helmet>
                <title>Truskdispatcher.com - Import Loads</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truskdispatcher.com" />
            </Helmet>
            <Container maxWidth="lg" className='layout-container-searchpage' >
                <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'} 
                    sx={{margin: "15px 0", padding: "0 15px"}}>
                    <Grid item>
                        <span className='text-16'>Import LoadCentral loads </span>
                        <input type="file" hidden={false} onChange={fileSelectedHandler} />
                    </Grid>
                    <Grid item>
                        <MuiButton variant="contained" onClickHandler={onUploadLoadCentralLoads}>
                            {loadingLCState && <CircularProgress size="1rem" sx={{ mr: '10px', color: "var(--lightgreywhite)" }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Upload</span>
                        </MuiButton>
                    </Grid>
                </Grid>
                <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'} 
                    sx={{margin: "15px 0", padding: "0 15px"}}>
                    <Grid item>
                        <span className='text-16'>Import TruckSmarter loads </span>
                        <input type="file" hidden={false} onChange={fileSelectedHandler} />
                    </Grid>
                    <Grid item>
                        <MuiButton variant="contained" onClickHandler={onUploadTruckSmarterLoads}>
                            {loadingTSState && <CircularProgress size="1rem" sx={{ mr: '10px', color: "var(--lightgreywhite)" }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Upload</span>
                        </MuiButton>
                    </Grid>
                </Grid>
                <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'} 
                    sx={{margin: "15px 0", padding: "0 15px"}}>
                    <Grid item>
                        <p className='text-16'>Delete legacies imported loads</p>
                    </Grid>
                    <Grid item>
                        <MuiButton variant="contained" color='error' onClickHandler={() => setConfirmDialogOpen(true)}>
                            {loadingDeleteLegacy && <CircularProgress size="1rem" sx={{ mr: '10px' }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Delete</span>
                        </MuiButton>
                    </Grid>
                </Grid>
                <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'} 
                    sx={{margin: "15px 0", padding: "0 15px"}}>
                    <Grid item>
                        <p className='text-16'>Generate Heatmap</p>
                    </Grid>
                    <Grid item>
                        <MuiButton variant="contained" onClickHandler={onGenerateHeatmap}>
                            {loadingGenerate && <CircularProgress size="1rem" sx={{ mr: '10px', color: "var(--lightgreywhite)" }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Go!</span>
                        </MuiButton>                        
                    </Grid>
                </Grid>
                { confirmDialogOpen && <AppDeleteConfirmDialog onCancel={() => setConfirmDialogOpen(false)} 
                    onDelete={onDeleteLegacyImportLoads} /> }
                <Snackbar
                    open={snackBarState !== null}
                    autoHideDuration={4000}
                    onClose={сloseSnackbar}
                >
                    <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
                </Snackbar>
            </Container>
        </>
    )
}
