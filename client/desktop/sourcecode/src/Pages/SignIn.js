import React, {useState} from 'react';
import SignUp from '../Components/SignIn/SignUp';
import SignIn from '../Components/SignIn/SignIn';
import './Sign-in.css';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';


const SignPage =({checkSession,siteId}) => {
    const [view,setView] = useState('22');
    const [open, setOpen] = useState(false);
    const [response,setResponse] = useState([]);
  
    const handleClose = () => {
      setOpen(false);
      setView('sign-in')
    };

  return (
    <div>
        {view === 'sign-up' ? <SignUp setView={setView} setOpen={setOpen} setResponse={setResponse} siteId={siteId}/> : <SignIn setView={setView} checkSession={checkSession} siteId={siteId}/> }

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
