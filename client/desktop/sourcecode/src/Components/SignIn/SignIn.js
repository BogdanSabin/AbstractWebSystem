import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import { DialogContent, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import axios from 'axios';
import AlertSnackBar from '../SnackBarAlert'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

const SignUp =({setView,checkSession}) => {
    const [showPassword,setShowPassword] = useState(false);

    const [openAlert,setOpenAlert] = useState(false);
    const [alertMessage,setAlertMessage] = useState(null);
    const [alertSeverity,setAlertSeverity] = useState(null);

    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);

    const [flagChange,setFlagChange] = useState(0);
    const [resetToken,setResetToken] = useState(null);
    const [openChangePassword,setOpenChangePassword] = useState(false);




    const handleLogin = () => {
        axios.post("http://localhost:8000/api/admin/auth/login",{email: email, password: password})
        .then(res => {
            localStorage.setItem('token',res.data.response.token);
            localStorage.setItem('role',res.data.response.role);
           checkSession();
           setOpenAlert(true);
           setAlertSeverity('success');
           setAlertMessage('Successfully signed in !');
        })
        .catch(error => {
            if(error.response.data.error === 'Unauthorized'){
                setAlertSeverity('error');
            }else{
                setAlertSeverity('info');
            }
            setAlertMessage(error.response.data.error);
            setOpenAlert(true);
          });
    }

    const handleRequestResetToken = () => {
        if(email !== null){
            axios.post("http://localhost:8000/api/admin/auth/changepassword",{email: email})
            .then(res => {
                setOpenAlert(true);
                setAlertSeverity('success');
                setAlertMessage('Successfully requested reset token !');
                setFlagChange(1);
            })
        }else{
            setOpenAlert(true);
            setAlertSeverity('error');
            setAlertMessage('Please fill in the email');
        }
    }

    const handleChangePassword = () => {
        axios.post("http://localhost:8000/api/admin/auth/changepassword",{code: resetToken, password: password, email:email})
        .then(res => {
            setEmail(null);
            setPassword(null);
            setResetToken(null);
            setFlagChange(0);
            setOpenChangePassword(false);
            setAlertSeverity('success');
            setAlertMessage('Password successfuly changed !');
        })
        .catch(error => {
            setAlertSeverity('error');
            setAlertMessage(error.response.data.error);
            setOpenAlert(true);
          });
    }

  return (
    <div>
        <Paper elevation={3} style={{width: '30vw', margin: 'auto', height: '50vh', marginTop: '10vw'}}>
            <div style={{paddingTop: '1vw'}}> 
                <Typography style={{ fontSize: '2vw', fontWeight: 700}}>Sign In</Typography>
            </div>
            <div style={{marginTop: '2vw'}}>
                <TextField required id="outlined-basic" label="Email Address" variant="outlined" style={{width: '20vw'}} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div style={{marginTop: '2vw'}}>
                <TextField
                    required
                    id="input-with-icon-textfield"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    style={{width: '20vw'}}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" style={{cursor: 'pointer'}} onClick ={() => setShowPassword(!showPassword)}>
                                {showPassword ?  <VisibilityOff /> : <Visibility/> }
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                />
            </div>

            <div style={{marginTop: '2vw'}}>
                <Button variant="contained" disabled={email === null || email === '' || password === null || password === ''} style={{backgroundColor: '#23d5ab'}} onClick={handleLogin}>Log in</Button>
            </div>
            <div style={{marginTop: '2vw'}}>
                <Typography style={{ fontSize: '.7vw', fontWeight: 700,marginBottom: '.5vw'}}>Forgot password ? <Link style={{cursor: 'pointer'}} onClick={() => setOpenChangePassword(true)}>Click here!</Link></Typography>
                <Typography style={{ fontSize: '.7vw', fontWeight: 700}}>Don't have an account ? <Link style={{cursor: 'pointer'}} onClick={() => setView('sign-up')}>Sign Up</Link></Typography>
            </div>
        </Paper>

        <Dialog
          open={openChangePassword}
          onClose={() => setOpenChangePassword(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                {flagChange === 0 ?
                    <div>
                        <Typography style={{marginBottom: '2vw', textAlign: 'center'}}>Please introduce email in order to send you the reset token</Typography>
                        <TextField required id="outlined-basic" label="Email Address" variant="outlined" style={{width: '20vw', marginLeft:'1.2vw'}} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    :
                    <div>
                        <Typography style={{textAlign: 'center'}}>Please introduce the reset token and a new password</Typography>
                        <TextField required id="outlined-basic" value={resetToken} label="Reset Token" variant="outlined" style={{width: '20vw', marginLeft: '5vw',marginTop: '1vw', marginBottom: '1vw'}} onChange={(e) => setResetToken(e.target.value)}/>
                        <TextField
                            required
                            id="input-with-icon-textfield"
                            label="New Password"
                            type={showPassword ? 'text' : 'password'}
                            style={{width: '20vw', marginLeft: '5vw'}}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" style={{cursor: 'pointer'}} onClick ={() => setShowPassword(!showPassword)}>
                                        {showPassword ?  <VisibilityOff /> : <Visibility/> }
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                    </div>
                }
            </DialogContent>
            <DialogActions>
            {flagChange === 0 ?
                <Button variant="outlined" style={{margin: 'auto'}} onClick={handleRequestResetToken}>Request</Button>
            :
                <div style={{margin: 'auto'}}>
                    <Button variant="outlined" style={{marginRight: '1vw'}} onClick={handleRequestResetToken}>Resend request</Button>
                    <Button variant="contained" onClick={handleChangePassword}>Change Password</Button>
                </div>
            }
            </DialogActions>

      </Dialog>

        <AlertSnackBar open={openAlert} setOpen={setOpenAlert} message={alertMessage} severity={alertSeverity}/>
    </div>
  );
}

export default SignUp;
