import { TextField, Typography } from '@mui/material';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const DialogAction = ({open,setOpen,message,handler}) => {
    return(
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <Typography style={{textAlign: 'center', marginBottom: '1vw'}}>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <div style={{margin: 'auto'}}>
                    <Button variant="outlined" style={{marginRight: '1vw'}} onClick={() => setOpen(false)}>No</Button>
                    <Button variant="contained" style={{backgroundColor: '#308695'}} onClick={handler}>Yes</Button>
                </div>
            </DialogActions>
      </Dialog>
    )
}
export default DialogAction;