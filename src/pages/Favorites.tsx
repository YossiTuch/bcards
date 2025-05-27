import { useEffect, useState } from "react";
import { TCard } from "../types/TCard";
import { useSelector } from "react-redux";
import type { TRootState } from "../store/store";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import { PaginatedCardGrid } from "../components/PaginatedCardGrid";
import { useAuth } from "../hooks/useAuth";

const Favorites = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bcards, setBcards] = useState<TCard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );
  const { user, requireAuth, getAuthHeaders, isAuthenticated } = useAuth();

  const filterBySearch = () =>
    bcards.filter((bcard) => {
      return (
        bcard.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        bcard.subtitle.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

  const getLikedCards = async () => {
    try {
      setLoading(true);

      // Skip the requireAuth toast on initial load
      if (!initialLoadDone) {
        if (!isAuthenticated) return;
      } else {
        if (!requireAuth("Please login to view favorites")) return;
      }

      const headers = getAuthHeaders();
      if (!headers) return;

      const response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        { headers },
      );

      const likedCards = response.data.filter((item: TCard) => {
        return item.likes.includes(user!._id);
      });
      setBcards(likedCards);
    } catch (error) {
      console.error("Error fetching cards: ", error);
      if (initialLoadDone) {
        toast.error("Failed to load favorite cards");
      }
    } finally {
      setLoading(false);
      setInitialLoadDone(true);
    }
  };

  const toggleLike = async (cardId: string) => {
    try {
      if (!requireAuth("Please login to manage favorites")) return;

      const headers = getAuthHeaders();
      if (!headers) return;

      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        { headers },
      );

      // Remove the card from favorites immediately
      setBcards((prev) => prev.filter((card) => card._id !== cardId));
      toast.success("Card removed from favorites");
    } catch (error) {
      console.error("Error updating favorite:", error);
      toast.error("Failed to update favorite status");
    }
  };

  useEffect(() => {
    getLikedCards();
  }, [user, isAuthenticated]); // Reload when user or auth status changes

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="mx-10 my-10 min-h-screen">
      <h1 className="text-7xl font-semibold max-sm:text-4xl">Favorite Cards</h1>
      <p className="mt-5 text-4xl max-sm:text-2xl">
        Here you can find your favorite business cards
      </p>
      <hr className="mx-auto mt-10 max-w-[90%] border-1 border-gray-300" />

      {bcards.length === 0 ? (
        <div className="mt-10 text-center text-xl text-gray-500">
          No favorite cards yet. Browse the home page to add some!
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

export default Favorites;
