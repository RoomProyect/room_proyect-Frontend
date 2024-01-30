import Detail from './views/Detail/Detail.jsx'
import Home from './views/home/Home'
import { Route, Routes } from "react-router-dom";
import Landing from './views/landing/Landing.jsx';
import Login from './views/login/Login.jsx';
import Register from './views/register/Register.jsx';
import Form from './views/Form/Form.jsx';
import CheckoutSuccess from './componentes/Stripe/CheckoutSuccess.jsx';
import AdminUsers from "../src/views/SuperAdmin/AdminUsers/AdminUsers.jsx"
import AdminPosts from "../src/views/SuperAdmin/AdminPosts/AdminPosts.jsx"
import Perfil from './views/perfil/Perfil.jsx';
import AdminPostForID from './views/SuperAdmin/AdminPostForID/AdminPostForID.jsx';



function App() {


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
        <Route path={"/perfil"} element={ <Perfil /> } />
        <Route path={"/AdminUsers"} element={ <AdminUsers /> } />
        <Route path={"/AdminPosts"} element={ <AdminPosts /> } />
        <Route path={"/publicaciones/:id"} element={ <AdminPostForID /> } />
      </Routes>
    </div>

  )
}

export default App
