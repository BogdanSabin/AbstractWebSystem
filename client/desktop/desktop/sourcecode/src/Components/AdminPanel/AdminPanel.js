import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import BallotIcon from '@mui/icons-material/Ballot';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import { Divider } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
const AdminPanel = ({checkSession,setView}) => {

    const [openCatalog, setOpenCatalog] = React.useState(true);

  return (
    <div>
      <List
        sx={{ width: '148%', maxWidth: 360, bgcolor: '#308695' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" style={{backgroundColor: '#308695', fontSize: '1.2vw', fontWeight: 700,color: 'whitesmoke'}}>
            Admin Panel
          </ListSubheader>
        }
      >
        <Divider style={{width: '10vw', margin: 'auto'}}/>
        
        <ListItemButton onClick={() => setOpenCatalog(!openCatalog)} style={{color: 'whitesmoke'}}>
          <ListItemIcon>
            <BallotIcon style={{color: 'whitesmoke'}}/>
          </ListItemIcon>
          <ListItemText primary="Catalog" />
          {openCatalog ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>

        <Collapse in={openCatalog} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} style={{color: 'whitesmoke'}}>
              <ListItemIcon><InventoryIcon style={{color: 'whitesmoke'}}/></ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} style={{color: 'whitesmoke'}}>
              <ListItemIcon><StarBorder style={{color: 'whitesmoke'}}/></ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} style={{color: 'whitesmoke'}}>
              <ListItemIcon ><CategoryIcon style={{color: 'whitesmoke'}}/></ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton style={{color: 'whitesmoke'}}>
          <ListItemIcon>
            <FactCheckIcon style={{color: 'whitesmoke'}}/>
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>

        <ListItemButton style={{color: 'whitesmoke'}}>
          <ListItemIcon>
            <PeopleIcon style={{color: 'whitesmoke'}}/>
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItemButton>

        <ListItemButton style={{color: 'whitesmoke'}}>
          <ListItemIcon>
            <DarkModeIcon style={{color: 'whitesmoke'}}/>
          </ListItemIcon>
          <ListItemText primary="Themes" />
        </ListItemButton>
      </List>

      <Button variant="contained" style={{left: '2.5vw',position: 'absolute',bottom: '1vw', backgroundColor: '#111111', width: '10vw'}} onClick={() => {localStorage.removeItem('token'); checkSession()}}>Log Out</Button>
    </div>
      )
}

export default AdminPanel;