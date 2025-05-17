import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Cabinet Médical</h3>
          <p>Your trusted healthcare partner providing quality medical services.</p>
          <div className="flex space-x-4 mt-6 text-gray-400">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center">
              <FaPhoneAlt className="mr-2" /> +212 123 456 789
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" /> contact@cabinetmedical.ma
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2" /> 123 Rue de la Santé, Casablanca, Morocco
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/departments" className="hover:text-white">
                Departments
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-600 mt-10 text-sm">
        &copy; {new Date().getFullYear()} Cabinet Médical. All rights reserved.
      </div>
    </footer>
  );
}
