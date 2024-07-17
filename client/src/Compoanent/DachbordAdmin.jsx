import React, { useEffect, useState } from 'react';
import { getDoctorsRoute, getPatientsRoute } from '../Routes/routes';
import axios from 'axios';
import { IoMdSearch } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function DashboardAdmin() {
  const [isDoctors, setIsDoctors] = useState(true);
  const [isPatients, setIsPatients] = useState(false);
  const [isDepartments, setIsDepartments] = useState(false);
  const [isLabos, setIsLabos] = useState(false);
  const [docs, setDocs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [laboratories, setLaboratories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let res;
        if (isPatients) {
          res = await axios.get(getPatientsRoute);
          if (res.data.Patients) {
            setDocs(res.data.Patients);
          }
        } else if (isDoctors) {
          res = await axios.get(getDoctorsRoute);
          if (res.data.Doctors) {
            setDocs(res.data.Doctors);
          }}
          /*
         else if (isDepartments) {
          res = await axios.get(getDepartmentsRoute);
          if (res.data.Departments) {
            setDepartments(res.data.Departments);
          }
        } else if (isLabos) {
          res = await axios.get(getLaboratoriesRoute);
          if (res.data.Laboratories) {
            setLaboratories(res.data.Laboratories);
          }
        }*/

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [isPatients, isDoctors, isDepartments, isLabos]);

  return (
    <div className="p-5 bg-gray-200">
      <div className="flex p-5 bg-gray-200 space-x-4">
        <div className="p-4 w-[250px] rounded-xl shadow-md bg-sky-700">
          <h1 className="text-xl font-bold italic text-sky-50 text-center py-2">Dashboard Admin</h1>
          <div className="space-y-1 flex flex-col h-full text-white">
            <a
              className="p-2 shadow hover:bg-sky-400 rounded active:bg-sky-200"
              onClick={() => {
                setIsDoctors(true);
                setIsPatients(false);
                setIsDepartments(false);
                setIsLabos(false);
              }}
            >
              Les medecins
            </a>
            <a
              className="p-2 shadow hover:bg-sky-400 rounded"
              onClick={() => {
                setIsPatients(true);
                setIsDoctors(false);
                setIsDepartments(false);
                setIsLabos(false);
              }}
            >
              Les Patients
            </a>
            <a
              href="#departments"
              className="p-2 shadow hover:bg-sky-400 rounded"
              onClick={() => {
                setIsDepartments(true);
                setIsDoctors(false);
                setIsPatients(false);
                setIsLabos(false);
              }}
            >
              Departments
            </a>
            <a
              href="#"
              className="p-2 shadow hover:bg-sky-400 rounded"
              onClick={() => {
                setIsLabos(true);
                setIsDoctors(false);
                setIsDepartments(false);
                setIsPatients(false);
              }}
            >
              Les laboratoires
            </a>
          </div>
        </div>

        {(isDoctors || isPatients) && (
          <div className="w-full bg-white rounded-xl h-[700px]">
            <div className="flex justify-end p-2 bg-sky-700 rounded-t-xl">
              <div className="flex bg-white hover:bg-gray-200 border items-center rounded-3xl p-2">
                <IoMdSearch size={25} className="text-sky-800" />
                <input
                  type="text"
                  placeholder="Search for User By CIN"
                  className="rounded outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 grid-rows-5">
              <div className="flex justify-between font-bold text-gray-700 bg-gray-100 p-2 rounded-t-xl">
                <h1 className="w-full">Nom et Prenom</h1>
                <h1 className="w-full">{!isPatients ? "Medical License Number" : "CIN"}</h1>
                <h1 className="w-full">{!isPatients ? "Departement" : "Date Naissance"}</h1>
                <h1 className="w-full">{!isPatients ? "Specialite" : "Email"}</h1>
                <h1 className="w-full">Action</h1>
              </div>

              {docs &&
                docs.map((item, i) => (
                  <div key={i} className="flex justify-between shadow p-2">
                    <h1 className="w-full">{item.fullName}</h1>
                    <h1 className="w-full">{isPatients ? item.nationalId : "M25648"}</h1>
                    <h1 className="w-full">{isPatients ? "10/12/2014" : item.Departement?.name}</h1>
                    <h1 className="w-full">{isPatients ? item.email : item.Service}</h1>
                    <div className="w-full">
                      <button className="rounded-xl bg-gray-300 px-2 p-1 hover:bg-slate-400">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {isDepartments && (
          <div className="w-full bg-white rounded-xl h-[700px]">
            <div className="flex justify-end p-2 bg-sky-700 rounded-t-xl">
              <div className="flex bg-white hover:bg-gray-200 border items-center rounded-3xl p-2">
                <IoMdSearch size={25} className="text-sky-800" />
                <input
                  type="text"
                  placeholder="Search for Department"
                  className="rounded outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 grid-rows-5">
              <div className="flex justify-between font-bold text-gray-700 bg-gray-100 p-2 rounded-t-xl">
                <h1 className="w-full">Department Name</h1>
                <h1 className="w-full">le nombre des Specialite</h1>
                <h1 className="w-full">le nombres des Medecin</h1>
              </div>

              
              

                  <div className="flex justify-between shadow p-2">
                    <h1 className="w-full">Pulmonology</h1>
                    <h1 className="w-full">4</h1>
                    <h1 className="w-full">7</h1>
                  </div>
                  
                   <div className="flex justify-between shadow p-2">
                    <h1 className="w-full">Pédiatrie</h1>
                    <h1 className="w-full">5</h1>
                    <h1 className="w-full">11</h1>
                  </div>

                  <div className="flex justify-between shadow p-2">
                    <h1 className="w-full">Gastroentérologie</h1>
                    <h1 className="w-full">3</h1>
                    <h1 className="w-full">8</h1>
                  </div>



            </div>
          </div>
        )}

        {isLabos && (
          <div className="w-full bg-white rounded-xl h-[700px]">
            <div className="flex justify-end p-2 bg-sky-700 rounded-t-xl">
              <div className="flex bg-white hover:bg-gray-200 border items-center rounded-3xl p-2">
                <IoMdSearch size={25} className="text-sky-800" />
                <input
                  type="text"
                  placeholder="Search for Laboratory"
                  className="rounded outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 grid-rows-5">
              <div className="flex justify-between font-bold text-gray-700 bg-gray-100 p-2 rounded-t-xl">
                <h1 className="w-full">Le nom de laboratoire</h1>
                <h1 className="w-full">Nombre de specialisations </h1>
                <h1 className="w-full">Nombres de specialistes</h1>
              </div>

           
                  <div  className="flex justify-between shadow p-2">
                    <h1 className="w-full">Ahmed Raddi labo </h1>
                    <h1 className="w-full">12</h1>
                    <h1 className="w-full">31</h1>
                  </div>

                  <div  className="flex justify-between shadow p-2">
                    <h1 className="w-full">Agadir labo</h1>
                    <h1 className="w-full">9</h1>
                    <h1 className="w-full">27</h1>
                  </div>

                  <div  className="flex justify-between shadow p-2">
                    <h1 className="w-full">Agadir labo</h1>
                    <h1 className="w-full">15</h1>
                    <h1 className="w-full">41</h1>
                  </div>
               
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardAdmin;
