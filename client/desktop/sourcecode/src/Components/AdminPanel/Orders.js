import React, {useEffect} from 'react';
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
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const Orders = ({sites}) => {
    const [orders, setOrders] = React.useState([]);
    const [searchOrders, setSearchOrders] = React.useState(null);



    const getOrders = () => {
        axios.get("http://localhost:8000/api/admin/order/",{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setOrders(res.data.response)
        })
    }

    const handleDeleteOrder = (orderId) => {
        axios.delete("http://localhost:8000/api/admin/order/:orderid",orderId)
        .then(res => {
            getOrders();
        })
    }

    useEffect(() => {
        getOrders();
    },[])

    return (
        <div>
            <div style={{display: 'flex', marginTop: '2vw'}}>
                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,margin: 'auto' }} >
                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search a order" inputProps={{ 'aria-label': 'search google maps' }} />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onChange={(e) => setSearchOrders(e.target.value)}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>

            <TableContainer component={Paper} style={{width: '80vw', margin: 'auto', marginTop: '2vw'}}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Site</StyledTableCell>
                            <StyledTableCell align="center">Products</StyledTableCell>
                            <StyledTableCell align="center">Address</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.calories}</StyledTableCell>
                            <StyledTableCell align="center">{row.fat}</StyledTableCell>
                            <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant="outlined" 
                                    style={{color: 'whitesmoke', backgroundColor: '#308695'}} 
                                    startIcon={<DeleteIcon style={{fontWeight:700, color: '#f44336'}}
                                    />}onClick={() => handleDeleteOrder(row.name)}>
                                    Delete
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Orders;