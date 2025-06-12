import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../types/TCard";
import { Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import type { TRootState } from "../store/store";
import { toast } from "react-toastify";
import { PaginatedCardGrid } from "../components/PaginatedCardGrid";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";

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

      // Find current like status before API call
      const card = bcards.find((c) => c._id === cardId);
      if (!card) return;
      const isLiked = card.likes.includes(user!._id);

      // Make API call
      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        { headers },
      );

      // Update local state after successful API call
      setBcards((prev) => {
        const newLikes = isLiked
          ? card.likes.filter((like) => like !== user!._id)
          : [...card.likes, user!._id];

        return prev.map((c) =>
          c._id === cardId ? { ...c, likes: newLikes } : c,
        );
      });

      // Show toast after successful state update
      toast.success(
        isLiked ? "Card unliked successfully" : "Card liked successfully",
      );
    } catch (error) {
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
    <div className="relative min-h-screen">
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
          showEditButton={true}
        />
      )}

      {/* Floating Action Button */}
      {user?.isBusiness && (
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

export default Home;
