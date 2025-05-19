import { useEffect, useState } from "react";
import type { TCard } from "../types/TCard";
import { useSelector } from "react-redux";
import type { TRootState } from "../store/store";
import axios from "axios";
import { Card, HR, Spinner } from "flowbite-react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const Favorites = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [bcards, setBcards] = useState<TCard[]>([]);

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
      const response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
      );
      const likedCards = response.data.filter((item: TCard) => {
        return item.likes.includes(user?._id ?? "");
      });
      setBcards(likedCards);
    } catch (error) {
      console.error("Error fetching cards: ", error);
    } finally {
      setLoading(false);
    }
  };

  const unlikeCard = async (cardId: string) => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["x-auth-token"] = token;

      await axios.patch(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + cardId,
      );
      const card = bcards.find((card) => card._id === cardId);

      if (card) {
        const isLiked = card.likes.includes(user?._id + "");
        const cardsArr = [...bcards];

        if (isLiked) {
          if (card) {
            card.likes = card?.likes.filter((like) => like !== user?._id + "");
            const cardIndex = cardsArr.findIndex((card) => card._id === cardId);
            cardsArr[cardIndex] = card;
          }
          toast.success("Card unliked successfully");
        } else {
          if (card) {
            card.likes = [...card.likes, user?._id + ""];
            const cardIndex = cardsArr.findIndex((card) => card._id === cardId);
            cardsArr[cardIndex] = card;
          }
          toast.success("Card Liked Successfully");
        }
        setBcards(cardsArr);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    getLikedCards();
  }, []);

  return (
    <div className="mx-10 my-10 min-h-screen">
      <h1 className="text-7xl font-semibold max-sm:text-4xl">Cards Page</h1>
      <p className="mt-5 text-4xl max-sm:text-2xl">
        Here you can find business cards from all categories
      </p>
      <hr className="mx-auto mt-10 max-w-[90%] border-1 border-gray-300" />
      <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {bcards &&
          filterBySearch().map((bcard) => {
            const isLiked = bcard.likes.includes(user?._id + "");
            return (
              <div
                // onClick={() => navigate(`/card/${bcard._id}`)}
                key={bcard._id}
                className="m-5 mx-auto mt-10 max-sm:w-[90%] lg:w-96"
              >
                <Card
                  renderImage={() => (
                    <img
                      src={bcard.image.url}
                      alt={bcard.image.alt}
                      className="h-[300px] w-[400px]"
                    />
                  )}
                >
                  <h1 className="text-2xl font-semibold">{bcard.title}</h1>
                  <h2 className="w-80 truncate max-sm:w-52">
                    {bcard.description}
                  </h2>
                  <hr />
                  <h2>
                    <b>Phone</b>: {bcard.phone}
                  </h2>
                  <h2>
                    <b>Address</b>: {bcard.address.country}
                  </h2>
                  <h2>
                    <b>Card Number</b>: {bcard.bizNumber}
                  </h2>
                  <HR />
                  <div className="flex justify-between">
                    <FaHeart
                      onClick={() => unlikeCard(bcard._id)}
                      className={`cursor-pointer text-2xl ${isLiked ? "text-red-500 hover:text-red-300" : "text-gray-500 hover:text-gray-700"}`}
                    />
                    <h2>Hi</h2>
                    <h3>Hi</h3>
                  </div>
                </Card>
              </div>
            );
          })}
      </div>
      {loading && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
export default Favorites;
