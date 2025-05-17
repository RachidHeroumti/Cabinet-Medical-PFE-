import { FaClinicMedical } from "react-icons/fa";
import { IoIosNotifications, IoMdMenu, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Cabstate } from "../../Context/cabinatProvider";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [authLabel, setAuthLabel] = useState("Login");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = Cabstate();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    setAuthLabel(user ? "Profile" : "Login");
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleNotification = async () => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("Doctori Update", { body: "Stay connected with your health!" });
      } else if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          new Notification("Doctori Update", { body: "Stay connected with your health!" });
        }
      }
    }
  };

  const navItems = [
    { label: "Home", path: "/#home" },
    { label: "Profile", path: user ? "/profile" : "/login" },
    { label: "About Us", path: "/#about" },
  ];

  return (
    <nav
      className=" fixed top-0 left-0 right-0 z-50 text-white shadow-lg"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-sky-800/70 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaClinicMedical size={32} className="text-white" />
          <h1 className="text-2xl font-extrabold tracking-tight">Doctori</h1>
        </motion.div>

        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              className="relative text-lg font-medium hover:text-sky-100 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
          <motion.button
            onClick={() => handleNavigate("/register")}
            className="px-6 py-2 rounded-full bg-white text-sky-600 font-semibold hover:bg-sky-100 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {authLabel}
          </motion.button>
          <motion.button
            onClick={handleNotification}
            className="p-2 rounded-full hover:bg-sky-700 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IoIosNotifications size={24} />
          </motion.button>
        </div>

        <motion.button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            className="md:hidden bg-gradient-to-b from-sky-500 to-sky-600 text-white px-6 py-6 space-y-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavigate(item.path)}
                className="block w-full text-left text-lg font-medium py-2 hover:text-sky-100 transition-colors duration-300"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => handleNavigate("/register")}
              className="block w-full bg-white text-sky-600 px-6 py-3 rounded-full font-semibold hover:bg-sky-100 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {authLabel}
            </motion.button>
            <motion.button
              onClick={handleNotification}
              className="block w-full text-left text-lg font-medium py-2 hover:text-sky-100 transition-colors duration-300"
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              Notifications
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
