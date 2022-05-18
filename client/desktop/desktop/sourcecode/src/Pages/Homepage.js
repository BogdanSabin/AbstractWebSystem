import React, {useState} from 'react';
import AdminPanel from '../Components/AdminPanel/AdminPanel.js';
import './Homepage.css';
import Button from '@mui/material/Button';

const Homepage = ({checkSession}) => {
    const [view,setView] = useState('default');
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{backgroundColor: '#308695', height: '100vh',width: '15vw', display: 'flex'}}>
                <AdminPanel checkSession={checkSession}/>
            </div>
            <div style={{width: '85vw',backgroundColor: 'red'}}>
                
            </div>
        </div>
    );
}

export default Homepage;