import React, {useState,useEffect} from 'react';
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
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import Loading from '../Loading';
import DialogAction from '../DialogAction';
import AlertSnackBar from '../SnackBarAlert'

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


const Products = ({sites}) => {
    const [open, setOpen] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [productValue, setProductValue] = React.useState(null);
    const [productKey, setProductKey] = React.useState(null);
    const [productValues, setProductValues] = React.useState([]);
    const [searchProduct, setSearchProduct] = React.useState(null);
    const [site, setSite] = React.useState(null);
    const [selectedSite, setSelectedSite] = React.useState();
    const [image, setImage] = useState(null);
    const [loading,setLoading] = useState(false);

    const [openAlert,setOpenAlert] = useState(false);
    const [alertMessage,setAlertMessage] = useState(null);
    const [alertSeverity,setAlertSeverity] = useState(null);
    const [openDialog,setOpenDialog] = useState(false);
    const [message,setMessage] = useState(null);
    const [idDelete,setIdDelete] = useState(null);
    const [idProductImage,setIdProductImage] = useState(null);
    const [openImageDialog,setOpenImageDialog] = useState(false);
    const handleAddImage = (productId) => {
        setIdProductImage(productId);
        setOpenImageDialog(true)
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        setSite(null);
        setOpen(false);
        setSelectedSite();
    };

    const handleCloseImageDialog = () => {
        setImage(null);
        setOpenImageDialog(false);
        setIdProductImage(null);
    }

    const handleSaveImage = () => {
        var formData = new FormData();
        formData.append('referenceData', '{"resourceScope": "Product", "resourceId": "'+idProductImage+'", "displayAs": "cover"}');
        formData.append('imageData', image );
        axios.post("http://localhost:8000/api/admin/image",formData,{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setOpenAlert(true);
            setAlertSeverity('success');
            setAlertMessage('Product image successfully added !');
            handleCloseImageDialog();
        })
    }


    useEffect(() => {
        setProducts([]);
        getProducts();
    },[searchProduct])

    const getProducts = () => {
        setLoading(true);
        if(searchProduct !== null && searchProduct !== ''){
            axios.get("http://localhost:8000/api/admin/product/",{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                setProducts(res.data.response)
                setLoading(false);
            })
            .catch(error => {
                setAlertSeverity('error');
                setAlertMessage(error.response.data.error);
                setOpenAlert(true);
                setLoading(false);
              });
        }
        else{
            axios.get("http://localhost:8000/api/admin/product/",{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                setProducts(res.data.response)
                setLoading(false);
            })
            .catch(error => {
                setAlertSeverity('error');
                setAlertMessage(error.response.data.error);
                setOpenAlert(true);
                setLoading(false);
              });
        }

    }

    const getSite = (id) => {
        axios.get("http://localhost:8000/api/admin/site/"+id,{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setSelectedSite(res.data.response)
        })
    }

    const handleAddProduct = () => {
        setProductKey(null);
        setProductValue(null);
        setProductValues([]);
        axios.post("http://localhost:8000/api/admin/product/",
            {siteId: site, fields: productValues}, 
            {  headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}}
        )
        .then(res => {
            setOpenAlert(true);
            setAlertSeverity('success');
            setAlertMessage('Product successfully created !');
            setProductValues([]);
            setProductValue(null);
            setProductKey(null);
            setSite(null);
            getProducts();
            setSelectedSite();
        })
        handleClose();

    }

    const handleDeleteProduct = () => {
        axios.delete("http://localhost:8000/api/admin/product/"+idDelete,{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setOpenAlert(true);
            setAlertSeverity('success');
            setAlertMessage('Product successfully deleted !');
            setOpenDialog(false);
            getProducts();
        })
    }

    const handleAddProductDetails = (key,value) => {
        setProductValues(oldArray => [...oldArray, {
            key: key, 
            value: value
        }]);
    }

    const handleSelectDelete = (id) => {
        setIdDelete(id);
        setOpenDialog(true);
        setMessage("Are you sure you want to delete the product ?");
    }


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(productValue !== '' && productValue !== null){
                handleAddProductDetails(productKey,productValue);
            }
        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [productValue])

    return (
        loading === false ?
        <div>
            <div style={{display: 'flex', marginTop: '2vw'}}>
                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,margin: 'auto' }} >
                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search a product" inputProps={{ 'aria-label': 'search google maps' }} onChange={(e) => setSearchProduct(e.target.value)}/>
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>

                <Button 
                    variant="outlined" style={{color: 'whitesmoke', backgroundColor: '#308695', right: '3vw'}} 
                    startIcon={<AddIcon style={{fontWeight:700, color: ''}}/>}
                     onClick={handleClickOpen}>
                    Add product
                </Button>
            </div>


            <TableContainer component={Paper} style={{width: '80vw', margin: 'auto', marginTop: '2vw', maxHeight: '28vw'}}>
                <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Site</StyledTableCell>
                        <StyledTableCell align="center">Product property</StyledTableCell>
                        <StyledTableCell align="center">Property value</StyledTableCell>
                        <StyledTableCell align="center">Add/Change image</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {products.length>0 && products.map((product) => (
                        // product['fields'].map(val => (
                            <StyledTableRow key={product.id} >
                                {sites.map(sit => (
                                    sit.id === product.siteId ?
                                        <StyledTableCell scope="product">{sit.name}</StyledTableCell>
                                    :null
                                ))}
                                <StyledTableCell align="center" scope="product">
                                    {product['fields'].map(val => ( val.key+", "))}
                                </StyledTableCell>
                                <StyledTableCell align="center" scope="product">
                                    {product['fields'].map(val => ( val.value+", "))}
                                </StyledTableCell>
                                {/* <StyledTableCell align="center" scope="product" >{val.value}</StyledTableCell> */}
                                <StyledTableCell align="center">
                                    <Button variant="outlined" style={{color: 'whitesmoke', backgroundColor: '#308695'}} onClick={() => handleAddImage(product.id)}>
                                        Upload
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button variant="outlined" 
                                        style={{color: 'whitesmoke', backgroundColor: '#308695'}} 
                                        startIcon={<DeleteIcon style={{fontWeight:700, color: 'whitesmoke'}}
                                        
                                        />}onClick={() => {handleSelectDelete(product._id);}}>
                                        Delete
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        // ))
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{width: '50vw', margin: 'auto',border: 1,borderStyle: 'solid', borderColor: 'whitesmoke',marginTop: '4vw'}}>
                <Typography style={{color: 'whitesmoke', fontSize: '6vw', fontWeight: 700}}>
                    WEB System
                </Typography>
            </div>


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{margin: 'auto'}}>Add a Product</DialogTitle>
                <DialogContent>
                <FormControl fullWidth style={{marginTop: '1vw'}}>
                    <InputLabel id="demo-simple-select-label">Site</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={site}
                        label="Sites"
                        onChange={(e) => {setSite(e.target.value);getSite(e.target.value)}}
                    >
                        {sites.map(sit => (
                            <MenuItem value={sit.id}>{sit.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {selectedSite ?
                    selectedSite.productsSettings['fields'] ? selectedSite.productsSettings['fields'].map(f => (
                        <TextField autoFocus margin="dense" required={f.isMandatory} id="name" label={f.key} type={f.type} fullWidth variant="outlined" onChange={(e) => {setProductValue(e.target.value); setProductKey(f.key)}}/>
                    )):null
                :null}
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined"  style={{color: 'whitesmoke', backgroundColor: '#308695'}} onClick={handleClose}>Close</Button>
                    <Button variant="outlined"  style={{color: 'whitesmoke', backgroundColor: '#308695'}} onClick={handleAddProduct}>Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openImageDialog} onClose={handleCloseImageDialog}>
                <DialogTitle style={{margin: 'auto'}}>Add product image</DialogTitle>
                <DialogContent>
                    <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined"  style={{color: 'whitesmoke', backgroundColor: '#308695'}} onClick={handleCloseImageDialog}>Close</Button>
                    <Button variant="outlined"  style={{color: 'whitesmoke', backgroundColor: '#308695'}} onClick={handleSaveImage}>Add</Button>
                </DialogActions>
            </Dialog>

            <DialogAction open={openDialog} setOpen={setOpenDialog} message={message} handler={handleDeleteProduct}/>
            <AlertSnackBar open={openAlert} setOpen={setOpenAlert} message={alertMessage} severity={alertSeverity}/>
        </div>
        :
        <Loading text={"site products"}/>
    )
}

export default Products;