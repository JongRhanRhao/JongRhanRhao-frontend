const HeaderCard = ({
  title,
  description,
  imageSrc,
}: {
  title: string;
  description: string;
  imageSrc: string;
}) => {
  return (
    <div className="p-4 bg-primary shadow-lg rounded-xl overflow-hidden max-w-8xl mx-auto items-center py-4 grid-cols-2 flex justify-between bg-pattern">
      <div className="flex flex-col justify-between">
        <header className="p-4 text-text font-bold text-3xl font-sans">
          {title}
        </header>
        <p className="p-4 text-text font-sans text-sm">{description}</p>
      </div>
      <div>
        <img className="rounded-xl h-44" src={imageSrc} alt="logo" />
      </div>
    </div>
  );
};

export default HeaderCard;
