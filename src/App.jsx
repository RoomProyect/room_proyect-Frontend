import Detail from './views/Detail/Detail.jsx'
import Home from './views/home/Home'
import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Landing from './views/landing/Landing.jsx'
import Detail from './views/detail/Detail.jsx';
=======
import Landing from './views/landing/Landing.jsx';
import Form from './views/Form/form.jsx';

>>>>>>> 89dc96bb0415f8fe323217a2e6fe39976a783c0c


function App() {
  
  // const location = useLocation();
  // const isLandingPage = location.pathname === "/"; 

  return (
      <div className="App">

      <Routes>
        <Route exact path={"/"} element={<Landing />} /> 
        <Route path={"/home"} element={<Home />} />
<<<<<<< HEAD
        <Route path={"/detail/id:"} element={<Detail />} />
=======
        <Route path={"/form"} element={<Form />} />
        <Route path={'/detail/:id'} element={<Detail/>}/>
>>>>>>> 89dc96bb0415f8fe323217a2e6fe39976a783c0c
      </Routes>
    </div>

  )
}

export default App
