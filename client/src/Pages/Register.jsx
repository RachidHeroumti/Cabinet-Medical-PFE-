import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import {  FaIdCard, FaPhone, FaHospitalUser, FaUserDoctor } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";

import { MdOutlineMail, MdPassword } from "react-icons/md";
import { RiUserLocationFill } from "react-icons/ri";
import { FaCalendarDay } from "react-icons/fa";
import { getDepartmetRoute, registerRoute } from "../Routes/routes";
import { Cabstate } from "../Context/cabinatProvider";
import { motion, AnimatePresence } from "framer-motion";

const FormField = ({ icon: Icon, type = "text", placeholder, value, onChange, name, required }) => (
  <motion.div
    className="relative flex items-center bg-white/90 border border-gray-300 rounded-lg p-2.5 shadow-sm focus-within:border-sky-500 transition-colors"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <Icon size={24} className="text-gray-600 mx-2" />
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent outline-none text-gray-800 text-sm sm:text-base placeholder-gray-400"
      required={required}
    />
  </motion.div>
);

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phon, setPhon] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Agadir");
  const [birthday, setBirthDay] = useState("");
  const [cabinetName, setCabinetName] = useState("");
  const [description, setDescription] = useState("");
  const [departments, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [depSelect, setDepSelect] = useState("");
  const [serSelect, setSerSelect] = useState("");
  const [depIdSelected, setDepIdSelected] = useState("");
  const [medicalLicense, setMedicalLicense] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = Cabstate() || {};
  const navigate = useNavigate();

  useEffect(() => {
    const getDeps = async () => {
      try {
        const res = await axios.get(getDepartmetRoute);
        if (Array.isArray(res.data.deps)) {
          setDepartments(res.data.deps);
        }
      } catch (err) {
        console.error("Error fetching departments:", err);
        toast.error("Failed to load departments", { position: "bottom-right" });
      }
    };
    getDeps();
  }, []);

  useEffect(() => {
    if (depSelect && departments.length) {
      const selectedDep = departments.find((dep) => dep.name === depSelect);
      if (selectedDep) {
        setDepIdSelected(selectedDep._id);
        setServices(Array.isArray(selectedDep.services) ? selectedDep.services : []);
      }
    } else {
      setServices([]);
      setDepIdSelected("");
    }
  }, [depSelect, departments]);

  const validateInputs = () => {
    if (!fullName || !email || !password || !address || !city || !birthday) {
      setErr("Please fill in all required fields");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErr("Please enter a valid email");
      return false;
    }
    if (fullName.length <= 8) {
      setErr("Full name must contain two words");
      return false;
    }
    if (password.length < 6) {
      setErr("Password must be at least 6 characters");
      return false;
    }
    const [day, month, year] = birthday.split("/");
    if (!day || !month || !year || isNaN(new Date(year, month - 1, day))) {
      setErr("Invalid date format (DD/MM/YYYY)");
      return false;
    }
    return true;
  };

  const onRegister = async () => {
    if (isLoading) return;
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      const [day, month, year] = birthday.split("/");
      const dateN = new Date(year, month - 1, day);
      const res = await axios.post(registerRoute, {
        fullName,
        email,
        password,
        nationalId,
        phon,
        address,
        city,
        dateNaissance: dateN,
      });

      if (res.data._id) {
        Cookies.set("ut", res.data.token, { expires: 10 });
        Cookies.set("user", JSON.stringify(res.data));
        setUser(res.data);
        navigate("/profile");
        toast.success("Registered successfully!", { position: "bottom-right" });
      } else {
        setErr(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error registering:", err);
      setErr("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const onAddDoctor = async () => {
    if (isLoading) return;
    if (!validateInputs() || !cabinetName || !description || !depSelect || !serSelect || !medicalLicense) {
      setErr("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const [day, month, year] = birthday.split("/");
      const dateN = new Date(year, month - 1, day);
      const res = await axios.post(registerRoute, {
        fullName,
        email,
        password,
        address,
        nationalId,
        isMedecin: true,
        phon,
        dateNaissance: dateN,
        Service: serSelect,
        Departement: depIdSelected,
        city,
        cabenitName: cabinetName,
        description,
        medicalLicense,
      });

      if (res.data._id) {
        Cookies.set("ut", res.data.token, { expires: 15 });
        Cookies.set("user", JSON.stringify(res.data));
        setUser(res.data);
        navigate("/profile");
        toast.success("Doctor registered successfully!", { position: "bottom-right" });
      } else {
        setErr(res.data.message || "Doctor registration failed");
      }
    } catch (err) {
      console.error("Error registering doctor:", err);
      setErr("An error occurred during doctor registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 py-12">
      <motion.div
        className="w-full max-w-4xl bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <motion.button
            className={`flex-1 py-2 rounded-lg text-sm sm:text-base font-semibold ${
              !isDoctor
                ? "bg-gradient-to-r from-sky-600 to-sky-700 text-white"
                : "border border-sky-600 text-sky-600"
            }`}
            onClick={() => setIsDoctor(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Patient
          </motion.button>
          <motion.button
            className={`flex-1 py-2 rounded-lg text-sm sm:text-base font-semibold ${
              isDoctor
                ? "bg-gradient-to-r from-sky-600 to-sky-700 text-white"
                : "border border-sky-600 text-sky-600"
            }`}
            onClick={() => setIsDoctor(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Doctor
          </motion.button>
        </div>

        <AnimatePresence>
          {!isDoctor ? (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <FormField
                icon={FaRegUserCircle}
                placeholder="Full Name *"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                name="fullName"
                required
              />
              <FormField
                icon={MdOutlineMail}
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
              />
              <FormField
                icon={MdPassword}
                type="password"
                placeholder="Password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required
              />
              <FormField
                icon={FaIdCard}
                placeholder="National ID (CIN)"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                name="nationalId"
              />
              <FormField
                icon={FaPhone}
                type="tel"
                placeholder="Phone (+212) *"
                value={phon}
                onChange={(e) => setPhon(e.target.value)}
                name="phone"
                required
              />
              <FormField
                icon={RiUserLocationFill}
                placeholder="Address *"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                name="address"
                required
              />
              <motion.div
                className="relative flex items-center bg-white/90 border border-gray-300 rounded-lg p-2.5 shadow-sm focus-within:border-sky-500"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <RiUserLocationFill size={24} className="text-gray-600 mx-2" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-800 text-sm sm:text-base"
                >
                  <option value="Agadir">Agadir</option>
                  <option value="Fes">Fes</option>
                  <option value="Rabat">Rabat</option>
                  <option value="Casablanca">Casablanca</option>
                </select>
              </motion.div>
              <FormField
                icon={FaCalendarDay}
                placeholder="Date of Birth (DD/MM/YYYY) *"
                value={birthday}
                onChange={(e) => setBirthDay(e.target.value)}
                name="birthday"
                required
              />
              <AnimatePresence>
                {err && (
                  <motion.span
                    className="text-red-500 text-sm font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {err}
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.button
                onClick={onRegister}
                className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white py-2.5 rounded-lg text-sm sm:text-base font-semibold hover:from-sky-700 hover:to-sky-800 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register as Patient"}
              </motion.button>
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-sky-600 font-semibold hover:underline">
                  Login
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <FormField
                icon={FaRegUserCircle}
                placeholder="Full Name *"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                name="fullName"
                required
              />
              <FormField
                icon={MdOutlineMail}
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
              />
              <FormField
                icon={MdPassword}
                type="password"
                placeholder="Password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required
              />
              <FormField
                icon={FaIdCard}
                placeholder="National ID (CIN)"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                name="nationalId"
              />
              <FormField
                icon={FaPhone}
                type="tel"
                placeholder="Phone (+212) *"
                value={phon}
                onChange={(e) => setPhon(e.target.value)}
                name="phone"
                required
              />
              <FormField
                icon={RiUserLocationFill}
                placeholder="Address *"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                name="address"
                required
              />
              <motion.div
                className="relative flex items-center bg-white/90 border border-gray-300 rounded-lg p-2.5 shadow-sm focus-within:border-sky-500"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <RiUserLocationFill size={24} className="text-gray-600 mx-2" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-800 text-sm sm:text-base"
                >
                  <option value="Agadir">Agadir</option>
                  <option value="Fes">Fes</option>
                  <option value="Rabat">Rabat</option>
                  <option value="Casablanca">Casablanca</option>
                </select>
              </motion.div>
              <FormField
                icon={FaCalendarDay}
                placeholder="Date of Birth (DD/MM/YYYY) *"
                value={birthday}
                onChange={(e) => setBirthDay(e.target.value)}
                name="birthday"
                required
              />
              <motion.div
                className="relative flex items-center bg-white/90 border border-gray-300 rounded-lg p-2.5 shadow-sm focus-within:border-sky-500"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0 }}
              >
                <FaUserDoctor size={24} className="text-gray-600 mx-2" />
                <select
                  value={depSelect}
                  onChange={(e) => setDepSelect(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-800 text-sm sm:text-base"
                >
                  <option value="">Select Department *</option>
                  {departments.map((item) => (
                    <option key={item._id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </motion.div>
              <motion.div
                className="relative flex items-center bg-white/90 border border-gray-300 rounded-lg p-2.5 shadow-sm focus-within:border-sky-500"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <FaUserDoctor size={24} className="text-gray-600 mx-2" />
                <select
                  value={serSelect}
                  onChange={(e) => setSerSelect(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-800 text-sm sm:text-base"
                  disabled={!depSelect}
                >
                  <option value="">Select Service *</option>
                  {services.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </motion.div>
              <FormField
                icon={FaUserDoctor}
                placeholder="Medical License Number *"
                value={medicalLicense}
                onChange={(e) => setMedicalLicense(e.target.value)}
                name="medicalLicense"
                required
              />
              <FormField
                icon={FaHospitalUser}
                placeholder="Cabinet Name *"
                value={cabinetName}
                onChange={(e) => setCabinetName(e.target.value)}
                name="cabinetName"
                required
              />
              <motion.div
                className="sm:col-span-2 relative bg-white/90 border border-gray-300 rounded-lg p-2.5 shadow-sm focus-within:border-sky-500"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your experience (50-300 words) *"
                  className="w-full h-24 bg-transparent outline-none text-gray-800 text-sm sm:text-base placeholder-gray-400 p-2 resize-none"
                  required
                />
              </motion.div>
              <AnimatePresence>
                {err && (
                  <motion.span
                    className="sm:col-span-2 text-red-500 text-sm font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {err}
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.button
                onClick={onAddDoctor}
                className="sm:col-span-2 w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white py-2.5 rounded-lg text-sm sm:text-base font-semibold hover:from-sky-700 hover:to-sky-800 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register as Doctor"}
              </motion.button>
              <div className="sm:col-span-2 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-sky-600 font-semibold hover:underline">
                  Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default Register;