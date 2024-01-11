import Detail from './componentes/Detail/Detail'
import Home from './componentes/home/Home'

import { Routes, Route } from 'react-router-dom'



function App() {


  return (
    <>
    <Routes>
      <Route path='/detail' element={<Detail/>}/>
    </Routes>
    </>
  )
}

export default App
