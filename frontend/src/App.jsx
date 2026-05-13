import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Userregister from '../Routes/Userregister'
import Userlogin from '../Routes/Userlogin'
import FoodPartnerlogin from '../Routes/FoodPartnerlogin'
import Foodpartnerregister from '../Routes/Foodpartnerregister'

import Homepage from '../Pages/Homepage'
import Createfood from '../Routes/Createfood'
import Visitstore from '../Pages/Visitstore'
import Savedpage from '../Pages/Savedpage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Userlogin />} />
        <Route path='/user/register' element={<Userregister />} />
         <Route path='/user/login' element={<Userlogin />} />
          <Route path='/foodpartner/login' element={<FoodPartnerlogin />} />
           <Route path='/foodpartner/register' element={<Foodpartnerregister/>} />
           <Route path='/homepage' element={<Homepage />}/>
           <Route path='/createfood' element={<Createfood/>}/>
           <Route path='/savepage' element={<Savedpage/>}/>
           <Route path='/food-partner/:id' element={<Visitstore/>}/>
      </Routes>
    </div>
  )
}

export default App
