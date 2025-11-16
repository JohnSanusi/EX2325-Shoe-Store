import Card from "./Card";
type CardProps = {
  limit?: number;
};
const Cards: React.FC<CardProps> = ({ limit }) => {
  const images = [
    { src: "/img-1.jpg" },
    { src: "/img-2.jpg" },
    { src: "/img-3.jpg" },
    { src: "/img-4.jpg" },
    { src: "/img-5.jpg" },
    { src: "/img-6.jpg" },
    { src: "/img-7.jpg" },
    { src: "/img-8.jpg" },
    { src: "/img-9.jpg" },
    { src: "/img-10.jpg" },
    { src: "/img-11.jpg" },
    { src: "/img-12.jpg" },
    { src: "/img-13.jpg" },
    { src: "/img-14.jpg" },
    { src: "/img-15.jpg" },
    { src: "/img-17.jpg" },
    { src: "/img-18.jpg" },
    { src: "/img-19.jpg" },
    { src: "/img-20.jpg" },
    { src: "/img-21.jpg" },
    { src: "/img-22.jpg" },
    { src: "/img-23.jpg" },
    { src: "/img-24.jpg" },
    { src: "/img-25.jpg" },
    { src: "/img-26.jpg" },
    { src: "/img-27.jpg" },
    { src: "/img-28.jpg" },
  ];

  const shownImages = limit ? images.slice(0, limit) : images;

  return (
    <section className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {shownImages.map((image, index) => (
        <Card key={index} source={image.src} />
      ))}
    </section>
  );
};

export default Cards;
