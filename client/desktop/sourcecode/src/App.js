import { useEffect, useState } from 'react';
import './App.css';
import Homepage from './Pages/Homepage';
import SignPage from './Pages/Sign-in.js';




function App() {
  
  const [view,setView] = useState(null);


  const checkSession = () => {
    if(localStorage.getItem('token')){
      setView('logged');
    }else{
      setView('signin');
    }
  }
  useEffect(() => {
    checkSession();
  },[]);

  return (
    <div className="App">
      {view === 'logged' ? <Homepage checkSession={checkSession}/>:<SignPage setView={setView} checkSession={checkSession} />}
      
    </div>
  );
}

export default App;
