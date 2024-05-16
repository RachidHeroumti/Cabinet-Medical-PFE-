import React from 'react'

export default function BodyHome() {



  return (
    <div className=' space-y-4 p-5'>
      <div className=' p-5 flex items-center justify-center space-x-32'>
        <h1 className='text-sky-950 font-bold text-xl'>Doctori C'est ...</h1>
        <div>
            <h1 className='text-3xl font-bold text-sky-600'>+10 million </h1>
            <h1 className='text-center text-gray-700'>des patients</h1>
        </div>
        <div>
            <h1 className='text-3xl font-bold text-sky-600'>+1 million </h1>
            <h1 className='text-center text-gray-700'>des specialiste</h1>
        </div>

        <div>
            <h1 className='text-3xl font-bold text-sky-600'>90% </h1>
            <h1 className='text-center text-gray-700'>d'avis positifs</h1>
        </div>
      </div>
      <div className='flex p-5  bg-gray-200'>
        <img src='https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=600' alt='pic'
        className=' w-[250px] h-[250px] rounded-full  bg-sky-600 '
        />
        <div className='p-5 space-y-3 w-[400px] '>
          <h1 className=' text-xl font-bold text-sky-800 '>Votre santé. Vos données.</h1>
          <p className=' text-gray-700'>
          La confidentialité de vos informations personnelles est une priorité absolue pour Doctolib et guide notre action au quotidien.
          </p>
          <button className=' bg-sky-700 rounded-lg font-bold text-white p-1 '>Decouvrir nos Engagements</button>
        </div>
      </div>

    </div>
  )
}
