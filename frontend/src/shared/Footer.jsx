import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="work-sans-text bg-black/90 shadow-2xl  p-20 mt-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">

        <div className='text-gray-200'>
          <h3 className="text-xl font-semibold mb-4 text-primary-gradient">Contact Us</h3>
          <p>Email: support@historicalartifactstracker.com</p>
          <p>Phone: +880 1234 567890</p>
          <p>Address:  road #1, section #6, mirpur, 1216, Dhaka, Bangladesh</p>
        </div>

        <div>
          <h3 className=" text-xl font-semibold mb-4 text-primary-gradient">Terms & Conditions</h3>
          <ul className="space-y-2">
            <li><a href="/terms" className="text-gray-200 dark:text-gray-100 hover:text-gray-700 transition dark:hover:text-gray-700">Terms of Service</a></li>
            <li><a href="/privacy" className="text-gray-200 dark:text-gray-100 hover:text-gray-700 transition dark:hover:text-gray-700">Privacy Policy</a></li>
            <li><a href="/refund" className="text-gray-200 dark:text-gray-100 hover:text-gray-700 transition dark:hover:text-gray-700">Refund Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className=" text-xl font-semibold mb-4 text-primary-gradient ">Follow Us</h3>
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-200 dark:text-gray-100 hover:text-primary transition dark:hover:text-gray-700 text-2xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-200 dark:text-gray-100 hover:text-primary transition dark:hover:text-gray-700 text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-200 dark:text-gray-100 hover:text-primary transition dark:hover:text-gray-700 text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-200 dark:text-gray-100 hover:text-primary dark:hover:text-gray-700 transition text-2xl"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} artifactstracker.com . All rights reserved.
        
      </div>
    </footer>
  );
};

export default Footer;
