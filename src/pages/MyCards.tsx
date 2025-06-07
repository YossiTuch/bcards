import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { TCard } from "../types/TCard";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import { PaginatedCardGrid } from "../components/PaginatedCardGrid";

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

      // Update cards state to reflect the like
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
    <div className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
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
            <a
              href="/create-card"
              className="mt-4 inline-block rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Create Your First Card
            </a>
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
    </div>
  );
};

export default MyCards;
