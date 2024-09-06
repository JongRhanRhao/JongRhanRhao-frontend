// TODO: add social media links
const Footer = () => {
  return (
    <footer className="flex flex-col space-y-10 justify-center m-10">
      <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium"></nav>
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
      <div className="justify-center flex space-x-5">
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
      <p className="text-center text-gray-700 font-medium">
        © 2024 JongRhaoRhao Ltd. All rights reservered.
      </p>
    </footer>
  );
};

export default Footer;
