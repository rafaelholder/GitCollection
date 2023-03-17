import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashBoard from '../pages/DashBoard';
import Repo from '../pages/Repo';

type Props = {}

const RoutesApp: React.FunctionComponent = (props: Props) => {
  return (
    
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<DashBoard />}/>
            <Route path='/repositories' element={<Repo />} />
        </Routes>
    </BrowserRouter>
  )
}; 

export default RoutesApp