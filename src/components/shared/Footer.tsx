// TODO: add social media links
import React from "react";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={`flex flex-col space-y-10 justify-center m-10 ${className}`}
    >
      <nav className="flex flex-wrap justify-center gap-6 font-medium text-gray-500"></nav>
      <div className="flex justify-center space-x-5">
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
      </div>
      <div className="flex justify-center space-x-5">
        <a className="hover:text-gray-900" href="#">
          Privacy Policy
        </a>
        <a className="hover:text-gray-900" href="#">
          Terms of Use
        </a>
        <a className="hover:text-gray-900" href="#">
          Contact Us
        </a>
      </div>
      <p className="font-medium text-center text-gray-700">
        © 2024 Jongrhanrhao Ltd. All rights reservered.
      </p>
    </footer>
  );
};

export default Footer;
