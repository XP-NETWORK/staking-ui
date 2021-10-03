import './App.css';
import './Normalize.css'
import { useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Main from "./Pages/Main/Main"
import { initMetaMask } from "../src/utils/metamask"
import { getActualTime } from "./redux/counterSlice"
import { useDispatch } from "react-redux"
import moment from 'moment';




function App() {

const dispatch = useDispatch()
const doDate = () => {
    let str = moment().format('YYYY-MM-DD hh:mm')
    dispatch(getActualTime(str))
}

  useEffect(() => {
    doDate()
    setInterval(doDate, 1000);
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
