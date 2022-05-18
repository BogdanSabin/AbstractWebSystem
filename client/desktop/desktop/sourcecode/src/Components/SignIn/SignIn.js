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


const SignUp =({setView,checkSession}) => {
    const [showPassword,setShowPassword] = useState(false);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);


    const handleLogin = () => {
        axios.post("http://localhost:8000/api/admin/auth/login",{email: email, password: password})
        .then(res => {
           localStorage.setItem('token',res.data.response.token);
           checkSession();
        })
    }

  return (
    <div>
        <Paper elevation={3} style={{width: '30vw', margin: 'auto', height: '45vh', marginTop: '10vw'}}>
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
                <Typography style={{ fontSize: '.7vw', fontWeight: 700}}>Don't have an account ? <Link style={{cursor: 'pointer'}} onClick={() => setView('sign-up')}>Sign Up</Link></Typography>
            </div>
        </Paper>
    </div>
  );
}

export default SignUp;
