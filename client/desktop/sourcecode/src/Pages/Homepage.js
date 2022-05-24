import React, {useState, useEffect} from 'react';
import AdminPanel from '../Components/AdminPanel/AdminPanel.js';
import './Homepage.css';
import Button from '@mui/material/Button';
import Products from '../Components/AdminPanel/Products.js';
import Orders from '../Components/AdminPanel/Orders.js';
import Sites from '../Components/AdminPanel/Sites.js';
import axios from 'axios';
import { Typography } from '@mui/material';
import Help from '../Components/AdminPanel/Help.js';
import Themes from '../Components/AdminPanel/Themes.js';

const Homepage = ({checkSession}) => {
    const [view,setView] = useState('default');
    const [sites,setSites] = useState([]);

    const getSites = () => {
        axios.get("http://localhost:8000/api/admin/site/",{headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            setSites(res.data.response)
        })
      }
  
      useEffect(() => {
        getSites();
      },[])

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{backgroundColor: '#308695', height: '100vh',width: '15vw', display: 'flex'}}>
                <AdminPanel checkSession={checkSession} setView={setView}/>
            </div>
            <div style={{width: '85vw'}}>
                {view === 'products' ? <Products sites={sites}/>
                : view === 'orders' ? <Orders sites={sites}/> 
                : view === 'sites' ? <Sites />
                : view === 'help' ? <Help />
                : view === 'themes' ? <Themes />
                : 
                    <div style={{margin: 'auto', marginTop: '10vw'}}>
                        <Typography style={{color: 'whitesmoke', fontSize: '5vw'}}>Web System</Typography>
                        <Typography style={{color: 'whitesmoke', fontSize: '2vw'}}>Site management tool</Typography>
                        <Typography style={{color: 'whitesmoke', fontSize: '1.5vw', marginTop: '20vw'}}><b>Create your own sites with different themes</b></Typography>
                    </div>
                }
            </div>
        </div>
    );
}

export default Homepage;