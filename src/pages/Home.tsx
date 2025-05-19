import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../types/TCard";
import { Card, HR, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { TRootState } from "../store/store";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bcards, setBcards] = useState<TCard[]>([]);
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

  const getCards = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
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
      if (!user) {
        toast.info("Please login to like cards");
        navigate("/login");
        return;
      }

      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token missing");
        navigate("/login");
        return;
      }

      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        {
          headers: {
            "x-auth-token": token
          }
        }
      );      // Check if the card is currently liked
      const card = bcards.find(card => card._id === cardId);
      if (!card) {
        toast.error("Card not found");
        return;
      }

      const isLiked = card.likes.includes(user._id);
      const newLikes = isLiked
        ? card.likes.filter(like => like !== user._id)
        : [...card.likes, user._id];

      // Update the card's like status in the local state
      setBcards(prev => prev.map(card => 
        card._id === cardId 
          ? { ...card, likes: newLikes }
          : card
      ));
      
      // Show toast after state update
      toast.success(isLiked ? "Card unliked successfully" : "Card liked successfully");

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
        <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filterBySearch().map((bcard) => {
            const isLiked = user && bcard.likes.includes(user._id);
            return (
              <div key={bcard._id} className="m-5 mx-auto mt-10 max-sm:w-[90%] lg:w-96">
                <Card className="hover:shadow-xl transition-shadow duration-300">
                  <div onClick={() => navigate(`/card/${bcard._id}`)} className="cursor-pointer">
                    <img
                      src={bcard.image.url}
                      alt={bcard.image.alt}
                      className="h-[300px] w-full object-cover"
                    />
                    <h1 className="text-2xl font-semibold mt-4">{bcard.title}</h1>
                    <h2 className="w-full truncate text-gray-600">{bcard.description}</h2>
                    <HR />
                    <div className="space-y-2">
                      <p><b>Phone</b>: {bcard.phone}</p>
                      <p><b>Address</b>: {bcard.address.country}</p>
                      <p><b>Card Number</b>: {bcard.bizNumber}</p>
                    </div>
                  </div>
                  <HR />
                  <div className="flex justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <FaHeart
                      onClick={() => toggleLike(bcard._id)}
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
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
