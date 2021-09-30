import './App.css';
import './Normalize.css'
import { useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Main from "./Pages/Main/Main"
import { initMetaMask } from "../src/utils/metamask"

function App() {
  useEffect(() => {
    initMetaMask()
  }, [])
  
  return (
    <div className="app__wraper">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
