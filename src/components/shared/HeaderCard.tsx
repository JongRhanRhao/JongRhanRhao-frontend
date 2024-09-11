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
    <div className="flex items-center justify-between p-4 py-4 mx-auto overflow-hidden shadow-lg grid-cols-2 bg-primary rounded-xl max-w-8xl bg-pattern">
      <div className="flex flex-col justify-between">
        <header className="p-4 font-sans text-3xl font-bold text-text">
          {title}
        </header>
        <p className="p-4 font-sans text-sm text-text">{description}</p>
      </div>
      <div>
        <img className="rounded-xl h-44" src={imageSrc} alt="logo" />
      </div>
    </div>
  );
};

export default HeaderCard;
