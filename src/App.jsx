import Detail from './views/Detail/Detail.jsx'
import Home from './views/home/Home'
import { Route, Routes } from "react-router-dom";
import Landing from './views/landing/Landing.jsx';

import CheckoutSuccess from './componentes/Stripe/CheckoutSuccess.jsx';
import Form from './views/Form/form.jsx';
import Login from './componentes/login/Login.jsx';
import Register from './componentes/register/Register.jsx';




function App() {
  
  // const location = useLocation();
  // const isLandingPage = location.pathname === "/"; 

  return (
      <div className="App">

      <Routes>
        <Route exact path={"/"} element={<Landing />} /> 
        <Route path={"/home"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/form"} element={<Form />} />
        <Route path={'/detail/:id'} element={<Detail/>}/>
        <Route path={'/checkout-success'} element={<CheckoutSuccess/>}/>
      </Routes>
    </div>

  )
}

export default App
