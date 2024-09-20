const BackHomeButton = ({ className }: { className?: string }) => {
  return (
    <a
      href="/"
      className={`btn btn-outline border-primary text-primary hover:bg-primary hover:text-secondary hover:border-none ${className}`}
    >
      Go Home
    </a>
  );
};

export default BackHomeButton;
