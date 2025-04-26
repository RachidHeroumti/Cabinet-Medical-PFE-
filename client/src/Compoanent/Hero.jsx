import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Messages from "../componentChat/Messages";
import { getDoctorsRoute } from "../Routes/routes";
import { Cabstate } from "../Context/cabinatProvider";

const Hero = () => {
  const navigate = useNavigate();
  const { doctorSelected, setDoctorSelected } = Cabstate();
  const [searchText, setSearchText] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [searchBy, setSearchBy] = useState("Name");
  const [isMsgOpen, setIsMsgOpen] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(getDoctorsRoute);
        setDoctors(data.Doctors || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);


  const filteredDoctors = useMemo(() => {
    if (!searchText || !doctors.length) return [];
    
    const searchLower = searchText.toLowerCase();
    const fieldMap = {
      Name: "fullName",
      Department: "Departement.name",
      Speciality: "Service"
    };
    
    const field = fieldMap[searchBy];
    
    return doctors.filter(doctor => {
      const value = field.includes(".")
        ? field.split(".").reduce((obj, key) => obj?.[key], doctor)
        : doctor[field];
      return value?.toLowerCase().startsWith(searchLower);
    });
  }, [searchText, searchBy, doctors]);

  const handleDoctorClick = (doctor) => {
    setDoctorSelected(doctor);
    navigate("/dashbord/doctor");
  };

  const toggleMessages = () => setIsMsgOpen(prev => !prev);

  return (
    <div>
      <section id="home" className="flex flex-col justify-center pt-16 bg-sky-400 h-[300px] overflow-visible">
        <div className="flex flex-col w-full p-4 items-center space-y-2">
          <h1 className="text-center text-sky-800 text-3xl font-bold p-4">Cabinet Medical</h1>
          <p className="p-2 text-center px-12 max-w-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, vitae quas?
            Repellendus odio, eaque veniam nostrum dolore sed animi fugiat, libero
            aliquid delectus quia dolor facere quam ad dolorem vero
          </p>

          <div className="flex items-center justify-between w-full max-w-2xl bg-white border border-gray-800 rounded-md p-1 space-x-2">
            <div className="flex items-center border-r border-gray-800">
              <IoMdSearch size={30} className="text-gray-800" />
              <input
                className="outline-none p-1 bg-transparent px-3 w-full"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={`Search by ${searchBy}`}
              />
            </div>

            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              className="p-1 bg-transparent border-r border-gray-800 outline-none"
            >
              <option>Name</option>
              <option>Department</option>
              <option>Speciality</option>
            </select>

            <select className="p-1 bg-transparent outline-none">
              <option>Select City</option>
              {["Agadir", "Rabat", "Casablanca", "Tanger", "Marrakech", "Asafi", "Fes"].map(city => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {searchText && filteredDoctors.length > 0 && (
          <div className="relative w-full flex justify-center">
            <div className="absolute top-0 w-full max-w-2xl">
              <div className="bg-gray-100 rounded-xl p-2 space-y-1">
                {filteredDoctors.map((doctor, index) => (
                  <div
                    key={index}
                    onClick={() => handleDoctorClick(doctor)}
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-slate-200 cursor-pointer"
                  >
                    <img
                      src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="doctor"
                      className="rounded-full w-[50px] h-[50px] object-cover"
                    />
                    <div>
                      <h1 className="text-xl text-gray-900">Dr. {doctor.fullName}</h1>
                      <p>{doctor.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {isMsgOpen && (
        <div className="fixed top-10 right-0 h-[70%] z-50 rounded-sm">
          <Messages />
        </div>
      )}

      <AiOutlineMessage
        size={45}
        onClick={toggleMessages}
        className="fixed bottom-10 right-10 text-sky-900 cursor-pointer"
      />
    </div>
  );
};

export default Hero;