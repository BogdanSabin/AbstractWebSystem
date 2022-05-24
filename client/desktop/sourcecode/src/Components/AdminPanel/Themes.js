import React, { useState } from 'react';
import axios from 'axios';




const Themes = () => {
    const [themes,setThemes] = useState([])
    const getThemes = () => {
        axios.get("http://localhost:8000/api/admin/theme/")
        .then(res => {
            setThemes(res.data.response);
        });
    }

    return (
        <div style={{backgroundColor: 'red'}}>
            {}
        </div>
    );
}

export default Themes;