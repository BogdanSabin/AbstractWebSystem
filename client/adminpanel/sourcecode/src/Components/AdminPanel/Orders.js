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
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loading from '../Loading';
import DialogAction from '../DialogAction';
import AlertSnackBar from '../SnackBarAlert'
import { Typography } from '@mui/material';


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

const Orders = ({sites}) => {
    const [orders, setOrders] = React.useState([]);
    const [selectedSite,setSelectedSite] = useState(null);
    const [loading,setLoading] = useState(false);

    const [openAlert,setOpenAlert] = useState(false);
    const [alertMessage,setAlertMessage] = useState(null);
    const [alertSeverity,setAlertSeverity] = useState(null);
    const [openDialog,setOpenDialog] = useState(false);
    const [message,setMessage] = useState(null);
    const [idDelete,setIdDelete] = useState(null);

    const handleSelectDelete = (id) => {
        setIdDelete(id);
        setOpenDialog(true);
        setMessage("Are you sure you want to delete the order ?");
    }

    const getOrders = () => {
        setLoading(true);
        axios.get("http://localhost:8000/api/admin/order/?siteId="+selectedSite,{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setOrders(res.data.response)
            setLoading(false);
        })
        .catch(error => {
            setAlertSeverity('info');
            setAlertMessage(error.response.data.error);
            setOpenAlert(true);
            setLoading(false);
            setOrders([]);
          });
    }

    const handleDeleteOrder = () => {
        axios.delete("http://localhost:8000/api/admin/order/"+idDelete,{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setOpenAlert(true);
            setAlertSeverity('success');
            setAlertMessage('Order successfully deleted !');
            setOpenDialog(false);
            getOrders();
        })
    }

    useEffect(() => {
        if(selectedSite !== null){
            getOrders();
        }
    },[selectedSite])

    return (
        loading === false ?
        <div>
            <div style={{display: 'flex', marginTop: '2vw'}}>
                <Paper style={{width: '20vw', margin: 'auto', padding: '.2vw'}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select site</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedSite}
                            label="Select site"
                            onChange={(e) => setSelectedSite(e.target.value)}
                        >
                            {sites.length > 0 ? sites.map(site => (
                                <MenuItem value={site._id}>{site.name}</MenuItem>
                            )) 
                            :null}
                        </Select>
                    </FormControl>
                </Paper>
            </div>

            {orders.length > 0 ?
            <TableContainer component={Paper} style={{width: '80vw', margin: 'auto', marginTop: '2vw'}}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Site</StyledTableCell>
                            {/* <StyledTableCell align="center">Products</StyledTableCell> */}
                            <StyledTableCell align="center">Order property</StyledTableCell>
                            <StyledTableCell align="center">Order value</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {orders.map((order) => (
                        (order.orderInfo && order.orderInfo.length > 0) && order.orderInfo.map(o => (
                            <StyledTableRow key={order.adminId}>
                                <StyledTableCell component="th" scope="order">{order.siteId}</StyledTableCell>
                            {/* <StyledTableCell align="center">{order.products.length > 0 && order.products.map(product => (product))}</StyledTableCell> */}
                                <StyledTableCell align="center">{o.key}</StyledTableCell>
                                <StyledTableCell align="center">{o.value}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button variant="outlined" 
                                        style={{color: 'whitesmoke', backgroundColor: '#308695'}} 
                                        startIcon={<DeleteIcon style={{fontWeight:700, color: '#fff'}}
                                        />}onClick={() => handleSelectDelete(order._id)}>
                                        Delete
                                    </Button>
                                </StyledTableCell>
                        </StyledTableRow>
                        ))
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            :
            <Paper style={{width: '30vw', margin: 'auto', marginTop: '15vw'}}>
                <Typography style={{textAlign: 'center', fontSize: '2vw'}}>No data. Please select a site</Typography>
            </Paper>}

            <DialogAction open={openDialog} setOpen={setOpenDialog} message={message} handler={handleDeleteOrder}/>
            <AlertSnackBar open={openAlert} setOpen={setOpenAlert} message={alertMessage} severity={alertSeverity}/>
        </div>
        :<Loading text={"site orders"}/>
    )
}

export default Orders;