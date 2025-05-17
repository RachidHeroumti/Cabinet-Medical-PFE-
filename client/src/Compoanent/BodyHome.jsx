import React from 'react';

export default function BodyHome() {
  return (
    <section className="bg-sky-50 px-6 py-10 space-y-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <h2 className="text-2xl font-bold text-sky-950">Doctori c'est ...</h2>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-sky-600">+10 millions</p>
          <p className="text-gray-700">de patients</p>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-sky-600">+1 million</p>
          <p className="text-gray-700">de spécialistes</p>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-sky-600">97.99%</p>
          <p className="text-gray-700">d’avis positifs</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-white p-6 md:p-10 rounded-xl shadow-md">
        <img
          src="https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="pic"
          className="w-52 h-52 md:w-64 md:h-64 object-cover rounded-full border-4 border-sky-600 shadow-sm"
        />
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-sky-800">Votre santé. Vos données.</h3>
          <p className="text-gray-700">
            La confidentialité de vos informations personnelles est une priorité absolue pour Doctolib et guide notre action au quotidien.
          </p>
          <button className="bg-sky-700 hover:bg-sky-800 transition-colors text-white font-semibold px-5 py-2 rounded-lg shadow">
            Découvrir nos engagements
          </button>
        </div>
      </div>
    </section>
  );
}
