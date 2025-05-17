import { useEffect, useState } from "react";
import {
  FaBookMedical,
  FaSuitcaseMedical,
  FaUserDoctor,
} from "react-icons/fa6";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { AllServices } from "../data/data";

const iconMap = [
  FaUserDoctor,
  FaBookMedical,
  LiaNotesMedicalSolid,
  FaSuitcaseMedical,
  FaUserDoctor, 
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setServices(showAll ? AllServices : AllServices.slice(0, 4));
  }, [showAll]);

  const toggleShowAll = () => setShowAll((prev) => !prev);

  return (
    <section id="services" className="bg-sky-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-sky-800 mb-10">
        Our Services
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
        {services.map((item, i) => {
          const Icon = iconMap[i % iconMap.length]; 
          return (
            <div
              key={i}
              className="flex flex-col items-center bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-200"
            >
              <Icon size={48} className="text-sky-600 mb-4" />
              <h3 className="text-center font-semibold text-lg text-sky-900">
                {item}
              </h3>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={toggleShowAll}
          className="px-6 py-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition font-medium"
        >
          {showAll ? "View Less" : "View More Services"}
        </button>
      </div>
    </section>
  );
};

export default Services;
