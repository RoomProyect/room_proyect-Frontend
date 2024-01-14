import './App.css'
import Home from './views/home/Home'
import { Route, Routes } from "react-router-dom";
import Landing from './views/landing/Landing.jsx'
import Detail from './views/detail/Detail.jsx';


function App() {
  
  // const location = useLocation();
  // const isLandingPage = location.pathname === "/"; 

  return (
      <div className="App">

      <Routes>
        <Route exact path={"/"} element={<Landing />} /> 
        <Route path={"/home"} element={<Home />} />
        <Route path={"/detail/id:"} element={<Detail />} />
      </Routes>
    </div>

  )
}

export default App
