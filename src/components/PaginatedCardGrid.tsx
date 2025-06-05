import { Pagination } from "flowbite-react";
import { BusinessCard } from "./BusinessCard";
import { TCard } from "../types/TCard";

interface CardGridProps {
  cards: TCard[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onLikeClick: (cardId: string) => void;
  currentUserId?: string;
}

export const PaginatedCardGrid = ({
  cards,
  currentPage,
  itemsPerPage,
  onPageChange,
  onLikeClick,
  currentUserId,
}: CardGridProps) => {
  // Calculate pagination
  const indexOfLastCard = currentPage * itemsPerPage;
  const indexOfFirstCard = indexOfLastCard - itemsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(cards.length / itemsPerPage);

  return (
    <>
      <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {currentCards.map((bcard) => (
          <BusinessCard
            key={bcard._id}
            bcard={bcard}
            isLiked={
              currentUserId ? bcard.likes.includes(currentUserId) : false
            }
            onLikeClick={onLikeClick}
          />
        ))}
      </div>
      <div className="flex overflow-x-auto pb-5 sm:justify-center">
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          showIcons={true}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};
