import { makeStyles } from '@mui/styles';
import { padding } from '@mui/system';

export default makeStyles((theme) => ({

    // code {
    '@global': {
        fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New',monospace",
        '*::-webkit-scrollbar': {
            width: '10px',
            cursor: 'pointer'
        },
        '*::-webkit-scrollbar-track': {
            background: "#f1f1f1"
        },
        '*::-webkit-scrollbar-thumb': {
            background: "#6c5ab3"
        },
        '*::-webkit-scrollbar-thumb:hover': {
            background: "#6c5ab3"
          }
    },
      
    
    appBackground: {
        backgroundColor: "#9fd3c7",
        height: "100vh",

    },

    container: {
        display: 'flex', 
        flexDirection: 'row'
    },

    appBar: {
        backgroundColor: "#385170",
        width: "35vw",
        height: "100vh",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
        
    },
    
    appTitle: {
        fontSize: "10vw",
        fontWeight: 700,
        textAlign: "center",
        paddingTop: "2vw",
        color:"#ffffff"
    },
    
    logoutDiv: {
        position: "absolute",
        bottom: '1vw',
        left: '6vw',
    },
    
    logout: {
        backgroundColor: "#9fd3c7",
        color:"#000",
        foontWeight: 700,
        width: "12vw",
    },
    
    cart: {
        position: "absolute",
        right: "2vw",
        top: "1vw",
        color: '#fff'
    },
    
    descriptionBackground: {
        position: 'absolute',
        top: '7vw',
        left: '1.5vw',
        height: "35vw",
        margin: "auto",
        backgroundColor: 'inherit',
        width: "21vw",
    },
    
    descriptionText:{
        margin: "auto",
        width: "90%",
        marginTop: '1vw',
        color: '#fff'
    },
    
    orderProducts: {
        display: "flex",
        flexWrap: "wrap",
        width: '75vw',
        margin: 'auto',
        marginTop: '5vw'
    },
    
    cardProduct: {
        flex: "40%",
        margin: "2vw",
        padding: "10px"
    }
    
}));