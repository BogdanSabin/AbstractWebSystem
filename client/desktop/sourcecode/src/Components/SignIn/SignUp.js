import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import axios from 'axios';
import AlertSnackBar from '../SnackBarAlert'

const SignUp = ({setView,setResponse,setOpen}) => {
    const [showPassword,setShowPassword] = useState(false);
    const [showPassword2,setShowPassword2] = useState(false);

    const [firstName,setFirstName] = useState(null);
    const [lastName,setLastName] = useState(null);
    const [phone,setPhone] = useState(null);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);

    const [openAlert,setOpenAlert] = useState(false);
    const [alertMessage,setAlertMessage] = useState(null);
    const [alertSeverity,setAlertSeverity] = useState(null);

    const handleRegister = () => {
        if(password === confirmPassword){
            axios.post("http://localhost:8000/api/admin/auth/register?1",{firstName: firstName, lastName: lastName, email: email, phone: phone, password: password})
            .then(res => {
                setResponse(res.data.response);
                setFirstName(null);
                setLastName(null);
                setEmail(null);
                setPassword(null);
                setConfirmPassword(null);
                setOpen(true);
            })
            .catch(error => {
                setAlertSeverity('info');
                setAlertMessage(error.response.data.error);
                setOpenAlert(true);
              });
        }else{
            setAlertSeverity('warning');
            setAlertMessage("Passwords does not match !");
            setOpenAlert(true);  
        }
    }


  return (
    <div>
        <Paper elevation={3} style={{width: '30vw', margin: 'auto', height: '85vh', marginTop: '4vw'}}>
            <div style={{paddingTop: '1vw'}}> 
                <Typography style={{ fontSize: '2vw', fontWeight: 700}}>Sign Up</Typography>
            </div>
            <div style={{marginTop: '2vw'}}>
                <TextField required id="outlined-basic" label="First Name" variant="outlined" style={{width: '20vw'}} onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div style={{marginTop: '2vw'}}>
                <TextField required id="outlined-basic" label="Last Name" variant="outlined" style={{width: '20vw'}} onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div style={{marginTop: '2vw'}}>
                <TextField required id="outlined-basic" label="Phone" variant="outlined" style={{width: '20vw'}} onChange={(e) => setPhone(e.target.value)}/>
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
                <TextField
                    required
                    id="input-with-icon-textfield"
                    label="Confirm Password"
                    type={showPassword2 ? 'text' : 'password'}
                    style={{width: '20vw'}}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" style={{cursor: 'pointer'}} onClick ={() => setShowPassword2(!showPassword2)}>
                                {showPassword ?  <VisibilityOff /> : <Visibility/> }
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                />
            </div>

            <div style={{marginTop: '2vw'}}>
                <Button 
                    variant="contained" 
                    style={{backgroundColor: '#23d5ab'}} 
                    onClick={handleRegister}
                    disabled={firstName === null || lastName === null || phone === null || password === null || email === null || confirmPassword === null ||
                        firstName === '' || lastName === '' || phone === '' || password === '' || email === '' || confirmPassword === ''}    
                >CREATE</Button>
            </div>
            <div style={{marginTop: '2vw'}}>
                <Typography style={{ fontSize: '.7vw', fontWeight: 700}}>Already have an account ? <Link style={{cursor: 'pointer'}} onClick={() => setView('sign-in')}>Sign In</Link></Typography>
            </div>
        </Paper>
        <AlertSnackBar open={openAlert} setOpen={setOpenAlert} message={alertMessage} severity={alertSeverity}/>
    </div>
  );
}

export default SignUp;
