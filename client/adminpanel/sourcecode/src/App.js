import { useEffect, useState } from 'react';
import './App.css';
import Homepage from './Pages/Homepage';
import SignPage from './Pages/Sign-in.js';




function App() {
  
  const [view,setView] = useState(null);
  const [selectedSite,setSelectedSite] = useState(null);

  const checkSession = () => {
    var hours = 12; // to clear the localStorage after 1 hour
                  // (if someone want to clear after 8hrs simply change hours=8)
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
    } else {
        if(now-setupTime > hours*60*60*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
        }
    }
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
      : <SignPage setView={setView} checkSession={checkSession}/>}
    </div>
  );
}

export default App;
