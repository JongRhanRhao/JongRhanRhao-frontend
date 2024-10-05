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
      <div className="flex justify-center space-x-5">
        <Link to={"/privacy"} className={footerTextclass}>
          Privacy Policy
        </Link>
        <div className="divider lg:divider-horizontal"></div>
        <Link to={"/tos"} className={footerTextclass}>
          Terms of Service
        </Link>
        <div className="divider lg:divider-horizontal"></div>
        <Link to={"/feedback"} className={footerTextclass}>
          Contact Us
        </Link>
      </div>
      <p className="font-medium text-center text-text/50">
        © 2024 Jongrhanrhao Ltd. All rights reservered.
      </p>
    </footer>
  );
};

export default Footer;
