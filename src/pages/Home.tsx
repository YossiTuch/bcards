import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../types/TCard";
import { Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import type { TRootState } from "../store/store";
import { toast } from "react-toastify";
import { PaginatedCardGrid } from "../components/PaginatedCardGrid";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bcards, setBcards] = useState<TCard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );
  const { user, requireAuth, getAuthHeaders } = useAuth();

  const filterBySearch = () =>
    bcards.filter(
      (bcard) =>
        bcard.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        bcard.subtitle.toLowerCase().includes(searchWord.toLowerCase()),
    );

  const getCards = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
      );
      setBcards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
      toast.error("Failed to load cards");
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (cardId: string) => {
    try {
      if (!requireAuth("Please login to like cards")) return;

      const headers = getAuthHeaders();
      if (!headers) return;

      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        { headers },
      );

      setBcards((prev) => {
        const card = prev.find((c) => c._id === cardId);
        if (!card) return prev;

        const isLiked = card.likes.includes(user!._id);
        const newLikes = isLiked
          ? card.likes.filter((like) => like !== user!._id)
          : [...card.likes, user!._id];

        toast.success(
          isLiked ? "Card unliked successfully" : "Card liked successfully",
        );

        return prev.map((c) =>
          c._id === cardId ? { ...c, likes: newLikes } : c,
        );
      });
    } catch (error) {
      console.error("Error updating like status:", error);
      toast.error("Failed to update like status");
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-10 my-10">
        <h1 className="text-7xl font-semibold max-sm:text-4xl">Cards Page</h1>
        <p className="mt-5 text-4xl max-sm:text-2xl">
          Here you can find business cards from all categories
        </p>
      </div>
      <hr className="mx-auto mt-10 max-w-[90%] border-1 border-gray-300" />

      {bcards.length === 0 ? (
        <div className="mt-10 text-center text-xl text-gray-500">
          No cards found. Please try again later.
        </div>
      ) : (
        <PaginatedCardGrid
          cards={filterBySearch()}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onLikeClick={toggleLike}
          currentUserId={user?._id}
        />
      )}
    </div>
  );
};

export default Home;
