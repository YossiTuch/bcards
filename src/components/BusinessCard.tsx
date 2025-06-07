import { Card, HR } from "flowbite-react";
import { FaHeart, FaEdit } from "react-icons/fa";
import { TCard } from "../types/TCard";
import { useNavigate } from "react-router-dom";

interface BusinessCardProps {
  bcard: TCard;
  isLiked?: boolean;
  onLikeClick: (cardId: string) => void;
  showEditButton?: boolean;
}

export const BusinessCard = ({
  bcard,
  isLiked,
  onLikeClick,
  showEditButton = false,
}: BusinessCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="m-5 mx-auto mt-10 max-sm:w-[90%] lg:w-96">
      <Card className="transition-shadow duration-300 hover:shadow-xl">
        <div
          onClick={() => navigate(`/card/${bcard._id}`)}
          className="cursor-pointer"
        >
          <img
            src={bcard.image.url}
            alt={bcard.image.alt}
            className="h-[300px] w-full object-cover"
          />
          <h1 className="mt-4 text-2xl font-semibold">{bcard.title}</h1>
          <h2 className="w-full truncate text-gray-600">{bcard.description}</h2>
          <HR />
          <div className="space-y-2">
            <p>
              <b>Phone</b>: {bcard.phone}
            </p>
            <p>
              <b>Address</b>: {bcard.address.country}
            </p>
            <p>
              <b>Card Number</b>: {bcard.bizNumber}
            </p>
          </div>
        </div>
        <HR />
        <div
          className="flex items-center justify-between gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <FaHeart
              onClick={() => onLikeClick(bcard._id)}
              className={`cursor-pointer text-2xl ${
                isLiked
                  ? "text-red-500 hover:text-red-300"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            />
            <span>
              {bcard.likes.length} {bcard.likes.length === 1 ? "like" : "likes"}
            </span>
          </div>
          {showEditButton && (
            <FaEdit
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/edit-card/${bcard._id}`);
              }}
              className="cursor-pointer text-xl text-gray-500 hover:text-gray-700"
            />
          )}
        </div>
      </Card>
    </div>
  );
};
