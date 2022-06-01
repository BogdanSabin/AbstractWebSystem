import { Typography } from '@mui/material';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';

const Help = () => {
    
    return(
        <div>
            <Typography style={{color: 'whitesmoke', fontSize: '1.5vw',marginTop: '10vw'}}>For any issues and questions regarding the platform please contact us by email:</Typography>
            <div style={{display: 'flex', flexDirection:"row", width: '50vw',margin: 'auto', marginTop: '6vw'}}>
                <div style={{display: 'flex',margin: 'auto',marginTop: '1vw'}}>
                    <PersonIcon style={{fontSize: '2vw', margin: 'auto',color: 'whitesmoke', marginRight: '3vw'}}/>
                    <Typography style={{color: 'whitesmoke', fontSize: '1vw',marginTop: '3vw',margin: 'auto'}}> Bogdan Melciu-Sabin : bogdan.melciu@websystem.com</Typography>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection:"row", width: '50vw',margin: 'auto'}}>
                <div style={{display: 'flex',margin: 'auto',marginTop: '1vw'}}>
                    <PersonIcon style={{fontSize: '2vw', margin: 'auto',color: 'whitesmoke', marginRight: '3vw'}}/>
                    <Typography style={{color: 'whitesmoke', fontSize: '1vw',marginTop: '3vw',margin: 'auto'}}> Petrisor Paul-Andrei : petrisor.paul@websystem.com</Typography>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection:"row", width: '50vw',margin: 'auto'}}>
                <div style={{display: 'flex',margin: 'auto',marginTop: '1vw'}}>
                    <PersonIcon style={{fontSize: '2vw', margin: 'auto',color: 'whitesmoke', marginRight: '3vw'}}/>
                    <Typography style={{color: 'whitesmoke', fontSize: '1vw',marginTop: '3vw',margin: 'auto'}}> Mema Mihai-Raul : mema.raul@websystem.com</Typography>
                </div>
            </div>
        </div>
    )

}

export default Help;