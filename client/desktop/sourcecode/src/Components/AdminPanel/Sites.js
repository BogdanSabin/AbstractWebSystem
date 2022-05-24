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
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#308695',
        color: theme.palette.common.white,
        fontSize: '1vw',
        fontWeigth: 700
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const Sites = () => {
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
        if(searchSites !== null && searchSites !== ''){
            axios.get("http://localhost:8000/api/admin/site/?text="+searchSites,{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                setSites(res.data.response)
            })
        }else{
            axios.get("http://localhost:8000/api/admin/site/",{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                setSites(res.data.response)
            })
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
            getSites();
        })
        handleClose();

    }

    const handleDeleteSite = (site) => {
        axios.delete("http://localhost:8000/api/admin/site/"+site,{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
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
    },[searchSites])

    return (
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
                    startIcon={<AddIcon style={{fontWeight:700, color: ''}}/>}onClick={handleClickOpen}>
                    Add site
                </Button>
            </div>

            <TableContainer component={Paper} style={{width: '80vw', margin: 'auto', marginTop: '2vw', maxHeight: '28vw'}}>
                <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Site name</StyledTableCell>
                        <StyledTableCell align="center">Description</StyledTableCell>
                        <StyledTableCell align="center">ThemeId</StyledTableCell>
                        <StyledTableCell align="center">Product name</StyledTableCell>
                        <StyledTableCell align="center">Product price</StyledTableCell>
                        <StyledTableCell align="center">Order email</StyledTableCell>
                        <StyledTableCell align="center">Actions</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {sites.map((site) => (
                        <StyledTableRow key={site.id}>
                            <StyledTableCell component="th" scope="row">{site.name}</StyledTableCell>
                            <StyledTableCell align="center">{site.description}</StyledTableCell>
                            <StyledTableCell align="center">{site.themeId}</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center">{site["ordersSettings"].fields[0].key}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant="outlined" 
                                    style={{color: 'whitesmoke', backgroundColor: '#308695'}} 
                                    startIcon={<DeleteIcon style={{fontWeight:700, color: 'whitesmoke'}}
                                    />}onClick={() => handleDeleteSite(site.id)}>
                                    Delete
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <div style={{width: '50vw', margin: 'auto',border: 1,borderStyle: 'solid', borderColor: 'whitesmoke',marginTop: '4vw'}}>
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
                            margin="dense" id="name" label="Product name" 
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
                    <Button variant="outlined"  style={{color: 'whitesmoke', backgroundColor: '#308695'}} onClick={handleAddSite}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Sites;