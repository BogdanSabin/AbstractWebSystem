import { makeStyles } from '@mui/styles';

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
        backgroundColor: "#e47911",
        height: "100vh",
    },

    appBar: {
        backgroundColor: "#f8e6d3",
        width: "100vw",
        height: "7vh",
        position: "relative",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
    },
    
    appTitle: {
        fontSize: "5vw",
        fontWeight: 500,
        textAlign: "center",
        paddingTop: "1vw",
        color:"#000"
    },
    
    logoutDiv: {
        position: "absolute",
        right: "3vw",
        top: ".8vw"
    },
    
    logout: {
        backgroundColor: "black",
        color:"#ffffff",
        width: "7vw",
        backgroundColor: '#000'
    },
    
    cart: {
        position: "absolute",
        right: "13vw",
        top: ".8vw"
    },
    
    descriptionBackground: {
        width: "40vw",
        height: "3vw",
        margin: "auto",
        marginTop: "1vw",
        display: "flex"
    },
    
    descriptionText:{
        margin: "auto",
        width: "100%"
    },
    
    orderProducts: {
        height: "20vw",
        width: "90vw",
        margin: "auto",
        marginTop: "5vw",
        whiteSpace: "nowrap",
        position: "relative",
        overflowY: "hidden",
        webkitOverflowScrolling: "touch"
    },
    
    cardProduct: {
        marginRight: "5vw",
        backgroundColor: "#eee",
        float: "none",
        margin: "0 1%",
        display: "inline-block",
        zoom: "1",
        cursor: "pointer",
        whiteSpace: 'initial',
    }
    
}));