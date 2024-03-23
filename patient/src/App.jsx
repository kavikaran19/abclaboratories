import { useState } from 'react';
import Layout from './layout/Layout'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Patient from './pages/Patient';
import Patientregistation from './pages/Patientregistation';
import AppointmentForm from './pages/AppointmentForm';
import Payment from './pages/Payment';
import Test from './pages/Test';



const App = () =>{
  const createRoutes = () =>{
    return createRoutesFromElements(
      <>
      <Route
      path='/'
      element={<Layout/>}
      >
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/patient' element={<Patient/>}/>
        <Route path='/patientregistation' element={<Patientregistation/>}/>
        <Route path='/appointmentform' element={<AppointmentForm/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/test' element={<Test/>}/>


        
      </Route>

      </>
    )
  }
  const router = createBrowserRouter(createRoutes());
  return <RouterProvider router={router} />
}
export default App;
