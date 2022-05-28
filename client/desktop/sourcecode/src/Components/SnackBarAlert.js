import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Severities //
// - error
// - warning
// - success
// - info

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }

const SnackBarAlert = ({open,setOpen,severity,message}) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} TransitionComponent={TransitionRight}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>{message}</Alert>
        </Snackbar>
    );
}
export default SnackBarAlert