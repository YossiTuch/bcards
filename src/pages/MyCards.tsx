import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { TCard } from "../types/TCard";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import { PaginatedCardGrid } from "../components/PaginatedCardGrid";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";

const MyCards = () => {
  const [cards, setCards] = useState<TCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { getAuthHeaders } = useAuth();

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        const headers = getAuthHeaders();
        if (!headers) return;

        const response = await axios.get<TCard[]>(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards",
          { headers },
        );

        setCards(response.data);
      } catch (error) {
        toast.error("Failed to load your cards");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyCards();
  }, [getAuthHeaders]);

  const handleLikeClick = async (cardId: string) => {
    try {
      const headers = getAuthHeaders();
      if (!headers) return;

      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        { headers },
      );

      setCards((prevCards) =>
        prevCards.map((card) =>
          card._id === cardId
            ? { ...card, likes: [...card.likes, card.user_id] }
            : card,
        ),
      );
    } catch (error) {
      toast.error("Failed to like card");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="mx-10 my-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">My Business Cards</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your created business cards
          </p>
        </div>

        {cards.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              You haven't created any business cards yet.
            </p>
            <Link
              to="/create-card"
              className="mt-4 inline-block rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600"
            >
              Create Your First Card
            </Link>
          </div>
        ) : (
          <PaginatedCardGrid
            cards={cards}
            itemsPerPage={8}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onLikeClick={handleLikeClick}
            showEditButton={true}
          />
        )}
      </div>

      {cards.length > 0 && (
        <Link
          to="/create-card"
          className="fixed right-8 bottom-20 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 hover:shadow-xl"
        >
          <HiPlus className="text-4xl" />
        </Link>
      )}
    </div>
  );
};

export default MyCards;
