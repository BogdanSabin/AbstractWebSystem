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
import imag from '../../Media/Images/space.jpg'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useStyles from './styles2';

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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const classes = useStyles();

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
        }
    }
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDialogOrder, setOpenDialogOrder] = React.useState(false);

    const handleClickOpen = (id) => {
        setOpenDialog(true);
        setProductId(id);
    };
  
    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleCloseOrder = () => {
        setOpenDialogOrder(false);
    };
  
    const open = Boolean(anchorEl);

    useEffect(() => {
        axios.get("http://localhost:8000/api/admin/site/"+selectedSite, {headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res =>{
            setSite(res.data.response);
            axios.get("http://localhost:8000/api/admin/product/?siteId="+selectedSite, {headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                setSiteProducts(res.data.response);
            })
        })
    },[]);

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
        }, 3000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [orderValue])

    const handleAddOrder = () => {
        axios.post("http://localhost:8000/api/admin/order/",{siteId: site._id, products: cart, orderInfo: orders},  {headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setOrders([]);
            setOrderValue(null);
            setOrderKey(null);
            setCart([]);
            setProductId(null);
            setOpenDialogOrder(false);
        }) 
    }

    return (
        <div className={classes.appBackground}>
            {site ?
            <div className={classes.container}>
                <div className={classes.appBar}>
                    <Typography className={classes.appTitle} style={{fontSize: '1.2vw'}}>{site.name}</Typography>
                    <div className={classes.logoutDiv}>
                        <Button className={classes.logout} variant="contained" onClick={() => {localStorage.removeItem('token'); checkSession()}}>Log Out</Button>
                    </div>
                    <div className={classes.cart}> 
                        <IconButton aria-label="cart" onClick={() => setOpenDialogOrder(true)}>
                            <StyledBadge badgeContent={cart.length} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                    </div>
                </div>
                <div className={classes.appDescription}>
                    <Paper className={classes.descriptionBackground} elevation={3}>
                        <Typography className={classes.descriptionText}>{site.description}</Typography>
                    </Paper>
                </div>
                <div>
                    <div className={classes.orderProducts}>
                        {siteProducts.length>0 && siteProducts.map((product,index) => (
                            <Card sx={{ maxWidth: 345 }} 
                                className={classes.cardProduct} 
                                onMouseEnter={(e) =>handlePopoverOpen(e,product.fields)}
                                onMouseLeave={handlePopoverClose}
                                >
                                {product.fields.map(item => (item.key === 'name' && <CardHeader title={item.value} />))}
                                <CardMedia component="img" height="194" image={imag} alt="Image" />
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
                    (item.key !=='name') && (item.key != 'price') &&
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
                {/* {selectedProduct.map(item => (
                    // console.log(item)
                    // (item.key === 'name' || item.key ==='Name') ?
                    // :null
                ))} */}

                <DialogActions>
                    <Button onClick={handleClose} style={{position: 'absolute', left: '1vw'}}>Disagree</Button>
                    <Button onClick={handleAddToCart} style={{marginRight: '1vw'}}>Agree</Button>
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
                        <Typography style={{margin: 'auto'}}>Your cart is empty !</Typography>
                    :
                        site.ordersSettings['fields'].map(order => (
                            <TextField 
                                margin="dense" 
                                required={order.isMandatory} 
                                id="name" 
                                label={order.key} 
                                type={order.type} 
                                fullWidth 
                                variant="outlined" 
                                onChange={(e) => {setOrderValue(e.target.value); setOrderKey(order.key)}}
                                />
                        ))
                }

                </DialogContent>


                <DialogActions style={{position: 'relative'}}>
                    <Button onClick={handleCloseOrder} style={{position: 'absolute', left: '1vw', bottom: '.2vw'}}>Close</Button>
                    {cart.length !== 0 &&
                    <Button onClick={handleAddOrder} style={{marginRight: '1vw'}}>Place Order</Button>}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ApplicationOne;