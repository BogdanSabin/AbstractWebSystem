import React, {useState,useEffect} from 'react';
import './App.css';
import ApplicationOne from './Pages/ApplicationOne';
import SignPage from './Pages/SignIn';

function App() {
  var siteId = /[^/]*$/.exec(window.location.pathname)[0];
  const [view,setView] = useState(null);

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
    }
  }


  useEffect(() => {
    checkSession();
  },[siteId]);

  return (
    <div className="App">
        {view !== 'logged' ? <SignPage setView={setView} checkSession={checkSession} siteId={siteId} /> : <ApplicationOne checkSession={checkSession} selectedSite={siteId}/>}
    </div>
  );
}

export default App;
