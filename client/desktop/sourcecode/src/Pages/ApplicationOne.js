import { DialogContent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
// import './ApplicationOne.css';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import imag from '../Media/Images/default.png'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useStyles from './styles';
import useStyles2 from './styles2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertSnackBar from '../Components/SnackBarAlert';
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const ApplicationOne = ({selectedSite,checkSession}) =>{
    const [site,setSite] = useState();
    const [siteProducts,setSiteProducts] = useState([]);
    const [selectedProduct,setSelectedProduct] = useState([]);
    const [orders,setOrders] = useState([]);
    const [orderKey,setOrderKey] = useState(null);
    const [orderValue,setOrderValue] = useState(null);
    const [productId,setProductId] = useState(null);
    const [cart,setCart] = useState([]);
    const [cartDetails,setCartDetails] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userOrders, setUserOrders] = useState([]);
    const [orderPrices, setOrderPrices] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [flagTheme,setFlagTheme] = useState(1);
    const [openAlert,setOpenAlert] = useState(false);
    const [alertMessage,setAlertMessage] = useState(null);
    const [alertSeverity,setAlertSeverity] = useState(null);
    const [loading,setLoading] = useState(false);

    const classes = useStyles();
    const classes2 = useStyles2();


    const handlePopoverOpen = (event,array) => {
        if(array.length>2){
            setAnchorEl(event.currentTarget);
            setSelectedProduct(array);
        }
    };


    const handleAddToCart = () => {
        if(productId !== null){
            setCart(oldArray => [...oldArray, productId]);
            setOpenDialog(false);
            setProductId(null);
            setOpenAlert(true);
            setAlertSeverity('success');
            setAlertMessage('Product successfully added to cart !');
        }
    }
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDialogOrder, setOpenDialogOrder] = React.useState(false);
    const [openOrders, setOpenOrders] = React.useState(false);

    const handleClickOpen = (id) => {
        axios.get("http://localhost:8001/api/desktop/product/"+id,{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setCartDetails(oldArray => [...oldArray, res.data.response]);
        })
        setOpenDialog(true);
        setProductId(id);
    };
  
    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleCloseWallet = () => {
        setOpenOrders(false);
    };
    const handleCloseOrder = () => {
        setOpenDialogOrder(false);
    };

    const handleDeleteCartItem = (itemId) => {
        let temp = cartDetails;
        setCartDetails([]);
        for (let index = 0; index < temp.length; index++) {
            if(temp[index]._id !== itemId){
                setCartDetails(oldArray => [...oldArray, temp[index]]);
            }      
        }
        let temp2 = cart;
        setCart([]);
        for (let index = 0; index < temp2.length; index++) {
            if(temp2[index] !== itemId){
                setCart(oldArray => [...oldArray, temp2[index]]);
            }
            
        }

        setOpenAlert(true);
        setAlertSeverity('info');
        setAlertMessage('Product removed from cart !');
    }

    const handleDeleteWalletItem = (itemId) => {
        axios.delete("http://localhost:8000/api/admin/order/"+itemId,{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            getOrders();
        });
    }
  
    const open = Boolean(anchorEl);

    useEffect(() => {
        getOrders();
        setLoading(true);
        axios.get("http://localhost:8001/api/desktop/site/"+selectedSite, {headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res =>{
            setSite(res.data.response);
            if(res.data.response.themeId === '200000000000000000000001'){
                setFlagTheme(0);
            }
            axios.get("http://localhost:8001/api/desktop/product/?siteId="+selectedSite, {headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                setSiteProducts(res.data.response);
                setLoading(false);
            })
        })
        
    },[]);

    useEffect(() => {
        if(siteProducts.length > 0){
            for (let index = 0; index < siteProducts.length; index++) {
                axios.get("http://localhost:8001/api/desktop/image/byref/"+siteProducts[index]._id+"/scope/Product",{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`},responseType: 'arraybuffer'})
                .then(res => {
                    setProductImages(oldArray => [...oldArray, {
                        productId: siteProducts[index]._id,
                        image: new Buffer(res.data, 'binary').toString('base64')
                    }])
                })
                
            }
        }
    },[siteProducts]);


    const handleAddOrderDetails = (key,value) => {
        
        setOrders(oldArray => [...oldArray, {
            key: key, 
            value: value
        }]);
    }


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(orderValue !== '' && orderValue !== null){
                handleAddOrderDetails(orderKey,orderValue);
            }
        }, 500)
    
        return () => clearTimeout(delayDebounceFn)
      }, [orderValue])

    const handleAddOrder = () => {
        axios.post("http://localhost:8001/api/desktop/order/",{siteId: site._id, products: cart, orderInfo: orders},  {headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setOrders([]);
            setOrderValue(null);
            setOrderKey(null);
            setCart([]);
            setProductId(null);
            setOpenDialogOrder(false);
            setOpenAlert(true);
            setAlertSeverity('success');
            setAlertMessage('Order successfully placed !');
            getOrders();
        }) 
    }



    const getOrders = () => {
        axios.get("http://localhost:8001/api/desktop/order/?siteId="+selectedSite,{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            for (let index = 0; index < res.data.response.length; index++) {
                if(Object.values(res.data.response[index].customerId)[0] === localStorage.getItem('userID')){
                    setUserOrders(oldArray => [...oldArray, {
                        id: res.data.response[index]._id,
                        orderInfo: res.data.response[index].orderInfo,
                        products: res.data.response[index].products
                    }])
                }
            }
        })
    }

    useEffect(() => {
        if(userOrders.length > 0){
            for (let index = 0; index < userOrders.length; index++) {
                var price = 0;
                for (let index2 = 0; index2 < userOrders[index].products.length; index2++) {
                    let array3 = userOrders[index].products[index2].fields
                    for (let index3 = 0; index3 < array3.length; index3++) {
                        if(array3[index3].key === 'price' || array3[index3].key === 'Price'){
                            price = price + parseInt(array3[index3].value);
                        }        
                    }

                }
                setOrderPrices(oldArray => [...oldArray, {
                    id: userOrders[index].id,
                    totalPrice: price
                }])          
            }
        }
    },[userOrders])

    return (
        <div className={flagTheme === 1 ? classes2.appBackground : classes.appBackground}>
            {site ?
            <div className={flagTheme === 1 ? classes2.container:classes.container}>
                <div className={flagTheme === 1 ? classes2.appBar :classes.appBar}>
                    <Typography className={flagTheme === 1 ? classes2.appTitle : classes.appTitle} style={{fontSize: '1.2vw'}}>{site.name}</Typography>
                    <div className={flagTheme === 1 ? classes2.logoutDiv : classes.logoutDiv}>
                        <Button className={flagTheme === 1 ? classes2.logout : classes.logout} variant="contained" onClick={() => {localStorage.removeItem('token'); checkSession()}}>Log Out</Button>
                    </div>
                    <div className={flagTheme === 1 ? classes2.cart : classes.cart}> 
                        <IconButton aria-label="cart" onClick={() => setOpenDialogOrder(true)}>
                            <StyledBadge badgeContent={cart.length} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                    </div>
                    <div className={flagTheme === 1 ? classes2.orders : classes.orders}> 
                        <IconButton aria-label="cart" onClick={() => setOpenOrders(true)}>
                            <StyledBadge badgeContent={userOrders.length} color="secondary">
                                <AccountBalanceWalletIcon />
                            </StyledBadge>
                        </IconButton>
                    </div>
                </div>
                <div className={flagTheme === 1 ? classes2.appDescription : classes.appDescription}>
                    <Paper className={flagTheme === 1 ? classes2.descriptionBackground : classes.descriptionBackground} elevation={3}>
                        <Typography className={flagTheme === 1 ? classes2.descriptionText : classes.descriptionText}>{site.description}</Typography>
                    </Paper>
                </div>
                {loading === false ?
                <div>
                    <div className={flagTheme === 1 ? classes2.orderProducts : classes.orderProducts}>
                        {siteProducts.length>0 && siteProducts.map((product,index) => (
                            <Card sx={{ maxWidth: 345 }} 
                                className={flagTheme === 1 ? classes2.cardProduct : classes.cardProduct} 
                                onMouseEnter={(e) =>handlePopoverOpen(e,product.fields)}
                                onMouseLeave={handlePopoverClose}
                                >
                                {product.fields.map(item => (item.key === 'name' && <CardHeader title={item.value} />))}
                                {productImages.length === 0 ?
                                    <CardMedia component="img" height="194" width="190" image={imag} alt="Image" />
                                :
                                <CardMedia component="img" height="194" image={
                                    productImages.map(img => (
                                        img.productId === product.id ?
                                        `data:image/jpeg;base64,${img.image}` : imag
                                    
                                    ))
                                    } alt="Image" />
                                
                                }
                                <CardActions disableSpacing style={{position: 'relative'}}>
                                    <Button variant="contained" style={{backgroundColor: '#6c5ab3'}} onClick={() => handleClickOpen(product._id)}>Buy</Button>
                                    {product.fields.map(item => (
                                        (item.key === 'price' || item.key === 'Price') &&
                                        <Typography style={{position: 'absolute',right: '2vw'}}>{item.value+' '}$</Typography>
                                    ))}
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                </div>
                :
                <div>
                    <CircularProgress size={'5vw'} style={{color: 'white', marginTop: '10vw',marginBottom: '1vw',}}/>
                    <Typography style={{fontSize: '3vw', marginLeft: '1.5vw', color: '#fff'}}>Loading site products ...</Typography>
                </div>}
            </div>
            :null}
            <Popover id="mouse-over-popover"
                sx={{pointerEvents: 'none', padding: '2vw'}}
                style={{marginTop: '1vw'}}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                  }}
                onClose={handlePopoverClose}
                disableRestoreFocus
             >
                {selectedProduct.length>0 && selectedProduct.map(item => (
                    (item.key !=='name') && (item.key !== 'price') &&
                 <div style={{ padding: '1vw', width: '20vw', height: '10vw'}}>
                    <div style={{marginBottom: '1vw', margin: 'auto'}}>
                        <Typography style={{fontWeight: 700, fontSize: '1vw', textAlign: 'center', marginBottom: '1vw'}}>{item.key}</Typography>
                        <Typography style={{maxWidth: '25vw', textAlign: 'center'}}>{item.value}</Typography>
                    </div>
                </div>
                ))}
            </Popover>

            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Add product  to cart ?"}</DialogTitle> {/*"}<b>{item.value}</b>{" */}

                <DialogActions>
                    <Button onClick={handleClose} style={{position: 'absolute', left: '1vw'}}>Disagree</Button>
                    <Button onClick={handleAddToCart} variant="outlined" className={classes.buttonStyle} style={{marginRight: '1vw'}}>Agree</Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={openDialogOrder}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseOrder}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Complete all mandatory fields to place order"}</DialogTitle>
                <DialogContent>
                    {cart.length === 0 ?
                        <Typography style={{margin: 'auto', textAlign: 'center'}}>Your cart is empty !</Typography>
                    :
                        site.ordersSettings['fields'].map(order => (
                            <div>
                            <TextField 
                                margin="dense" 
                                required={order.isMandatory} 
                                id="name" 
                                label={order.key} 
                                type={order.type} 
                                fullWidth 
                                variant="outlined"
                                style={{marginBottom: '2vw'}}
                                onChange={(e) => {setOrderValue(e.target.value); setOrderKey(order.key)}}
                                />

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 330 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Product name</TableCell>
                                            <TableCell>Product price</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {cartDetails.map((cartItem,index) => (
                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    {cartItem['fields'].map((item,index) => (
                                                    <>
                                                    {item.key==='name' || item.key==='Name' ?
                                                        <TableCell component="th" scope="row">{item.value}</TableCell>
                                                    :null}
                                                    {item.key==='price' || item.key==='Price' ?
                                                        <TableCell component="th" scope="row">{item.value}</TableCell>
                                                    :null}
                                                    </>
                                                    ))}
                                                    <TableCell><Button onClick={() => handleDeleteCartItem(cartItem._id)}>Delete</Button></TableCell>
                                                </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        ))
                }

                </DialogContent>


                <DialogActions style={{position: 'relative'}}>
                    <Button onClick={handleCloseOrder} style={{position: 'absolute', left: '1vw', bottom: '.2vw'}}>Close</Button>
                    {cart.length !== 0 &&
                    <Button onClick={handleAddOrder} disabled={orderValue === null} className={classes.buttonStyle} style={{marginRight: '1vw'}}>Place Order</Button>}
                </DialogActions>
            </Dialog>


            <Dialog
                open={openOrders}
                TransitionComponent={Transition}
                keepMounted
                maxWidth="lg"
                onClose={handleCloseWallet}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{textAlign: 'center'}}>{"Your orders"}</DialogTitle>
                <DialogContent>
                    {userOrders.length === 0 ?
                        <Typography style={{margin: 'auto', textAlign: 'center'}}>You don't have orders !</Typography>
                    :
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 330 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order No</TableCell>
                                        <TableCell>Product Details</TableCell>
                                        <TableCell>Order Details</TableCell>
                                        <TableCell>Total price / order</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userOrders.map((order,index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">
                                                {index}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {order.products ? 
                                                    order.products.length> 0 && order.products.map(product =>(
                                                    product.fields && product.fields.map(item => (
                                                        item.key === 'name' || item.key === 'Name' ?
                                                            item.value+", "
                                                        :null
                                                    ))
                                                )):null}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {order.orderInfo ? 
                                                    order.orderInfo.map(item => (
                                                        item.value+", "
                                                    ))
                                                :null}
                                            </TableCell>
                                            {orderPrices.length > 0 ? 
                                                orderPrices.map(item =>(
                                                    item.id === order.id ?
                                                        <TableCell>
                                                            {item.totalPrice}
                                                        </TableCell>
                                                    :null
                                                ))
                                            :null}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                }

                </DialogContent>


                <DialogActions style={{position: 'relative'}}>
                    <Button onClick={() => setOpenOrders(false)} style={{position: 'absolute', left: '1vw', bottom: '.2vw', marginTop: '1vw'}}>Close</Button>
                </DialogActions>
            </Dialog>

            <AlertSnackBar open={openAlert} setOpen={setOpenAlert} message={alertMessage} severity={alertSeverity}/>
        </div>
    )
}

export default ApplicationOne;