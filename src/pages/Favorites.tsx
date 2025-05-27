import { useEffect, useState } from "react";
import type { TCard } from "../types/TCard";
import { useSelector } from "react-redux";
import type { TRootState } from "../store/store";
import axios from "axios";
import { Card, HR, Spinner, Pagination } from "flowbite-react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bcards, setBcards] = useState<TCard[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const onPageChange = (page: number) => setCurrentPage(page);

  const navigate = useNavigate();

  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );
  const user = useSelector((state: TRootState) => state.userSlice.user);

  const filterBySearch = () => {
    return bcards.filter((bcard) => {
      return (
        bcard.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        bcard.subtitle.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
  };

  const getLikedCards = async () => {
    try {
      setLoading(true);
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token || !user) {
        toast.error("Please login to view favorites");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );

      const likedCards = response.data.filter((item: TCard) => {
        return item.likes.includes(user._id);
      });
      setBcards(likedCards);
    } catch (error) {
      console.error("Error fetching cards: ", error);
      toast.error("Failed to load favorite cards");
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (cardId: string) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token || !user) {
        toast.error("Please login to manage favorites");
        navigate("/login");
        return;
      }

      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        },
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
  }, [user]); // Reload when user changes

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  // Calculate pagination
  const indexOfLastCard = currentPage * itemsPerPage;
  const indexOfFirstCard = indexOfLastCard - itemsPerPage;
  const filteredCards = filterBySearch();
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

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
        <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {currentCards.map((bcard) => (
            <div
              key={bcard._id}
              className="m-5 mx-auto mt-10 max-sm:w-[90%] lg:w-96"
            >
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
                  <h2 className="w-full truncate text-gray-600">
                    {bcard.description}
                  </h2>
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
                <div className="flex justify-center gap-2">
                  <FaHeart
                    onClick={() => toggleLike(bcard._id)}
                    className="cursor-pointer text-2xl text-red-500 hover:text-red-300"
                  />
                  <span>
                    {bcard.likes.length}{" "}
                    {bcard.likes.length === 1 ? "like" : "likes"}
                  </span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
          showIcons
        />
      </div>
    </div>
  );
};

export default Favorites;
