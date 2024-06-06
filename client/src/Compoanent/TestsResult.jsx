import React from 'react'
import { Cabstate } from '../Context/cabinatProvider'

export default function TestsResult({setIResult}) {
  const {user} =Cabstate();

  return (
    <div className=' w-full flex justify-center p-2 h-screen scroll scroll-m-0'>
        <div className=' bg-white shadow-md rounded-lg   w-1/2'>
           
        <div class="max-w-4xl mx-auto p-2">
            <div className=' flex justify-between p-3'>
            <h1 class="text-2xl font-bold mb-2 text-center w-full">Laboratoire d'Analyses Médicales</h1>
            <button className=' text-xl font-bold  text-end px-4 pt-3 text-red-600' onClick={()=>{setIResult(false)}}>X</button>
            </div>
        
        
        <div class="mb-6">
            <h2 class="text-xl font-semibold">Patient Information:</h2>
            <p class="mt-2"><span class="font-semibold">Name:</span>{user.fullName}</p>
            <p><span class="font-semibold">Date of Birth:</span> 01/15/1974</p>
        </div>
        
        <div class="mb-6">
            <h2 class="text-xl font-semibold">Laboratory Report</h2>
            <p class="mt-2"><span class="font-semibold">Test Date:</span> 05/20/2024</p>
            <p><span class="font-semibold">Report Date:</span> 05/21/2024</p>
        </div>
        
        <div class="mb-6 overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">Test Name</th>
                        <th class="py-2 px-4 border-b">Result</th>
                        <th class="py-2 px-4 border-b">Units</th>
                        <th class="py-2 px-4 border-b">Reference Range</th>
                        <th class="py-2 px-4 border-b">Flag</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center">
                        <td class="py-2 px-4 border-b">Fasting Blood Sugar (FBS)</td>
                        <td class="py-2 px-4 border-b">130</td>
                        <td class="py-2 px-4 border-b">mg/dL</td>
                        <td class="py-2 px-4 border-b">70-99</td>
                        <td class="py-2 px-4 border-b text-red-500 font-bold">H</td>
                    </tr>
                    <tr class="text-center">
                        <td class="py-2 px-4 border-b">Hemoglobin A1c (HbA1c)</td>
                        <td class="py-2 px-4 border-b">6.6</td>
                        <td class="py-2 px-4 border-b">%</td>
                        <td class="py-2 px-4 border-b">4.0-5.6</td>
                        <td class="py-2 px-4 border-b text-red-500 font-bold">H</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="mb-6">
            <h2 class="text-xl font-semibold">Comments:</h2>
            <p class="mt-2">
                The fasting blood sugar level of 130 mg/dL is above the normal range and is flagged as high (H).<br></br>
                The HbA1c level of 6.6% is also above the normal range and indicates a chronic elevated blood glucose level.<br></br>
                These results are consistent with a diagnosis of type 2 diabetes mellitus. It is recommended to follow up with your healthcare provider for management and treatment options.
            </p>
        </div>
        
        <div class="mb-6">
            <h2 class="text-xl font-semibold">Physician/Clinician:</h2>
            <p class="mt-2">Dr. Ahmed jamli, MD</p>
        </div>
        
        <div class="mb-6">
            <h2 class="text-xl font-semibold">Lab Technician:</h2>
            <p class="mt-2">Souad Raddi, MLS(ASCP)</p>
        </div>
        
        <div class="mt-6">
            <h2 class="text-xl font-semibold">Contact Information:</h2>
            <p class="mt-2">Agadir El hay mohammedi </p>
            <p>+212655487920</p>
        </div>
    
    
    
    </div>
            

        </div>
     
      
    </div>
   
  )
}
