import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const footerTextclass: string = "hover:text-text text-text/75";
  return (
    <footer
      className={`flex text-sm flex-col space-y-6 justify-center m-10 ${className}`}
    >
      <nav className="flex flex-wrap justify-center font-medium text-gray-500 gap-6"></nav>
      {/* <div className="flex justify-center space-x-5">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
        </a>
        <a
          href="https://messenger.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
        </a>
      </div> */}
      <div className="flex justify-center space-x-5">
        <Link to={"/privacy"} className={footerTextclass}>
          Privacy Policy
        </Link>
        <div className="divider lg:divider-horizontal"></div>
        <Link to={"/tos"} className={footerTextclass}>
          Terms of Service
        </Link>
        <div className="divider lg:divider-horizontal"></div>
        <a className={footerTextclass} href="#">
          Contact Us
        </a>
      </div>
      <p className="font-medium text-center text-text/50">
        © 2024 Jongrhanrhao Ltd. All rights reservered.
      </p>
    </footer>
  );
};

export default Footer;
