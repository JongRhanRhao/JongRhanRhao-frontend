const NotFoundPage = () => {
  return (
    <>
      <div className="text-center  hero text-primary">
        <div className="flex-col hero-content">
          <h1 className="font-bold text-9xl">404</h1>
          <p className="text-2xl font-medium mt-">Oops! Page not found</p>
          <p className="mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a href="/" className="btn btn-outline border-primary text-primary">
            Go Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
