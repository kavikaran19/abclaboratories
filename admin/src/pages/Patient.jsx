import React from 'react'
import PatientTable from '../components/PatientTable'

const Patient = () => {
  return (
    
    <>
    <div>
    <h2 className="text-xl font-semibold text-red-600 mb-4">Patient Details</h2>
    </div>
    <PatientTable/>
    </>
  )
}

export default Patient