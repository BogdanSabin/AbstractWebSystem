import { useEffect, useState } from 'react';
import './App.css';
import ApplicationOne from './Pages/ApplicationInterface1/ApplicationOne';
import Homepage from './Pages/Homepage';
import SignPage from './Pages/Sign-in.js';




function App() {
  
  const [view,setView] = useState(null);
  const [selectedSite,setSelectedSite] = useState(null);

  const checkSession = () => {
    if(localStorage.getItem('token')){
      setView('logged');
    }else{
      setView('signin');
    }
  }

  useEffect(() => {
    if(selectedSite !== null){
      setView('user');
    }
  },[selectedSite]);
  useEffect(() => {
    checkSession();
  },[]);

  return (
    <div className="App">
      {view === 'logged' ? <Homepage checkSession={checkSession} setSelectedSite={setSelectedSite}/>
      : view === 'user' ? <ApplicationOne checkSession={checkSession} selectedSite={selectedSite}/>
      : <SignPage setView={setView} checkSession={checkSession}/>}
    </div>
  );
}

export default App;
