const NotFoundPage = () => {
  return (
    <>
      <div className="text-center text-primary">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-2xl font-medium mt-4">Oops! Page not found</p>
        <p className="mt-4 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/dashboard" className="btn">
          Go Home
        </a>
      </div>
    </>
  );
};

export default NotFoundPage;
