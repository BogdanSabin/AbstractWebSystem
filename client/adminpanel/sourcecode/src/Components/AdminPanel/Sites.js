import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import img from '../../Media/Images/site.jpg'
import CloseIcon from '@mui/icons-material/Close';
import DialogAction from '../DialogAction';
import AlertSnackBar from '../SnackBarAlert'
import Loading from '../Loading';


const Sites = ({setSelectedSite}) => {

    const [idDelete,setIdDelete] = useState(null);
    const [openAlert,setOpenAlert] = useState(false);
    const [alertMessage,setAlertMessage] = useState(null);
    const [alertSeverity,setAlertSeverity] = useState(null);
    const [openDialog,setOpenDialog] = useState(false);
    const [message,setMessage] = useState(null);

    const [open, setOpen] = React.useState(false);
    const [sites, setSites] = React.useState([]);
    const [searchSites, setSearchSites] = React.useState(null);

    const [siteName, setSiteName] = React.useState([]);
    const [description, setDescription] = React.useState(null);
    const [themeId, setThemeId] = React.useState(null);


    /*PRODUCTS*/
    const [projectSettings,setProjectSettings] = useState([]);
    const [productProperty, setProductPropety] = useState(null);
    const [productType,setProductType] = useState(null);
    const [isMandatory,setIsMandatory] = useState(false);

    /*ORDERS*/
    const [orderSettings,setOrderSettings] = useState([]);
    const [orderProperty, setOrderPropety] = useState(null);
    const [orderType,setOrderType] = useState(null);
    const [orderIsMandatory,setOrderIsMandatory] = useState(false);
    const [themes,setThemes] = useState([]);
    const [loading,setLoading] = useState(false);

    const getThemes = () => {
        axios.get("http://localhost:8000/api/admin/theme/",{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setThemes(res.data.response);
        });
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        setSiteName(null);
        setThemeId(null);

        setProductPropety(null);
        setProductType(null);
        setIsMandatory(false);
        setProjectSettings([]);

        setOrderPropety(null);
        setOrderType(null);
        setOrderIsMandatory(false);
        setOrderSettings([]);

        setOpen(false);
    };


    const getSites = () => {
        setLoading(true);
        if(searchSites !== null && searchSites !== ''){
            axios.get("http://localhost:8000/api/admin/site/?text="+searchSites,{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                setSites(res.data.response)
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
              });
        }else{
            axios.get("http://localhost:8000/api/admin/site/",{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                setSites(res.data.response)
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
              });
        }
    }

    const handleAddSite= () => {
        axios.post("http://localhost:8000/api/admin/site/",
            {
                name: siteName, 
                description: description, 
                themeId: themeId, 
                productsSettings: {fields: projectSettings},
                ordersSettings: {fields: orderSettings}
            },
            {headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}}
        )
        .then(res => {
            setOpenAlert(true);
            setAlertSeverity('success');
            setAlertMessage('Site successfully created !');
            getSites();
        })
        handleClose();

    }

    const handleSelectDelete = (id) => {
        setIdDelete(id);
        setOpenDialog(true);
        setMessage("Are you sure you want to delete the site ?");
    }

    const handleDeleteSite = () => {
        axios.delete("http://localhost:8000/api/admin/site/"+idDelete,{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setOpenAlert(true);
            setAlertSeverity('success');
            setAlertMessage('Site deleted !');
            setMessage(null);
            setIdDelete(null);
            setOpenDialog(false);
            getSites();
        })
    }


    const addProperty = () => {
        setProjectSettings(oldArray => [...oldArray, {
            key: productProperty, 
            type: productType, 
            isMandatory: isMandatory
        }]);
        setProductPropety('');
        setProductType(null);
        setIsMandatory(false);
    }

    const addOrder = () => {
        setOrderSettings(oldArray => [...oldArray, {
            key: orderProperty, 
            type: orderType, 
            isMandatory: orderIsMandatory
        }]);
        setOrderPropety('');
        setOrderType(null);
        setOrderIsMandatory(false);
    }

    React.useEffect(() => {
        getSites();
        getThemes();
    },[searchSites])

    return (
        loading === false ?
        <div>
            <div style={{display: 'flex', marginTop: '2vw'}}>
                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,margin: 'auto' }} >
                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search a site" inputProps={{ 'aria-label': 'search google maps' }}  onChange={(e) => setSearchSites(e.target.value)}/>
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>

                <Button 
                    variant="outlined" style={{color: 'whitesmoke', backgroundColor: '#308695', right: '3vw'}} 
                    startIcon={<AddIcon style={{fontWeight:700, color: ''}}/>} onClick={handleClickOpen}>
                    Add site
                </Button>
            </div>

            <div  style={{marginTop: '5vw', height: '25vw'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }}>
                    {sites.length>0 && sites.map((site,index) => (
                        
                        <Grid item xs={2} sm={4} md={4} key={index} style={{margin: 'auto'}}>
                            <Card sx={{ maxWidth: 345 }} style={{margin: 'auto', backgroundColor: '#308695'}}>
                                <CardActionArea>
                                    <CardMedia component="img" height="180" image={img} alt="space"/>
                                    <CloseIcon style={{position: 'absolute', top: '.5vw', right: '.9vw', cursor: 'pointer'}} onClick={() => handleSelectDelete(site._id)}/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">{site.name}</Typography>
                                        {themes.length>0 && themes.map(theme =>(
                                            <Typography style={{position: 'absolute', top: '22%', left: '40%', fontWeight: 700, fontSize: '1vw'}} variant="body2" color="text.secondary">{theme._id === site.themeId && theme.name}</Typography>
                                        ))}
                                        <div style={{marginTop: '1vw'}}>
                                            <Button variant="outlined" style={{color: '#000', borderColor: '#000'}} href={site.linkDesktop} >To App</Button>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
            
            <div style={{width: '50vw', margin: 'auto',border: 1,borderStyle: 'solid', borderColor: 'whitesmoke',marginTop: '1vw'}}>
                <Typography style={{color: 'whitesmoke', fontSize: '6vw', fontWeight: 700}}>
                    WEB System
                </Typography>
            </div>

            <Dialog open={open}  maxWidth="md" onClose={handleClose}>
                <DialogTitle style={{margin: 'auto'}}>Add a site</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" id="name" label="Site name" type="text" fullWidth variant="outlined" onChange={(e) => setSiteName(e.target.value)}/>
                    <TextField autoFocus margin="dense" id="name" label="Description" type="text" fullWidth variant="outlined" onChange={(e) => setDescription(e.target.value)}/>             
                    <FormControl fullWidth style={{marginTop: '.5vw'}}>
                        <InputLabel id="demo-simple-select-label">Theme Id</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={themeId}
                            label="Theme Id"
                            onChange={(e) => setThemeId(e.target.value)}
                        >
                            <MenuItem value={"200000000000000000000001"}>Theme 1</MenuItem>
                            <MenuItem value={"200000000000000000000002"}>Theme 2</MenuItem>
                        </Select>
                    </FormControl>

                    <div style={{display: 'flex',marginTop: '1vw', marginBottom: '1vw'}}>
                        <Button 
                            variant="contained" startIcon={<AddIcon />} 
                            style={{backgroundColor: '#308695', margin: '0 auto'}}
                            onClick={addProperty}
                        >
                            Add Product
                        </Button>
                    </div>

                    {/* PRODUCT DEFAULT */}
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <TextField 
                            autoFocus 
                            margin="dense" id="name" label="Product property" 
                            type="text" 
                            variant="outlined"
                            value={productProperty} 
                            style={{width: '13vw'}}
                            onChange={(e) => setProductPropety(e.target.value)}
                        />

                        <FormControl style={{width: '7vw', marginTop: '.5vw', marginLeft: '2vw'}}>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                displayEmpty value={productType}
                                label="Type"
                                onChange={(e) => setProductType(e.target.value)}
                            >

                                <MenuItem value={"string"}>String</MenuItem>
                                <MenuItem value={"number"}>Number</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControlLabel 
                            control={<Checkbox checked={isMandatory} onChange={(e) => setIsMandatory(e.target.checked)} />} 
                            label="Is mandatory" style={{marginTop: '.5vw', marginLeft: '2vw'}}
                        />
                    </div>
                    {/* PRODUCT MAP */}
                    {projectSettings.map((setting,index) => (
                        <div style={{display: 'flex', flexDirection: 'row'}}>

                            <TextField 
                                margin="dense" id="name" label="Product name" 
                                type="text" 
                                variant="outlined"
                                value={setting.key} 
                                style={{width: '13vw'}}
                                onChange={(e) => {
                                    let newArray = [...projectSettings];
                                    newArray[index]['key'] = e.target.value;
                                    setProjectSettings(newArray);
                                }}
                            />

                            <FormControl style={{width: '7vw', marginTop: '.5vw', marginLeft: '2vw'}}>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={setting.type}
                                    label="Type"
                                    onChange={(e) => {
                                        let newArray = [...projectSettings];
                                        newArray[index]['type'] = e.target.value;
                                        setProjectSettings(newArray);
                                    }}
                                >
                                    <MenuItem value={"string"}>String</MenuItem>
                                    <MenuItem value={"number"}>Number</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControlLabel 
                                control={<Checkbox
                                            checked={setting.isMandatory}
                                            onChange={(e) => {
                                                let newArray = [...projectSettings];
                                                newArray[index]['isMandatory'] = e.target.checked;
                                                setProjectSettings(newArray);
                                            }} />} 
                                label="Is mandatory" style={{marginTop: '.5vw', marginLeft: '2vw'}}
                            />
                        </div>
                    ))}

                    <div style={{display: 'flex',marginTop: '1vw', marginBottom: '1vw'}}>
                        <Button 
                            variant="contained" startIcon={<AddIcon />} 
                            style={{backgroundColor: '#308695', margin: '0 auto'}}
                            onClick={addOrder}
                        >
                            Add order
                        </Button>
                    </div>
                    {/* ORDER DEFAULT */}
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <TextField 
                            autoFocus 
                            margin="dense" id="name" label="Order property" 
                            type="text" 
                            variant="outlined"
                            value={orderProperty} 
                            style={{width: '13vw'}}
                            onChange={(e) => setOrderPropety(e.target.value)}
                        />

                        <FormControl style={{width: '7vw', marginTop: '.5vw', marginLeft: '2vw'}}>
                            <InputLabel id="demo-simple-select-label">Order type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                displayEmpty value={orderType}
                                label="Order type"
                                onChange={(e) => setOrderType(e.target.value)}
                            >

                                <MenuItem value={"string"}>String</MenuItem>
                                <MenuItem value={"number"}>Number</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControlLabel 
                            control={<Checkbox checked={orderIsMandatory} onChange={(e) => setOrderIsMandatory(e.target.checked)} />} 
                            label="Is mandatory" style={{marginTop: '.5vw', marginLeft: '2vw'}}
                        />
                    </div>

                    {/* ORDER MAP */}
                    {orderSettings.map((setting,index) => (
                        <div style={{display: 'flex', flexDirection: 'row'}}>

                            <TextField 
                                margin="dense" id="name" label="Order Property" 
                                type="text" 
                                variant="outlined"
                                value={setting.key} 
                                style={{width: '13vw'}}
                                onChange={(e) => {
                                    let newArray = [...orderSettings];
                                    newArray[index]['key'] = e.target.value;
                                    setOrderSettings(newArray);
                                }}
                            />

                            <FormControl style={{width: '7vw', marginTop: '.5vw', marginLeft: '2vw'}}>
                                <InputLabel id="demo-simple-select-label">Order type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={setting.type}
                                    label="Order type"
                                    onChange={(e) => {
                                        let newArray = [...orderSettings];
                                        newArray[index]['type'] = e.target.value;
                                        setOrderSettings(newArray);
                                    }}
                                >
                                    <MenuItem value={"string"}>String</MenuItem>
                                    <MenuItem value={"number"}>Number</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControlLabel 
                                control={<Checkbox
                                            checked={setting.isMandatory}
                                            onChange={(e) => {
                                                let newArray = [...orderSettings];
                                                newArray[index]['isMandatory'] = e.target.checked;
                                                setOrderSettings(newArray);
                                            }} />} 
                                label="Is mandatory" style={{marginTop: '.5vw', marginLeft: '2vw'}}
                            />
                        </div>
                    ))}
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined"  style={{color: 'whitesmoke', backgroundColor: '#308695'}} onClick={handleClose}>Close</Button>
                    <Button 
                        disabled={siteName === null || description === null || themeId === null || orderSettings.length === 0 || projectSettings === 0}
                        variant="outlined"  style={{color: 'whitesmoke', backgroundColor: '#308695'}} onClick={handleAddSite}>Add</Button>
                </DialogActions>
            </Dialog>

            <DialogAction open={openDialog} setOpen={setOpenDialog} message={message} handler={handleDeleteSite}/>
            <AlertSnackBar open={openAlert} setOpen={setOpenAlert} message={alertMessage} severity={alertSeverity}/>
        </div>
        :
        <Loading text={"sites"}/>
    )
}

export default Sites;