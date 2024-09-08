const BackHomeButton = ({ className }: { className?: string }) => {
  return (
    <a
      href="/"
      className={`btn btn-outline border-primary text-primary ${className}`}
    >
      Go Home
    </a>
  );
};

export default BackHomeButton;
