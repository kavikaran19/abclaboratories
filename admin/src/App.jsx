import { useState } from 'react';
import Layout from './layout/Layout'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements



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
        <Route path='/doctor' element={<Doctor/>}/>
        <Route path='/adddoctor' element={<AddDoctor/>}/>
        <Route path='/addtechnician' element={<AddTechnician/>}/>
        <Route path='/patientregistation' element={<Patientregistation/>}/>
        <Route path='/appointmentform' element={<AppointmentForm/>}/>
        <Route path='/appointmentdetails' element={<AppoinmentDetails/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/technician' element={<Technician/>}/>
        <Route path='/testform' element={<TestForm/>}/>
        <Route path='/test' element={<Test/>}/>


        
      </Route>

      </>
    )
  }
  const router = createBrowserRouter(createRoutes());
  return <RouterProvider router={router} />
}
export default App;
