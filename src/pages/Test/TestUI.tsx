import { Helmet } from "react-helmet"
import { Grid, IconButton, Tooltip } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import ErrorMessage from '../../components/Messages/ErrorMessage'
import MuiButton from '../../components/Button/MuiButton'
import SuccessMessage from "../../components/Messages/SuccessMessage"
import '../../index.css'

export default function TestUI(): JSX.Element {

    return (
        <div style={{ backgroundColor: 'white', margin: "15px", padding: "15px" }}>
            <Helmet>
                <title>TruckDispatcher.top - UI Tests</title>
                <meta name="description" content="Forms for remote work and control with customers, business units and personnel, create your form with questions, add images, answer options and your comments - TruckDispatcher.top" />
            </Helmet>
            <div className='pt1' style={{ textAlign: 'center' }}>Tests of UI Components</div>
            <div style={{ margin: "15px" }}>
                Design system: https://mui.com/
            </div>
            <hr style={{ width: "95%" }} />
            <div style={{ margin: "15px" }}>
                <div className='pt1'>Testing input types:</div>
                <div>
                    <label htmlFor="i1">Number: </label>
                    <input id='i1' type="number" value="10" onChange={(event) => console.log(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="i2">Date: </label>
                    <input id='i2' style={{ width: "600px" }} type="date"
                        onChange={(event) => {
                            console.log("value: ", event.target.value);
                            console.log("UTC Date: ", new Date(event.target.value).toUTCString())
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="i3">Time: </label>
                    <input id='i3' style={{ width: "600px" }} type="time"
                        onChange={(event) => console.log(event.target.value)}
                    />
                </div>
            </div>
            <hr style={{ width: "95%" }} />
            {/* Error Messages: */}
            <div style={{ margin: "15px" }}>
                <div className='pt1'>Error Messages:</div>
                <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" gap={2}>
                    <ErrorMessage appearance="regular">MessageAppearance.REGULAR</ErrorMessage>
                    <ErrorMessage appearance="large">MessageAppearance.LARGE</ErrorMessage>
                </Grid>
            </div>
            <div style={{ margin: "15px" }}>
                <div className='pt1'>Success Messages:</div>
                <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" gap={2}>
                <SuccessMessage appearance="regular">MessageAppearance.REGULAR</SuccessMessage>
                    <SuccessMessage appearance="large">MessageAppearance.LARGE</SuccessMessage>
                </Grid>
            </div>
            {/* MuiButton */}
            <hr style={{ width: "90%" }} />
            <div style={{ margin: "15px" }}>
                <div className='pt1'>MuiButton:</div>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap={2}>
                    <strong>Variant:</strong>
                    <MuiButton>Default</MuiButton>
                    <MuiButton variant='contained'>Contained</MuiButton>
                    <MuiButton variant='outlined'>Outlined</MuiButton>
                </Grid>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap={2} sx={{ margin: "15px" }}>
                    <strong>Size:</strong>
                    <MuiButton variant='contained'>Default</MuiButton>
                    <MuiButton size='small' variant='contained'>Small</MuiButton>
                    <MuiButton size='medium' variant='contained'>Medium</MuiButton>
                    <MuiButton size='large' variant='contained'>Large</MuiButton>
                </Grid>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap={2} sx={{ margin: "15px" }}>
                    <strong>Color:</strong>
                    <MuiButton size='medium' variant='contained'>Default</MuiButton>
                    <MuiButton size='medium' variant='contained' color='error'>Error</MuiButton>
                    <MuiButton size='medium' variant='contained' color='inherit'>Inherit</MuiButton>
                    <MuiButton size='medium' variant='contained' color='primary'>Primary</MuiButton>
                    <MuiButton size='medium' variant='contained' color='secondary'>Secondary</MuiButton>
                    <MuiButton size='medium' variant='contained' color='success'>Success</MuiButton>
                    <MuiButton size='medium' variant='contained' color='info'>Info</MuiButton>
                    <MuiButton size='medium' variant='contained' color='warning'>Warning</MuiButton>
                </Grid>
            </div>
            {/* Colors */}
            <hr style={{ width: "90%" }} />
            <div style={{ margin: "15px" }}>
                <p className='pt1'>Colors:</p>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap={2}>
                    <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--lightGrey)', color: "white", padding: "10px" }}>Light grey</div>
                    <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--darkGrey)', color: "white", padding: "10px" }}>Dark grey</div>
                    
                    <div style={{ width: '60px', height: '60px', backgroundColor: '#d32f2f', color: "white", padding: "10px" }}>Red</div>
                    <div style={{ width: '60px', height: '60px', backgroundColor: '#ed6c02', color: "white", padding: "10px" }}>Orange</div>
                    <div style={{ width: '60px', height: '60px', backgroundColor: '#f2f5f4', color: "black", padding: "10px" }}>White</div>
                    <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--blue)', color: "white", padding: "10px" }}>Blue</div>
                    <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--darkBlue)', color: "white", padding: "10px" }}>DarkBlue</div>
                </Grid>
            </div>
            {/* Typography */}
            <hr style={{ width: "90%" }} />
            <div style={{ margin: "15px" }}>
            <p className='pt1'>Typography:</p>
            <table>
                <tr>
                    <th>Size</th>
                    <th>No font-weihgt</th>
                    <th>Weight 400</th>
                    <th>Weight 600</th>
                    <th>Weight 800</th>
                </tr>
                <tr>
                    <td>10px</td>
                    <td><span className="text-10">text-10</span></td>
                    <td><span className="text-10" style={{fontWeight: 400}}>text-10</span></td>
                    <td><span className="text-10" style={{fontWeight: 600}}>text-10</span></td>
                    <td><span className="text-10" style={{fontWeight: 800}}>text-10</span></td>
                </tr>
                <tr>
                    <td>12px</td>
                    <td><span className="text-12">text-12</span></td>
                    <td><span className="text-12" style={{fontWeight: 400}}>text-12</span></td>
                    <td><span className="text-12" style={{fontWeight: 600}}>text-12</span></td>
                    <td><span className="text-12" style={{fontWeight: 800}}>text-12</span></td>
                </tr>
                <tr>
                    <td>14px</td>
                    <td><span className="text-14">text-14</span></td>
                    <td><span className="text-14" style={{fontWeight: 400}}>text-14</span></td>
                    <td><span className="text-14" style={{fontWeight: 600}}>text-14</span></td>
                    <td><span className="text-14" style={{fontWeight: 800}}>text-14</span></td>
                </tr>
                <tr>
                    <td>16px</td>
                    <td><span className="text-16">text-16</span></td>
                    <td><span className="text-16" style={{fontWeight: 400}}>text-16</span></td>
                    <td><span className="text-16" style={{fontWeight: 600}}>text-16</span></td>
                    <td><span className="text-16" style={{fontWeight: 800}}>text-16</span></td>
                </tr>
                <tr>
                    <td>20px</td>
                    <td><span className="text-20">text-20</span></td>
                    <td><span className="text-20" style={{fontWeight: 400}}>text-20</span></td>
                    <td><span className="text-20" style={{fontWeight: 600}}>text-20</span></td>
                    <td><span className="text-20" style={{fontWeight: 800}}>text-20</span></td>
                </tr>
            </table>                
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap={2}>
                    <span className='pt2'>Titles (pt1, pt2, pt...): </span>
                    <span className='pt1'>PAGE title 1</span>
                    <span className='pt2'>PAGE title 2</span>
                    <span className='pt3'>PAGE title 3</span>
                </Grid>
            </div>
            {/* Grid */}
            <hr style={{ width: "90%" }} />
            <div style={{ margin: "15px" }}>
                <div className='pt1'>Grid:</div>
                <br />
                use <a href="https://mui.com/material-ui/react-grid/#interactive" target="_blank" rel="noreferrer">Interactive mui Grid</a>
                <br />
                <Grid container direction="column" justifyContent="center" alignItems="stretch">
                    <p style={{ border: '1px solid black' }}>123</p>
                    <p style={{ border: '1px solid black' }}>123</p>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                        <span style={{ border: '1px solid black' }}>123</span>
                        <span style={{ border: '1px solid black' }}>123</span>
                    </Grid>
                    <p style={{ border: '1px solid black' }}>123</p>
                </Grid>
            </div>
            {/* Form Question Card Layout */}
            <hr style={{ width: "90%" }} />
            <div style={{ margin: "15px" }}>
                <div className='pt1'>Form Question Card Layout:</div>
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" gap='10px' sx={{ border: '1px solid black', minHeight: '56px', margin: '5px 0' }}>
                    <Grid item sx={{ border: '1px solid black' }}>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" >
                            <Grid item sx={{ border: '1px solid black' }}>
                                Icon
                            </Grid>
                            <Grid item sx={{ border: '1px solid black' }}>
                                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                                    <Grid item sx={{ border: '1px solid black' }}>
                                        Question Title
                                    </Grid>
                                    <Grid item sx={{ border: '1px solid black' }}>
                                        Question Type
                                    </Grid>
                                    <Grid item sx={{ border: '1px solid black' }}>
                                        <Grid container direction="row" justifyContent="flex-start" alignItems="center" >
                                            <Grid item sx={{ border: '1px solid black' }}>
                                                round or checkbox
                                            </Grid>
                                            <Grid item sx={{ border: '1px solid black' }}>
                                                option 1 name
                                            </Grid>
                                            <Grid item sx={{ border: '1px solid black' }}>
                                                option 1 value
                                            </Grid>
                                            <Grid item sx={{ border: '1px solid black' }}>
                                                option 1 menu box
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sx={{ border: '1px solid black' }}>
                                        <Grid container direction="row" justifyContent="flex-start" alignItems="center" >
                                            <Grid item sx={{ border: '1px solid black' }}>
                                                round or checkbox
                                            </Grid>
                                            <Grid item sx={{ border: '1px solid black' }}>
                                                option 2 name
                                            </Grid>
                                            <Grid item sx={{ border: '1px solid black' }}>
                                                option 2 value
                                            </Grid>
                                            <Grid item sx={{ border: '1px solid black' }}>
                                                option 2 menu box
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sx={{ border: '1px solid black' }}>
                        Menu box
                    </Grid>
                </Grid>
            </div>
            {/* Card Responsive Layout 
            * minimal mui breakpoint xs=600px does'nt allow ti show corretcly the cards on devices like Samsung
            * Galaxy and others (360-375px) layout breaks, so needed to adopt card layout using styling 
            * most long element (height, overflow and width css-properties)
            */}
            <hr style={{ width: "90%" }} />
            <div style={{ margin: "15px" }}>
                <div className='pt1'>Card Responsive Layout:</div>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px' sx={{ border: '1px solid black' }}>
                    {/* Image & content */}
                    <Grid item>
                        <Grid container justifyContent="flex-start" alignItems="center" gap='10px'>
                            <ImageOutlinedIcon fontSize='large' sx={{ fill: 'var(--lightGrey)' }} />
                            <Grid item
                                sx={{
                                    height: "24px",
                                    background: 'blue',
                                    width: { xs: "150px", sm: "390px", md: "700px" },
                                    overflow: "hidden"
                                }}>
                                <span style={{ color: 'white' }}>Card content or title can be too long for 360px (min mobile device).</span>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Menu Box */}
                    <Grid item>
                        <Tooltip title="Actions">
                            <IconButton onClick={() => console.log("Test")} sx={{ p: 0 }}>
                                <MoreVertIcon sx={{ color: "black" }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </div>
            <div style={{ margin: "15px" }}>
                <div className='pt1'>Search Form Layout:</div>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px' 
                    sx={{ border: '1px solid black' }}>
                    <Grid item sx={{ border: '1px solid blue', width: {xs: "100%", sm: "49%" } }}>
                        Grid item 1
                    </Grid>
                    <Grid item sx={{ border: '1px solid blue', width: {xs: "100%", sm: "49%" } }}>
                        Grid item 2
                    </Grid>
                </Grid>
            </div>
            <hr style={{ width: "90%" }} />
            <div style={{ margin: "15px" }}>
                {/*source -https://medium.com/@stasonmars/%D0%BA%D0%B0%D0%BA-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D0%B5%D1%82-flex-grow-%D0%B2-css-%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%BE%D0%B5-%D1%80%D1%83%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4%D1%81%D1%82%D0%B2%D0%BE-557d406be844 */}
                <div className='pt1'>Святий грааль 3 колононкового “рідкого” макету з шириною в пікселях</div>
                <div style={{ display: "flex" }}> {/*className="main1"*/}
                    <div style={{ flexBasis: "150px", flexShrink: 0 }}>150px</div>{/*className="aside1"*/}
                    <div style={{ flexGrow: 1 }}>section1 - rest</div>{/*className="section1"*/}
                    <div style={{ flexBasis: "150px", flexShrink: 0 }}>150px</div>{/*className="aside1"*/}
                </div>
            </div>
        </div>
    )
}