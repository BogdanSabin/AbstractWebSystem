import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import imag from '../../Media/Images/space.jpg'
import CloseIcon from '@mui/icons-material/Close';
import DialogAction from '../DialogAction';
import AlertSnackBar from '../SnackBarAlert'
import Loading from '../Loading';


const Themes = () => {
    const [flag,setFlag] = useState(0);
    const [themes,setThemes] = useState([]);
    const [selectedTheme,setSelectedTheme] = useState(null);
    const [openAlert,setOpenAlert] = useState(false);
    const [alertMessage,setAlertMessage] = useState(null);
    const [alertSeverity,setAlertSeverity] = useState(null);
    const [openDialog,setOpenDialog] = useState(false);
    const [message,setMessage] = useState(null);
    const [loading,setLoading] = useState(false);

    const getThemes = () => {
        setLoading(true);
        axios.get("http://localhost:8000/api/admin/theme/",{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setThemes(res.data.response);
            setLoading(false);
        });
    }

    const handleSelectDelete = (id) => {
        setSelectedTheme(id);
        setOpenDialog(true);
        setMessage("Are you sure you want to delete the theme ?");
    }

    const handleDeleteTheme = () => {
        axios.delete("http://localhost:8000/api/admin/theme/"+selectedTheme,{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setOpenAlert(true);
            setAlertSeverity('success');
            setAlertMessage('Theme deleted !');
            setMessage(null);
            setSelectedTheme(null);
            setOpenDialog(false);

        })
    }
    useEffect(() => {
        if(flag === 0 && loading === false){
            getThemes();
        }
    },[]);


    return (
        <div>
            {loading === false ?
            <div  style={{marginTop: '5vw', height: '40vw'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {themes.length>0 && themes.map((theme,index) => (
                        <Grid item xs={2} sm={4} md={4} key={index} >
                            <Card sx={{ maxWidth: 345 }} style={{margin: 'auto'}}>
                                <CardActionArea>
                                    {localStorage.getItem('role') === 'master' ?
                                        <Fab color="secondary" size="small" aria-label="delete" style={{position: 'absolute', right: '1vw', top: 0, backgroundColor: 'inherit'}} onClick={() => handleSelectDelete(theme._id)}>
                                            <CloseIcon style={{marginLeft: '1.2vw',fontSize: '1.5vw'}}/>
                                        </Fab>
                                    :null}
                                    <CardMedia component="img" height="140" image={imag} alt="space"/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">{theme.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">{theme.description}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
            :
            <Loading text={"themes"}/>
            }
            {/* <div>
                <Button variant="contained" style={{fontSize: '1.1vw',color: 'whitesmoke', backgroundColor: '#308695',}} >Add new theme</Button>
            </div> */}
            <DialogAction open={openDialog} setOpen={setOpenDialog} message={message} handler={handleDeleteTheme}/>
            <AlertSnackBar open={openAlert} setOpen={setOpenAlert} message={alertMessage} severity={alertSeverity}/>
        </div>
    );
}

export default Themes;