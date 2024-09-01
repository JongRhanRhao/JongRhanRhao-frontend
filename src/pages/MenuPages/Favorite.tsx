import FavoriteStoreList from "@/components/shared/FavoriteStoreList";
import HeaderCard from "@/components/shared/HeaderCard";

const FavoriteContent = () => {
  return (
    <>
      <div className="space-y-4">
        <HeaderCard
          title="Favorite"
          description="Your favorite store lists."
          imageSrc="https://png.pngtree.com/png-vector/20220616/ourmid/pngtree-drunk-santa-claus-cartoon-character-with-two-mugs-of-beer-png-image_5090275.png"
        />
        <FavoriteStoreList />
      </div>
    </>
  );
};

export default FavoriteContent;
