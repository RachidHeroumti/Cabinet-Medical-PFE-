import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { MdAddCall } from "react-icons/md";
import { FaWhatsapp, FaHeart } from "react-icons/fa";
import { Cabstate } from "../Context/cabinatProvider";
import axios from "axios";
import { addRDVRoute } from "../Routes/routes";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const DoctorInfo = ({ doctor, isFavourite, toggleFavourite, phone }) => (
  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
    <motion.img
      src={
        doctor.image ||
        "https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=600"
      }
      alt={doctor.fullName || "Doctor"}
      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-sky-200 shadow-md"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    />
    <div className="flex-1 space-y-2">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
        Dr. {doctor.fullName || "Unknown"}
      </h1>
      <p className="text-sm sm:text-base text-gray-700">
        <span className="font-semibold">Speciality:</span> {doctor.Service || "N/A"}
      </p>
      <p className="text-sm sm:text-base text-gray-700">
        <span className="font-semibold">Address:</span> {doctor.address || "N/A"}
      </p>
      <p className="text-sm sm:text-base text-sky-600">{doctor.email || "N/A"}</p>
      <div className="flex items-center gap-4 text-sm sm:text-base text-gray-900">
        <span>{phone || "N/A"}</span>
        <a href={`tel:${phone}`}>
          <MdAddCall size={22} className="text-sky-600 hover:text-sky-800 transition-colors" />
        </a>
        <a
          href="https://wa.me/212616421373?text=Salam%20Alaikom"
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp size={22} className="text-sky-600 hover:text-sky-800 transition-colors" />
        </a>
      </div>
      <div className="space-y-1 text-sm sm:text-base text-gray-900">
        <div className="flex gap-2">
          <span className="text-gray-700">Monday - Friday:</span>
          <span className="font-semibold">9:00 - 18:00</span>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-700">Saturday:</span>
          <span className="font-semibold">9:00 - 12:45</span>
        </div>
      </div>
      <motion.div
        className="absolute top-4 right-4"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaHeart
          size={24}
          className={isFavourite ? "text-red-500" : "text-gray-400"}
          onClick={toggleFavourite}
        />
      </motion.div>
    </div>

  </div>
);

const InfoSection = ({ title, content }) => (
  <div className="space-y-2">
    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h2>
    <p className="text-sm sm:text-base text-gray-600">{content}</p>
  </div>
);

const DoctorDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [isFavourite, setIsFavourite] = useState(false);
  const [isRDVadded, setIsRDVadded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { doctorSelected, user } = Cabstate();
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    className: "bg-white shadow-lg rounded-lg",
  };

  const highlightDates = [
    new Date(2025, 4, 19),
    new Date(2025, 4, 22),
    new Date(2025, 4, 26),
  ];

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      return highlightDates.some((d) => d.toDateString() === date.toDateString())
        ? "bg-red-100 text-red-600 font-semibold rounded-full"
        : null;
    }
    return null;
  };

  useEffect(() => {
    if (!doctorSelected ) {
      navigate("/login");
    }
  }, [doctorSelected, navigate]);

  const onAddRDV = async () => {
    if (!user || !doctorSelected) {
      navigate("/login");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      const Patient = user._id;
      const Medecin = doctorSelected._id;
      const isInHighlightDates = highlightDates.some(
        (dt) => dt.toDateString() === date.toDateString()
      );

      if (isInHighlightDates) {
        toast.error("Cette journée est réservée", toastOptions);
        return;
      }

      const day = date.getDate();
      const month = date.getMonth();
      const res = await axios.post(addRDVRoute, { Patient, Medecin, day, month });

      if (res.data.rdv?._id) {
        toast.success("Rendez-vous ajouté avec succès!", toastOptions);
        setIsRDVadded(true);
      } else if (res.data.message) {
        toast.error(res.data.message, toastOptions);
      }
    } catch (err) {
      console.error("Error adding RDV:", err);
      toast.error("Erreur lors de l'ajout du rendez-vous", toastOptions);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavourite = async () => {
    const newFavourite = !isFavourite;
    setIsFavourite(newFavourite);
    if (newFavourite && doctorSelected?._id) {
      try {
        // TODO: Replace with actual API endpoint to toggle favourite
        // await axios.post("/api/favourites", { doctorId: doctorSelected._id });
        console.log(`Toggled favourite for doctor ${doctorSelected._id}`);
      } catch (err) {
        console.error("Error updating favourite:", err);
        toast.error("Erreur lors de la mise à jour des favoris", toastOptions);
        setIsFavourite(false);
      }
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen mt-16">
      {!doctorSelected ? (
        <motion.div
          className="text-center text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No doctor selected
        </motion.div>
      ) : (
        <div className="space-y-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:col-span-2 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl relative">
              <DoctorInfo
                doctor={doctorSelected}
                isFavourite={isFavourite}
                toggleFavourite={toggleFavourite}
                phone={doctorSelected.phon}
              />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
              <h1 className="bg-gradient-to-r from-sky-600 to-sky-700 text-white text-lg sm:text-xl font-semibold text-center py-3">
                Rendez-vous
              </h1>
              <div className="p-4">
                <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-2">
                  Select Date
                </h2>
                <Calendar
                  onChange={setDate}
                  value={date}
                  tileClassName={tileClassName}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-2">
                {date && (
                  <p className="text-sm sm:text-base text-gray-700">
                    {date.toDateString().split(" ").slice(0, 4).join(" ")}
                  </p>
                )}
                <motion.button
                  onClick={onAddRDV}
                  className="bg-gradient-to-r from-sky-600 to-sky-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:from-sky-700 hover:to-sky-800 transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isRDVadded || isLoading}
                >
                  {isLoading ? "Adding..." : "+ RDV"}
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Information
            </h1>
            <div className="space-y-4">
              <InfoSection
                title="About Me"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, assumenda temporibus, sequi aut voluptatum qui accusamus veritatis sit doloribus sapiente voluptatibus, quisquam veniam."
              />
              <InfoSection
                title="Education"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, assumenda temporibus, sequi aut voluptatum qui accusamus veritatis sit doloribus sapiente voluptatibus, quisquam veniam."
              />
              <InfoSection
                title="Experience"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, assumenda temporibus, sequi aut voluptatum qui accusamus veritatis sit doloribus sapiente voluptatibus, quisquam veniam."
              />
            </div>
          </motion.div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default DoctorDashboard;