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
  const user = useSelector((state: TRootState) => state.userSlice.user);

  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );

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
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
      );
      setBcards(response.data);
    } catch (error) {
      console.error("Error fetching cards: ", error);
    } finally {
      setLoading(false);
    }
  };

  const likeOrUnlikeCard = async (cardId: string) => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }
      // const token = localStorage.getItem("token");
      // axios.defaults.headers.common["x-auth-token"] = token;
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
    } catch (error) {}
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mx-10 my-10">
        <h1 className="text-7xl font-semibold max-sm:text-4xl">Cards Page</h1>
        <p className="mt-5 text-4xl max-sm:text-2xl">
          Here you can find business cards from all categories
        </p>
      </div>
      <hr className="mx-auto mt-10 max-w-[90%] border-1 border-gray-300" />
      <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {bcards &&
          filterBySearch().map((bcard: TCard) => {
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
                      onClick={() => likeOrUnlikeCard(bcard._id)}
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
          <Spinner color="info" aria-label="Info spinner example" />
        </div>
      )}
    </div>
  );
};
export default Home;
