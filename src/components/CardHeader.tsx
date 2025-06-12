import { TCard } from "../types/TCard";

interface CardHeaderProps {
  card: TCard;
}

export const CardHeader = ({ card }: CardHeaderProps) => (
  <div className="relative -mx-6 -mt-6 mb-6">
    <img
      className="max-h-[600px] w-full bg-gray-100 object-contain dark:bg-gray-700"
      src={card.image.url}
      alt={card.image.alt}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    <div className="absolute bottom-0 left-0 w-full p-6 text-white">
      <h1 className="text-shadow text-3xl font-bold">{card.title}</h1>
      <p className="text-shadow mt-2 text-xl">{card.subtitle}</p>
    </div>
  </div>
);
