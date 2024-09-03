const NotFoundPage = () => {
  return (
    <>
      <div className="hero text-center text-primary min-h-screen">
        <div className="hero-content flex-col">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="text-2xl font-medium mt-4">Oops! Page not found</p>
          <p className="mt-4 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a
            href="/"
            className="btn btn-outline border-primary hover:bg-primary text-primary"
          >
            Go Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
