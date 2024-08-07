const Card = ({
  title,
  description,
  imageSrc,
}: {
  title: string;
  description: string;
  imageSrc: string;
}) => {
  return (
    <div className="p-4 bg-primary rounded-xl py-4 grid-cols-2 flex justify-between">
      <div className="flex flex-col justify-between">
        <header className="p-4 text-secondary font-bold text-3xl font-sans">
          {title}
        </header>
        <p className="p-4 text-secondary font-sans text-sm">{description}</p>
      </div>
      <div>
        <img
          className="rounded-xl"
          src={imageSrc}
          alt="logo"
          width={320}
          height={320}
        />
      </div>
    </div>
  );
};

export default Card;
