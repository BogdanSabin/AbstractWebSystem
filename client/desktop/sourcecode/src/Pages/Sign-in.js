import React, {useState} from 'react';
import SignUp from '../Components/SignIn/SignUp';
import SignIn from '../Components/SignIn/SignIn';
import './Sign-in.css';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const SignPage =({checkSession}) => {
    const [view,setView] = useState('22');
    const [open, setOpen] = useState(false);
    const [response,setResponse] = useState([]);
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <div>
        {/* <SignIn setView={setView}/> */}
        {view === 'sign-up' ? <SignUp setView={setView} setOpen={setOpen} setResponse={setResponse}/> : <SignIn setView={setView} checkSession={checkSession}/> }

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        {view === 'sign-up' ?
          <DialogTitle id="alert-dialog-title">
            {"Hello "+response.email+" please confirm account by clicking on the link provided to your email !"}
          </DialogTitle>
        :null}
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SignPage;
