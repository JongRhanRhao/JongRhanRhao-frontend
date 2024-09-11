const NotFoundPage = () => {
  return (
    <>
      <div className="min-h-screen text-center hero text-primary">
        <div className="flex-col hero-content">
          <h1 className="font-bold text-9xl">404</h1>
          <p className="mt-4 text-2xl font-medium">Oops! Page not found</p>
          <p className="mt-4 mb-8">
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
