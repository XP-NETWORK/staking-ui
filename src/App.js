
import './App.css';
import './Normalize.css'
import Navbar from './Components/Navbar/Navbar';
import Main from "./Pages/Main/Main"


function App() {
  return (
    <div className="app__wraper">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
