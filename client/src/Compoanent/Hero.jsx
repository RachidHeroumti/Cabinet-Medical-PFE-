import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import Messages from "../componentChat/Messages";
import { getDoctorsRoute } from "../Routes/routes";
import { Cabstate } from "../Context/cabinatProvider";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  const { doctorSelected, setDoctorSelected } = Cabstate() || {};
  const [searchText, setSearchText] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [searchBy, setSearchBy] = useState("Name");
  const [isMsgOpen, setIsMsgOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(getDoctorsRoute);
        setDoctors(Array.isArray(data.Doctors) ? data.Doctors : []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchText("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDoctors = useMemo(() => {
    if (!searchText || !doctors.length) return [];

    const searchLower = searchText.toLowerCase();
    const fieldMap = {
      Name: "fullName",
      Department: "Departement.name",
      Speciality: "Service",
    };

    const field = fieldMap[searchBy];

    return doctors.filter((doctor) => {
      const value = field.includes(".")
        ? field.split(".").reduce((obj, key) => (obj && obj[key]) || "", doctor)
        : doctor[field] || "";
      return value.toLowerCase().startsWith(searchLower);
    });
  }, [searchText, searchBy, doctors]);

  const handleDoctorClick = (doctor) => {
    if (setDoctorSelected) {
      setDoctorSelected(doctor);
      navigate("/dashbord/doctor");
    }
  };

  const toggleMessages = () => setIsMsgOpen((prev) => !prev);

  const cities = ["Agadir", "Rabat", "Casablanca", "Tanger", "Marrakech", "Asafi", "Fes"];

  return (
    <div className="relative">
      <section
        id="home"
        className="relative flex flex-col justify-center pt-14 pb-6 min-h-[400px] bg-gradient-to-r from-sky-600 to-sky-600 text-white overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-sky-600/60"></div>
        <motion.div
          className="relative z-10 flex flex-col items-center w-full px-3 sm:px-5 md:px-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-white drop-shadow-lg">
            Cabinet Medical
          </h1>
          <p className="text-center max-w-[90%] sm:max-w-md md:max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-sky-100">
            Discover expert care tailored to your needs. Connect with top doctors and manage your health with ease.
          </p>

          <motion.div
            ref={searchRef}
            className="flex flex-col sm:flex-row items-center w-full max-w-[95%] sm:max-w-lg md:max-w-3xl bg-white rounded-lg p-1.5 shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center w-full sm:flex-1 border-b sm:border-b-0 sm:border-r border-gray-300 py-1.5 sm:py-0">
              <IoMdSearch size={22} className="text-gray-600 mx-2" />
              <input
                className="w-full p-1.5 text-gray-700 bg-transparent outline-none placeholder-gray-400 text-sm sm:text-base"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={`Search by ${searchBy}`}
              />
            </div>
            <div className="flex w-full sm:w-auto pt-1.5 sm:pt-0">
              <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                className="w-1/2 sm:w-auto p-1.5 mx-1 text-gray-700 bg-transparent border-r border-gray-300 outline-none text-sm"
              >
                <option>Name</option>
                <option>Department</option>
                <option>Speciality</option>
              </select>
              <select className="w-1/2 sm:w-auto p-1.5 mx-1 text-gray-700 bg-transparent outline-none text-sm">
                <option>Select City</option>
                {cities.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {searchText && filteredDoctors.length > 0 && (
            <motion.div
              className="relative w-full flex justify-center mt-3 px-3 sm:px-5 md:px-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-full max-w-[95%] sm:max-w-lg md:max-w-3xl">
                <div className="bg-white rounded-lg p-3 shadow-xl max-h-[220px] sm:max-h-[280px] overflow-y-auto">
                  {filteredDoctors.map((doctor, index) => (
                    <motion.div
                      key={index}
                      onClick={() => handleDoctorClick(doctor)}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-sky-50 cursor-pointer transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img
                        src={
                          doctor.image ||
                          "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600"
                        }
                        alt="doctor"
                        className="rounded-full w-9 h-9 sm:w-11 sm:h-11 object-cover border-2 border-sky-200"
                      />
                      <div>
                        <h1 className="text-sm sm:text-base font-semibold text-gray-800">
                          Dr. {doctor.fullName || "Unknown"}
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {doctor.address || "No address available"}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {isMsgOpen && (
          <motion.div
            className="fixed top-14 right-1.5 sm:right-3 w-[90%] max-w-[280px] sm:max-w-[320px] h-[55%] sm:h-[65%] z-50 bg-white rounded-lg shadow-2xl overflow-hidden"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {Messages ? (
              <Messages />
            ) : (
              <div className="p-4 text-gray-500 text-sm">Messages component not available</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleMessages}
        className="fixed bottom-5 sm:bottom-8 right-5 sm:right-8 bg-sky-600 text-white p-2.5 sm:p-3.5 rounded-full shadow-lg hover:bg-sky-700 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AiOutlineMessage size={22} className="sm:w-6 sm:h-6" />
      </motion.button>
    </div>
  );
};

export default Hero;