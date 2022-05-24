import * as React from 'react';
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
    const [searchProduct, setSearchProduct] = React.useState(null);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        setProductName(null);
        setProductPrice(null);
        setDescription(null);
        setSite(null);
        setOpen(false);
    };

    const [productName, setProductName] = React.useState(null);
    const [productPrice, setProductPrice] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [site, setSite] = React.useState(null);

    React.useEffect(() => {
        getProducts();
    },[])

    const getProducts = () => {
        if(searchProduct !== null && searchProduct !== ''){
            axios.get("http://localhost:8000/api/admin/product/",{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                setProducts(res.data.response)
            }) 
        }else{
            axios.get("http://localhost:8000/api/admin/product/",{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                setProducts(res.data.response)
            })
        }
    }

    const handleAddProduct = () => {
        axios.post("http://localhost:8000/api/admin/product/",
            {siteId: site, fields: [{key: 'name', value: productName}, {key: 'price', value: productPrice}, {key: 'description',value: description}]}, 
            {  headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}}
        )
        .then(res => {
            getProducts();
        })
        handleClose();

    }

    const handleDeleteProduct = (productId) => {
        axios.delete("http://localhost:8000/api/admin/product/"+productId,{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            getProducts();
        })
    }




    return (
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
                        <StyledTableCell align="center">Product name</StyledTableCell>
                        <StyledTableCell align="center">Price</StyledTableCell>
                        <StyledTableCell align="center">Description</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {products.map((product) => (
                        <StyledTableRow key={product.id}>
                            <StyledTableCell component="th" scope="product">{product.siteId}</StyledTableCell>
                            <StyledTableCell align="center">{product['fields'][0]['value']}</StyledTableCell>
                            <StyledTableCell align="center">{product['fields'][1]['value']} €</StyledTableCell>
                            <StyledTableCell align="center">{product['fields'][2]['value']}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant="outlined" 
                                    style={{color: 'whitesmoke', backgroundColor: '#308695'}} 
                                    startIcon={<DeleteIcon style={{fontWeight:700, color: 'whitesmoke'}}
                                    onClick={() => handleDeleteProduct(product.id)}
                                />}>
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
                        onChange={(e) => setSite(e.target.value)}
                    >
                        {sites.map(sit => (
                            <MenuItem value={sit.id}>{sit.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                    <TextField autoFocus margin="dense" id="name" label="Product name" type="text" fullWidth variant="outlined" onChange={(e) => setProductName(e.target.value)}/>
                    <TextField autoFocus margin="dense" id="name" label="Product price" type="number" fullWidth variant="outlined" onChange={(e) => setProductPrice(e.target.value)}/>
                    <TextField autoFocus margin="dense" id="name" label="Description" type="text" fullWidth variant="outlined" onChange={(e) => setDescription(e.target.value)}/>
                </DialogContent>
                <DialogActions>
                <Button variant="outlined"  style={{color: 'whitesmoke', backgroundColor: '#308695'}} onClick={handleClose}>Close</Button>
                <Button variant="outlined"  style={{color: 'whitesmoke', backgroundColor: '#308695'}} disabled={sites === null || productName === null || productPrice === null || description === null } onClick={handleAddProduct}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Products;