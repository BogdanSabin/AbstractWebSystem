import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const Loading = ({text}) => {
    return (
        <div>
            <CircularProgress size={'5vw'} style={{color: 'white', marginTop: '10vw',marginBottom: '1vw',}}/>
            <Typography style={{fontSize: '3vw', marginLeft: '1.5vw', color: '#fff'}}>Loading {text} ...</Typography>
        </div>
    );
}
export default Loading;